/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(null, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/common/locales/sl", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY.
    var u = undefined;
    function plural(n) {
        var i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
        if (v === 0 && i % 100 === 1)
            return 1;
        if (v === 0 && i % 100 === 2)
            return 2;
        if (v === 0 && (i % 100 === Math.floor(i % 100) && (i % 100 >= 3 && i % 100 <= 4)) || !(v === 0))
            return 3;
        return 5;
    }
    exports.default = ["sl", [["d", "p"], ["dop.", "pop."], u], [["d", "p"], ["dop.", "pop."], ["dopoldne", "popoldne"]], [["n", "p", "t", "s", "č", "p", "s"], ["ned.", "pon.", "tor.", "sre.", "čet.", "pet.", "sob."], ["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"], ["ned.", "pon.", "tor.", "sre.", "čet.", "pet.", "sob."]], u, [["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "avg.", "sep.", "okt.", "nov.", "dec."], ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"]], u, [["pr. Kr.", "po Kr."], u, ["pred Kristusom", "po Kristusu"]], 1, [6, 0], ["d. MM. yy", "d. MMM y", "dd. MMMM y", "EEEE, dd. MMMM y"], ["HH:mm", "HH:mm:ss", "HH:mm:ss z", "HH:mm:ss zzzz"], ["{1} {0}", u, u, u], [",", ".", ";", "%", "+", "−", "e", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0 %", "#,##0.00 ¤", "#E0"], "EUR", "€", "evro", { "AUD": [u, "$"], "BRL": [u, "R$"], "CAD": [u, "$"], "GBP": [u, "£"], "MXN": [u, "$"], "NZD": [u, "$"], "TWD": [u, "NT$"], "XCD": [u, "$"] }, "ltr", plural];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9zbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILDBDQUEwQztJQUMxQyxJQUFNLENBQUMsR0FBRyxTQUFTLENBQUM7SUFFcEIsU0FBUyxNQUFNLENBQUMsQ0FBUztRQUN6QixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRXBGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDeEIsT0FBTyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1RixPQUFPLENBQUMsQ0FBQztRQUNiLE9BQU8sQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELGtCQUFlLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsZ0JBQWdCLEVBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxrQkFBa0IsQ0FBQyxFQUFDLENBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsZUFBZSxDQUFDLEVBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gVEhJUyBDT0RFIElTIEdFTkVSQVRFRCAtIERPIE5PVCBNT0RJRlkuXG5jb25zdCB1ID0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBwbHVyYWwobjogbnVtYmVyKTogbnVtYmVyIHtcbmNvbnN0IGkgPSBNYXRoLmZsb29yKE1hdGguYWJzKG4pKSwgdiA9IG4udG9TdHJpbmcoKS5yZXBsYWNlKC9eW14uXSpcXC4/LywgJycpLmxlbmd0aDtcblxuaWYgKHYgPT09IDAgJiYgaSAlIDEwMCA9PT0gMSlcbiAgICByZXR1cm4gMTtcbmlmICh2ID09PSAwICYmIGkgJSAxMDAgPT09IDIpXG4gICAgcmV0dXJuIDI7XG5pZiAodiA9PT0gMCAmJiAoaSAlIDEwMCA9PT0gTWF0aC5mbG9vcihpICUgMTAwKSAmJiAoaSAlIDEwMCA+PSAzICYmIGkgJSAxMDAgPD0gNCkpIHx8ICEodiA9PT0gMCkpXG4gICAgcmV0dXJuIDM7XG5yZXR1cm4gNTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW1wic2xcIixbW1wiZFwiLFwicFwiXSxbXCJkb3AuXCIsXCJwb3AuXCJdLHVdLFtbXCJkXCIsXCJwXCJdLFtcImRvcC5cIixcInBvcC5cIl0sW1wiZG9wb2xkbmVcIixcInBvcG9sZG5lXCJdXSxbW1wiblwiLFwicFwiLFwidFwiLFwic1wiLFwixI1cIixcInBcIixcInNcIl0sW1wibmVkLlwiLFwicG9uLlwiLFwidG9yLlwiLFwic3JlLlwiLFwixI1ldC5cIixcInBldC5cIixcInNvYi5cIl0sW1wibmVkZWxqYVwiLFwicG9uZWRlbGpla1wiLFwidG9yZWtcIixcInNyZWRhXCIsXCLEjWV0cnRla1wiLFwicGV0ZWtcIixcInNvYm90YVwiXSxbXCJuZWQuXCIsXCJwb24uXCIsXCJ0b3IuXCIsXCJzcmUuXCIsXCLEjWV0LlwiLFwicGV0LlwiLFwic29iLlwiXV0sdSxbW1wialwiLFwiZlwiLFwibVwiLFwiYVwiLFwibVwiLFwialwiLFwialwiLFwiYVwiLFwic1wiLFwib1wiLFwiblwiLFwiZFwiXSxbXCJqYW4uXCIsXCJmZWIuXCIsXCJtYXIuXCIsXCJhcHIuXCIsXCJtYWpcIixcImp1bi5cIixcImp1bC5cIixcImF2Zy5cIixcInNlcC5cIixcIm9rdC5cIixcIm5vdi5cIixcImRlYy5cIl0sW1wiamFudWFyXCIsXCJmZWJydWFyXCIsXCJtYXJlY1wiLFwiYXByaWxcIixcIm1halwiLFwianVuaWpcIixcImp1bGlqXCIsXCJhdmd1c3RcIixcInNlcHRlbWJlclwiLFwib2t0b2JlclwiLFwibm92ZW1iZXJcIixcImRlY2VtYmVyXCJdXSx1LFtbXCJwci4gS3IuXCIsXCJwbyBLci5cIl0sdSxbXCJwcmVkIEtyaXN0dXNvbVwiLFwicG8gS3Jpc3R1c3VcIl1dLDEsWzYsMF0sW1wiZC4gTU0uIHl5XCIsXCJkLiBNTU0geVwiLFwiZGQuIE1NTU0geVwiLFwiRUVFRSwgZGQuIE1NTU0geVwiXSxbXCJISDptbVwiLFwiSEg6bW06c3NcIixcIkhIOm1tOnNzIHpcIixcIkhIOm1tOnNzIHp6enpcIl0sW1wiezF9IHswfVwiLHUsdSx1XSxbXCIsXCIsXCIuXCIsXCI7XCIsXCIlXCIsXCIrXCIsXCLiiJJcIixcImVcIixcIsOXXCIsXCLigLBcIixcIuKInlwiLFwiTmFOXCIsXCI6XCJdLFtcIiMsIyMwLiMjI1wiLFwiIywjIzDCoCVcIixcIiMsIyMwLjAwwqDCpFwiLFwiI0UwXCJdLFwiRVVSXCIsXCLigqxcIixcImV2cm9cIix7XCJBVURcIjpbdSxcIiRcIl0sXCJCUkxcIjpbdSxcIlIkXCJdLFwiQ0FEXCI6W3UsXCIkXCJdLFwiR0JQXCI6W3UsXCLCo1wiXSxcIk1YTlwiOlt1LFwiJFwiXSxcIk5aRFwiOlt1LFwiJFwiXSxcIlRXRFwiOlt1LFwiTlQkXCJdLFwiWENEXCI6W3UsXCIkXCJdfSxcImx0clwiLCBwbHVyYWxdO1xuIl19