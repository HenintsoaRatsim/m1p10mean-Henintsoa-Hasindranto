import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { getValueInRange } from '../util/util';
import { Key } from '../util/key';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./rating-config";
/**
 * A directive that helps visualising and interacting with a star rating bar.
 */
export class NgbRating {
    constructor(config, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.contexts = [];
        this.disabled = false;
        /**
         * An event emitted when the user is hovering over a given rating.
         *
         * Event payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event emitted when the user stops hovering over a given rating.
         *
         * Event payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event emitted when the rating is changed.
         *
         * Event payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.max = config.max;
        this.readonly = config.readonly;
        this.tabindex = config.tabindex;
    }
    ariaValueText() {
        return `${this.nextRate} out of ${this.max}`;
    }
    isInteractive() {
        return !this.readonly && !this.disabled;
    }
    enter(value) {
        if (this.isInteractive()) {
            this._updateState(value);
        }
        this.hover.emit(value);
    }
    handleBlur() {
        this.onTouched();
    }
    handleClick(value) {
        if (this.isInteractive()) {
            this.update(this.resettable && this.rate === value ? 0 : value);
        }
    }
    handleKeyDown(event) {
        /* eslint-disable-next-line deprecation/deprecation */
        switch (event.which) {
            case Key.ArrowDown:
            case Key.ArrowLeft:
                this.update(this.rate - 1);
                break;
            case Key.ArrowUp:
            case Key.ArrowRight:
                this.update(this.rate + 1);
                break;
            case Key.Home:
                this.update(0);
                break;
            case Key.End:
                this.update(this.max);
                break;
            default:
                return;
        }
        // note 'return' in default case
        event.preventDefault();
    }
    ngOnChanges(changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
        if (changes['max']) {
            this._updateMax();
        }
    }
    ngOnInit() {
        this._setupContexts();
        this._updateState(this.rate);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    reset() {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    update(value, internalChange = true) {
        const newRate = getValueInRange(value, this.max, 0);
        if (this.isInteractive() && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    }
    writeValue(value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    }
    _updateState(nextValue) {
        this.nextRate = nextValue;
        this.contexts.forEach((context, index) => (context.fill = Math.round(getValueInRange(nextValue - index, 1, 0) * 100)));
    }
    _updateMax() {
        if (this.max > 0) {
            this._setupContexts();
            this.update(this.rate);
        }
    }
    _setupContexts() {
        this.contexts = Array.from({ length: this.max }, (v, k) => ({ fill: 0, index: k }));
    }
}
NgbRating.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbRating, deps: [{ token: i1.NgbRatingConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NgbRating.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0", type: NgbRating, isStandalone: true, selector: "ngb-rating", inputs: { max: "max", rate: "rate", readonly: "readonly", resettable: "resettable", starTemplate: "starTemplate", tabindex: "tabindex" }, outputs: { hover: "hover", leave: "leave", rateChange: "rateChange" }, host: { attributes: { "role": "slider", "aria-valuemin": "0" }, listeners: { "blur": "handleBlur()", "keydown": "handleKeyDown($event)", "mouseleave": "reset()" }, properties: { "tabindex": "disabled ? -1 : tabindex", "attr.aria-valuemax": "max", "attr.aria-valuenow": "nextRate", "attr.aria-valuetext": "ariaValueText()", "attr.aria-disabled": "readonly ? true : null" }, classAttribute: "d-inline-flex" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRating), multi: true }], queries: [{ propertyName: "starTemplateFromContent", first: true, predicate: TemplateRef, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
		<ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
		<ng-template ngFor [ngForOf]="contexts" let-index="index">
			<span class="visually-hidden">({{ index < nextRate ? '*' : ' ' }})</span>
			<span
				(mouseenter)="enter(index + 1)"
				(click)="handleClick(index + 1)"
				[style.cursor]="isInteractive() ? 'pointer' : 'default'"
			>
				<ng-template
					[ngTemplateOutlet]="starTemplate || starTemplateFromContent || t"
					[ngTemplateOutletContext]="contexts[index]"
				>
				</ng-template>
			</span>
		</ng-template>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbRating, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-rating',
                    standalone: true,
                    imports: [NgFor, NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'd-inline-flex',
                        '[tabindex]': 'disabled ? -1 : tabindex',
                        role: 'slider',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-valuenow]': 'nextRate',
                        '[attr.aria-valuetext]': 'ariaValueText()',
                        '[attr.aria-disabled]': 'readonly ? true : null',
                        '(blur)': 'handleBlur()',
                        '(keydown)': 'handleKeyDown($event)',
                        '(mouseleave)': 'reset()',
                    },
                    template: `
		<ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
		<ng-template ngFor [ngForOf]="contexts" let-index="index">
			<span class="visually-hidden">({{ index < nextRate ? '*' : ' ' }})</span>
			<span
				(mouseenter)="enter(index + 1)"
				(click)="handleClick(index + 1)"
				[style.cursor]="isInteractive() ? 'pointer' : 'default'"
			>
				<ng-template
					[ngTemplateOutlet]="starTemplate || starTemplateFromContent || t"
					[ngTemplateOutletContext]="contexts[index]"
				>
				</ng-template>
			</span>
		</ng-template>
	`,
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRating), multi: true }],
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbRatingConfig }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { max: [{
                type: Input
            }], rate: [{
                type: Input
            }], readonly: [{
                type: Input
            }], resettable: [{
                type: Input
            }], starTemplate: [{
                type: Input
            }], starTemplateFromContent: [{
                type: ContentChild,
                args: [TemplateRef, { static: false }]
            }], tabindex: [{
                type: Input
            }], hover: [{
                type: Output
            }], leave: [{
                type: Output
            }], rateChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3JhdGluZy9yYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNOLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFFTixXQUFXLEVBQ1gsaUJBQWlCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFpQjFEOztHQUVHO0FBdUNILE1BQU0sT0FBTyxTQUFTO0lBaUVyQixZQUFZLE1BQXVCLEVBQVUsa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFoRWxGLGFBQVEsR0FBMEIsRUFBRSxDQUFDO1FBQ3JDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUF1Q2pCOzs7O1dBSUc7UUFDTyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUU3Qzs7OztXQUlHO1FBQ08sVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFN0M7Ozs7V0FJRztRQUNPLGVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUV0RCxhQUFRLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUMxQixjQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBR3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFH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bEMsdUJBQXVCLEVBQUUsaUJBQWlCO3dCQUMxQyxzQkFBc0IsRUFBRSx3QkFBd0I7d0JBQ2hELFFBQVEsRUFBRSxjQUFjO3dCQUN4QixXQUFXLEVBQUUsdUJBQXVCO3dCQUNwQyxjQUFjLEVBQUUsU0FBUztxQkFDekI7b0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0VBZ0JUO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDbEc7c0lBU1MsR0FBRztzQkFBWCxLQUFLO2dCQUtHLElBQUk7c0JBQVosS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQUtHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBT0csWUFBWTtzQkFBcEIsS0FBSztnQkFDd0MsdUJBQXVCO3NCQUFwRSxZQUFZO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBUW5DLFFBQVE7c0JBQWhCLEtBQUs7Z0JBT0ksS0FBSztzQkFBZCxNQUFNO2dCQU9HLEtBQUs7c0JBQWQsTUFBTTtnQkFPRyxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG5cdENoYW5nZURldGVjdG9yUmVmLFxuXHRDb21wb25lbnQsXG5cdENvbnRlbnRDaGlsZCxcblx0RXZlbnRFbWl0dGVyLFxuXHRmb3J3YXJkUmVmLFxuXHRJbnB1dCxcblx0T25DaGFuZ2VzLFxuXHRPbkluaXQsXG5cdE91dHB1dCxcblx0U2ltcGxlQ2hhbmdlcyxcblx0VGVtcGxhdGVSZWYsXG5cdFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nYlJhdGluZ0NvbmZpZyB9IGZyb20gJy4vcmF0aW5nLWNvbmZpZyc7XG5pbXBvcnQgeyBnZXRWYWx1ZUluUmFuZ2UgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vdXRpbC9rZXknO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmdGb3IsIE5nVGVtcGxhdGVPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIFRoZSBjb250ZXh0IGZvciB0aGUgY3VzdG9tIHN0YXIgZGlzcGxheSB0ZW1wbGF0ZSBkZWZpbmVkIGluIHRoZSBgc3RhclRlbXBsYXRlYC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGFyVGVtcGxhdGVDb250ZXh0IHtcblx0LyoqXG5cdCAqIFRoZSBzdGFyIGZpbGwgcGVyY2VudGFnZSwgYW4gaW50ZWdlciBpbiB0aGUgYFswLCAxMDBdYCByYW5nZS5cblx0ICovXG5cdGZpbGw6IG51bWJlcjtcblxuXHQvKipcblx0ICogSW5kZXggb2YgdGhlIHN0YXIsIHN0YXJ0cyB3aXRoIGAwYC5cblx0ICovXG5cdGluZGV4OiBudW1iZXI7XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBoZWxwcyB2aXN1YWxpc2luZyBhbmQgaW50ZXJhY3Rpbmcgd2l0aCBhIHN0YXIgcmF0aW5nIGJhci5cbiAqL1xuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmdiLXJhdGluZycsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGltcG9ydHM6IFtOZ0ZvciwgTmdUZW1wbGF0ZU91dGxldF0sXG5cdGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuXHRob3N0OiB7XG5cdFx0Y2xhc3M6ICdkLWlubGluZS1mbGV4Jyxcblx0XHQnW3RhYmluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogdGFiaW5kZXgnLFxuXHRcdHJvbGU6ICdzbGlkZXInLFxuXHRcdCdhcmlhLXZhbHVlbWluJzogJzAnLFxuXHRcdCdbYXR0ci5hcmlhLXZhbHVlbWF4XSc6ICdtYXgnLFxuXHRcdCdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICduZXh0UmF0ZScsXG5cdFx0J1thdHRyLmFyaWEtdmFsdWV0ZXh0XSc6ICdhcmlhVmFsdWVUZXh0KCknLFxuXHRcdCdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdyZWFkb25seSA/IHRydWUgOiBudWxsJyxcblx0XHQnKGJsdXIpJzogJ2hhbmRsZUJsdXIoKScsXG5cdFx0JyhrZXlkb3duKSc6ICdoYW5kbGVLZXlEb3duKCRldmVudCknLFxuXHRcdCcobW91c2VsZWF2ZSknOiAncmVzZXQoKScsXG5cdH0sXG5cdHRlbXBsYXRlOiBgXG5cdFx0PG5nLXRlbXBsYXRlICN0IGxldC1maWxsPVwiZmlsbFwiPnt7IGZpbGwgPT09IDEwMCA/ICcmIzk3MzM7JyA6ICcmIzk3MzQ7JyB9fTwvbmctdGVtcGxhdGU+XG5cdFx0PG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cImNvbnRleHRzXCIgbGV0LWluZGV4PVwiaW5kZXhcIj5cblx0XHRcdDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+KHt7IGluZGV4IDwgbmV4dFJhdGUgPyAnKicgOiAnICcgfX0pPC9zcGFuPlxuXHRcdFx0PHNwYW5cblx0XHRcdFx0KG1vdXNlZW50ZXIpPVwiZW50ZXIoaW5kZXggKyAxKVwiXG5cdFx0XHRcdChjbGljayk9XCJoYW5kbGVDbGljayhpbmRleCArIDEpXCJcblx0XHRcdFx0W3N0eWxlLmN1cnNvcl09XCJpc0ludGVyYWN0aXZlKCkgPyAncG9pbnRlcicgOiAnZGVmYXVsdCdcIlxuXHRcdFx0PlxuXHRcdFx0XHQ8bmctdGVtcGxhdGVcblx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldF09XCJzdGFyVGVtcGxhdGUgfHwgc3RhclRlbXBsYXRlRnJvbUNvbnRlbnQgfHwgdFwiXG5cdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNvbnRleHRzW2luZGV4XVwiXG5cdFx0XHRcdD5cblx0XHRcdFx0PC9uZy10ZW1wbGF0ZT5cblx0XHRcdDwvc3Bhbj5cblx0XHQ8L25nLXRlbXBsYXRlPlxuXHRgLFxuXHRwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JSYXRpbmcpLCBtdWx0aTogdHJ1ZSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiUmF0aW5nIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcblx0Y29udGV4dHM6IFN0YXJUZW1wbGF0ZUNvbnRleHRbXSA9IFtdO1xuXHRkaXNhYmxlZCA9IGZhbHNlO1xuXHRuZXh0UmF0ZTogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW1hbCByYXRpbmcgdGhhdCBjYW4gYmUgZ2l2ZW4uXG5cdCAqL1xuXHRASW5wdXQoKSBtYXg6IG51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGN1cnJlbnQgcmF0aW5nLiBDb3VsZCBiZSBhIGRlY2ltYWwgdmFsdWUgbGlrZSBgMy43NWAuXG5cdCAqL1xuXHRASW5wdXQoKSByYXRlOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIHJhdGluZyBjYW4ndCBiZSBjaGFuZ2VkLlxuXHQgKi9cblx0QElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIHJhdGluZyBjYW4gYmUgcmVzZXQgdG8gYDBgIGJ5IG1vdXNlIGNsaWNraW5nIGN1cnJlbnRseSBzZXQgcmF0aW5nLlxuXHQgKi9cblx0QElucHV0KCkgcmVzZXR0YWJsZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIHRlbXBsYXRlIHRvIG92ZXJyaWRlIHRoZSB3YXkgZWFjaCBzdGFyIGlzIGRpc3BsYXllZC5cblx0ICpcblx0ICogQWx0ZXJuYXRpdmVseSBwdXQgYW4gYDxuZy10ZW1wbGF0ZT5gIGFzIHRoZSBvbmx5IGNoaWxkIG9mIHlvdXIgYDxuZ2ItcmF0aW5nPmAgZWxlbWVudFxuXHQgKi9cblx0QElucHV0KCkgc3RhclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxTdGFyVGVtcGxhdGVDb250ZXh0Pjtcblx0QENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IGZhbHNlIH0pIHN0YXJUZW1wbGF0ZUZyb21Db250ZW50OiBUZW1wbGF0ZVJlZjxTdGFyVGVtcGxhdGVDb250ZXh0PjtcblxuXHQvKipcblx0ICogQWxsb3dzIHNldHRpbmcgYSBjdXN0b20gcmF0aW5nIHRhYmluZGV4LlxuXHQgKiBJZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBgdGFiaW5kZXhgIHdpbGwgc3RpbGwgYmUgc2V0IHRvIGAtMWAuXG5cdCAqXG5cdCAqIEBzaW5jZSAxMy4xLjBcblx0ICovXG5cdEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgfCBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBpcyBob3ZlcmluZyBvdmVyIGEgZ2l2ZW4gcmF0aW5nLlxuXHQgKlxuXHQgKiBFdmVudCBwYXlsb2FkIGVxdWFscyB0byB0aGUgcmF0aW5nIGJlaW5nIGhvdmVyZWQgb3Zlci5cblx0ICovXG5cdEBPdXRwdXQoKSBob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgaG92ZXJpbmcgb3ZlciBhIGdpdmVuIHJhdGluZy5cblx0ICpcblx0ICogRXZlbnQgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIHJhdGluZyBvZiB0aGUgbGFzdCBpdGVtIGJlaW5nIGhvdmVyZWQgb3Zlci5cblx0ICovXG5cdEBPdXRwdXQoKSBsZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHJhdGluZyBpcyBjaGFuZ2VkLlxuXHQgKlxuXHQgKiBFdmVudCBwYXlsb2FkIGVxdWFscyB0byB0aGUgbmV3bHkgc2VsZWN0ZWQgcmF0aW5nLlxuXHQgKi9cblx0QE91dHB1dCgpIHJhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4odHJ1ZSk7XG5cblx0b25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcblx0b25Ub3VjaGVkID0gKCkgPT4ge307XG5cblx0Y29uc3RydWN0b3IoY29uZmlnOiBOZ2JSYXRpbmdDb25maWcsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuXHRcdHRoaXMubWF4ID0gY29uZmlnLm1heDtcblx0XHR0aGlzLnJlYWRvbmx5ID0gY29uZmlnLnJlYWRvbmx5O1xuXHRcdHRoaXMudGFiaW5kZXggPSBjb25maWcudGFiaW5kZXg7XG5cdH1cblxuXHRhcmlhVmFsdWVUZXh0KCkge1xuXHRcdHJldHVybiBgJHt0aGlzLm5leHRSYXRlfSBvdXQgb2YgJHt0aGlzLm1heH1gO1xuXHR9XG5cblx0aXNJbnRlcmFjdGl2ZSgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQ7XG5cdH1cblxuXHRlbnRlcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuaXNJbnRlcmFjdGl2ZSgpKSB7XG5cdFx0XHR0aGlzLl91cGRhdGVTdGF0ZSh2YWx1ZSk7XG5cdFx0fVxuXHRcdHRoaXMuaG92ZXIuZW1pdCh2YWx1ZSk7XG5cdH1cblxuXHRoYW5kbGVCbHVyKCkge1xuXHRcdHRoaXMub25Ub3VjaGVkKCk7XG5cdH1cblxuXHRoYW5kbGVDbGljayh2YWx1ZTogbnVtYmVyKSB7XG5cdFx0aWYgKHRoaXMuaXNJbnRlcmFjdGl2ZSgpKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZSh0aGlzLnJlc2V0dGFibGUgJiYgdGhpcy5yYXRlID09PSB2YWx1ZSA/IDAgOiB2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0aGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuXHRcdC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvbiAqL1xuXHRcdHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblx0XHRcdGNhc2UgS2V5LkFycm93RG93bjpcblx0XHRcdGNhc2UgS2V5LkFycm93TGVmdDpcblx0XHRcdFx0dGhpcy51cGRhdGUodGhpcy5yYXRlIC0gMSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBLZXkuQXJyb3dVcDpcblx0XHRcdGNhc2UgS2V5LkFycm93UmlnaHQ6XG5cdFx0XHRcdHRoaXMudXBkYXRlKHRoaXMucmF0ZSArIDEpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgS2V5LkhvbWU6XG5cdFx0XHRcdHRoaXMudXBkYXRlKDApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgS2V5LkVuZDpcblx0XHRcdFx0dGhpcy51cGRhdGUodGhpcy5tYXgpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBub3RlICdyZXR1cm4nIGluIGRlZmF1bHQgY2FzZVxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cdFx0aWYgKGNoYW5nZXNbJ3JhdGUnXSkge1xuXHRcdFx0dGhpcy51cGRhdGUodGhpcy5yYXRlKTtcblx0XHR9XG5cdFx0aWYgKGNoYW5nZXNbJ21heCddKSB7XG5cdFx0XHR0aGlzLl91cGRhdGVNYXgoKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0XHR0aGlzLl9zZXR1cENvbnRleHRzKCk7XG5cdFx0dGhpcy5fdXBkYXRlU3RhdGUodGhpcy5yYXRlKTtcblx0fVxuXG5cdHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLm9uQ2hhbmdlID0gZm47XG5cdH1cblxuXHRyZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7XG5cdFx0dGhpcy5vblRvdWNoZWQgPSBmbjtcblx0fVxuXG5cdHJlc2V0KCk6IHZvaWQge1xuXHRcdHRoaXMubGVhdmUuZW1pdCh0aGlzLm5leHRSYXRlKTtcblx0XHR0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLnJhdGUpO1xuXHR9XG5cblx0c2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG5cdFx0dGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG5cdH1cblxuXHR1cGRhdGUodmFsdWU6IG51bWJlciwgaW50ZXJuYWxDaGFuZ2UgPSB0cnVlKTogdm9pZCB7XG5cdFx0Y29uc3QgbmV3UmF0ZSA9IGdldFZhbHVlSW5SYW5nZSh2YWx1ZSwgdGhpcy5tYXgsIDApO1xuXHRcdGlmICh0aGlzLmlzSW50ZXJhY3RpdmUoKSAmJiB0aGlzLnJhdGUgIT09IG5ld1JhdGUpIHtcblx0XHRcdHRoaXMucmF0ZSA9IG5ld1JhdGU7XG5cdFx0XHR0aGlzLnJhdGVDaGFuZ2UuZW1pdCh0aGlzLnJhdGUpO1xuXHRcdH1cblx0XHRpZiAoaW50ZXJuYWxDaGFuZ2UpIHtcblx0XHRcdHRoaXMub25DaGFuZ2UodGhpcy5yYXRlKTtcblx0XHRcdHRoaXMub25Ub3VjaGVkKCk7XG5cdFx0fVxuXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XG5cdH1cblxuXHR3cml0ZVZhbHVlKHZhbHVlKSB7XG5cdFx0dGhpcy51cGRhdGUodmFsdWUsIGZhbHNlKTtcblx0XHR0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZVN0YXRlKG5leHRWYWx1ZTogbnVtYmVyKSB7XG5cdFx0dGhpcy5uZXh0UmF0ZSA9IG5leHRWYWx1ZTtcblx0XHR0aGlzLmNvbnRleHRzLmZvckVhY2goXG5cdFx0XHQoY29udGV4dCwgaW5kZXgpID0+IChjb250ZXh0LmZpbGwgPSBNYXRoLnJvdW5kKGdldFZhbHVlSW5SYW5nZShuZXh0VmFsdWUgLSBpbmRleCwgMSwgMCkgKiAxMDApKSxcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBfdXBkYXRlTWF4KCkge1xuXHRcdGlmICh0aGlzLm1heCA+IDApIHtcblx0XHRcdHRoaXMuX3NldHVwQ29udGV4dHMoKTtcblx0XHRcdHRoaXMudXBkYXRlKHRoaXMucmF0ZSk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfc2V0dXBDb250ZXh0cygpIHtcblx0XHR0aGlzLmNvbnRleHRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy5tYXggfSwgKHYsIGspID0+ICh7IGZpbGw6IDAsIGluZGV4OiBrIH0pKTtcblx0fVxufVxuIl19