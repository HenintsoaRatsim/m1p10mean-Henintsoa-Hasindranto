"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const remapping_1 = __importDefault(require("@ampproject/remapping"));
const linker_1 = require("@angular/compiler-cli/linker");
const babel_loader_1 = require("babel-loader");
const typescript_1 = require("typescript");
function requiresLinking(path, source) {
    // @angular/core and @angular/compiler will cause false positives
    // Also, TypeScript files do not require linking
    if (/[\\\/]@angular[\\\/](?:compiler|core)|\.tsx?$/.test(path)) {
        return false;
    }
    return linker_1.needsLinking(path, source);
}
exports.default = babel_loader_1.custom(() => {
    const baseOptions = Object.freeze({
        babelrc: false,
        configFile: false,
        compact: false,
        cacheCompression: false,
        sourceType: 'unambiguous',
        inputSourceMap: false,
    });
    return {
        async customOptions({ i18n, scriptTarget, aot, optimize, ...rawOptions }, { source }) {
            var _a, _b;
            // Must process file if plugins are added
            let shouldProcess = Array.isArray(rawOptions.plugins) && rawOptions.plugins.length > 0;
            const customOptions = {
                forceAsyncTransformation: false,
                forceES5: false,
                angularLinker: undefined,
                i18n: undefined,
            };
            // Analyze file for linking
            if (await requiresLinking(this.resourcePath, source)) {
                customOptions.angularLinker = {
                    shouldLink: true,
                    jitMode: aot !== true,
                };
                shouldProcess = true;
            }
            // Analyze for ES target processing
            const esTarget = scriptTarget;
            if (esTarget !== undefined) {
                if (esTarget < typescript_1.ScriptTarget.ES2015) {
                    // TypeScript files will have already been downlevelled
                    customOptions.forceES5 = !/\.tsx?$/.test(this.resourcePath);
                }
                else if (esTarget >= typescript_1.ScriptTarget.ES2017 || /\.[cm]?js$/.test(this.resourcePath)) {
                    // Application code (TS files) will only contain native async if target is ES2017+.
                    // However, third-party libraries can regardless of the target option.
                    // APF packages with code in [f]esm2015 directories is downlevelled to ES2015 and
                    // will not have native async.
                    customOptions.forceAsyncTransformation =
                        !/[\\\/][_f]?esm2015[\\\/]/.test(this.resourcePath) && source.includes('async');
                }
                shouldProcess || (shouldProcess = customOptions.forceAsyncTransformation || customOptions.forceES5);
            }
            // Analyze for i18n inlining
            if (i18n &&
                !/[\\\/]@angular[\\\/](?:compiler|localize)/.test(this.resourcePath) &&
                source.includes('$localize')) {
                customOptions.i18n = i18n;
                shouldProcess = true;
            }
            if (optimize) {
                const angularPackage = /[\\\/]node_modules[\\\/]@angular[\\\/]/.test(this.resourcePath);
                customOptions.optimize = {
                    // Angular packages provide additional tested side effects guarantees and can use
                    // otherwise unsafe optimizations.
                    looseEnums: angularPackage,
                    pureTopLevel: angularPackage,
                    // JavaScript modules that are marked as side effect free are considered to have
                    // no decorators that contain non-local effects.
                    wrapDecorators: !!((_b = (_a = this._module) === null || _a === void 0 ? void 0 : _a.factoryMeta) === null || _b === void 0 ? void 0 : _b.sideEffectFree),
                };
                shouldProcess = true;
            }
            // Add provided loader options to default base options
            const loaderOptions = {
                ...baseOptions,
                ...rawOptions,
                cacheIdentifier: JSON.stringify({
                    buildAngular: require('../../package.json').version,
                    customOptions,
                    baseOptions,
                    rawOptions,
                }),
            };
            // Skip babel processing if no actions are needed
            if (!shouldProcess) {
                // Force the current file to be ignored
                loaderOptions.ignore = [() => true];
            }
            return { custom: customOptions, loader: loaderOptions };
        },
        config(configuration, { customOptions }) {
            var _a;
            const plugins = (_a = configuration.options.plugins) !== null && _a !== void 0 ? _a : [];
            if (customOptions.optimize) {
                if (customOptions.optimize.pureTopLevel) {
                    plugins.push(require('./plugins/pure-toplevel-functions').default);
                }
                plugins.push(require('./plugins/elide-angular-metadata').default, [
                    require('./plugins/adjust-typescript-enums').default,
                    { loose: customOptions.optimize.looseEnums },
                ], [
                    require('./plugins/adjust-static-class-members').default,
                    { wrapDecorators: customOptions.optimize.wrapDecorators },
                ]);
            }
            return {
                ...configuration.options,
                // Using `false` disables babel from attempting to locate sourcemaps or process any inline maps.
                // The babel types do not include the false option even though it is valid
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputSourceMap: false,
                plugins,
                presets: [
                    ...(configuration.options.presets || []),
                    [
                        require('./presets/application').default,
                        {
                            ...customOptions,
                            diagnosticReporter: (type, message) => {
                                switch (type) {
                                    case 'error':
                                        this.emitError(message);
                                        break;
                                    case 'info':
                                    // Webpack does not currently have an informational diagnostic
                                    case 'warning':
                                        this.emitWarning(message);
                                        break;
                                }
                            },
                        },
                    ],
                ],
            };
        },
        result(result, { map: inputSourceMap }) {
            if (result.map && inputSourceMap) {
                // Merge the intermediate sourcemap generated by babel with the input source map.
                // The casting is required due to slight differences in the types for babel and
                // `@ampproject/remapping` source map objects but both are compatible with Webpack.
                // This method for merging is used because it provides more accurate output
                // and is faster while using less memory.
                result.map = {
                    // Convert the SourceMap back to simple plain object.
                    // This is needed because otherwise code-coverage will fail with `don't know how to turn this value into a node`
                    // Which is throw by Babel when it is invoked again from `istanbul-lib-instrument`.
                    // https://github.com/babel/babel/blob/780aa48d2a34dc55f556843074b6aed45e7eabeb/packages/babel-types/src/converters/valueToNode.ts#L115-L130
                    ...remapping_1.default([result.map, inputSourceMap], () => null),
                };
            }
            return result;
        },
    };
});
