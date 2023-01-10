import { ChangeDetectionStrategy, Component, Directive, EventEmitter, Inject, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT, NgIf, NgTemplateOutlet } from '@angular/common';
import { listenToTriggers } from '../util/triggers';
import { ngbAutoClose } from '../util/autoclose';
import { ngbPositioning } from '../util/positioning';
import { PopupService } from '../util/popup';
import { isString } from '../util/util';
import { addPopperOffset } from '../util/positioning-util';
import * as i0 from "@angular/core";
import * as i1 from "./popover-config";
let nextId = 0;
export class NgbPopoverWindow {
    isTitleTemplate() {
        return this.title instanceof TemplateRef;
    }
}
NgbPopoverWindow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbPopoverWindow, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgbPopoverWindow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0", type: NgbPopoverWindow, isStandalone: true, selector: "ngb-popover-window", inputs: { animation: "animation", title: "title", id: "id", popoverClass: "popoverClass", context: "context" }, host: { attributes: { "role": "tooltip" }, properties: { "class": "\"popover\" + (popoverClass ? \" \" + popoverClass : \"\")", "class.fade": "animation", "id": "id" } }, ngImport: i0, template: ` <div class="popover-arrow" data-popper-arrow></div>
		<h3 class="popover-header" *ngIf="title">
			<ng-template #simpleTitle>{{ title }}</ng-template>
			<ng-template
				[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
				[ngTemplateOutletContext]="context"
			></ng-template>
		</h3>
		<div class="popover-body"><ng-content></ng-content></div>`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbPopoverWindow, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-popover-window',
                    standalone: true,
                    imports: [NgTemplateOutlet, NgIf],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")',
                        '[class.fade]': 'animation',
                        role: 'tooltip',
                        '[id]': 'id',
                    },
                    template: ` <div class="popover-arrow" data-popper-arrow></div>
		<h3 class="popover-header" *ngIf="title">
			<ng-template #simpleTitle>{{ title }}</ng-template>
			<ng-template
				[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
				[ngTemplateOutletContext]="context"
			></ng-template>
		</h3>
		<div class="popover-body"><ng-content></ng-content></div>`,
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], title: [{
                type: Input
            }], id: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], context: [{
                type: Input
            }] } });
/**
 * A lightweight and extensible directive for fancy popover creation.
 */
export class NgbPopover {
    constructor(_elementRef, _renderer, injector, viewContainerRef, config, _ngZone, _document, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * An event emitted when the popover opening animation has finished. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the popover closing animation has finished. Contains no payload.
         *
         * At this point popover is not in the DOM anymore.
         */
        this.hidden = new EventEmitter();
        this._ngbPopoverWindowId = `ngb-popover-${nextId++}`;
        this._windowRef = null;
        this.animation = config.animation;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.popperOptions = config.popperOptions;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disablePopover = config.disablePopover;
        this.popoverClass = config.popoverClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._positioning = ngbPositioning();
        this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, this._ngZone, applicationRef);
    }
    _isDisabled() {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    }
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     */
    open(context) {
        if (!this._windowRef && !this._isDisabled()) {
            // this type assertion is safe because otherwise _isDisabled would return true
            const { windowRef, transition$ } = this._popupService.open(this.ngbPopover, context, this.animation);
            this._windowRef = windowRef;
            this._windowRef.setInput('animation', this.animation);
            this._windowRef.setInput('title', this.popoverTitle);
            this._windowRef.setInput('context', context);
            this._windowRef.setInput('popoverClass', this.popoverClass);
            this._windowRef.setInput('id', this._ngbPopoverWindowId);
            this._renderer.setAttribute(this._getPositionTargetElement(), 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening popover from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because popover won't work inside the OnPush component.
            // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the popover from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                this._positioning.createPopper({
                    hostElement: this._getPositionTargetElement(),
                    targetElement: this._windowRef.location.nativeElement,
                    placement: this.placement,
                    appendToBody: this.container === 'body',
                    baseClass: 'bs-popover',
                    updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 8])(options)),
                });
                Promise.resolve().then(() => {
                    // This update is required for correct arrow placement
                    this._positioning.update();
                    this._zoneSubscription = this._ngZone.onStable.subscribe(() => this._positioning.update());
                });
            });
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [
                this._windowRef.location.nativeElement,
            ]);
            transition$.subscribe(() => this.shown.emit());
        }
    }
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    close(animation = this.animation) {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._getPositionTargetElement(), 'aria-describedby');
            this._popupService.close(animation).subscribe(() => {
                this._windowRef = null;
                this._positioning.destroy();
                this._zoneSubscription?.unsubscribe();
                this.hidden.emit();
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns `true`, if the popover is currently shown.
     */
    isOpen() {
        return this._windowRef != null;
    }
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    ngOnChanges({ ngbPopover, popoverTitle, disablePopover, popoverClass }) {
        if (popoverClass && this.isOpen()) {
            this._windowRef.instance.popoverClass = popoverClass.currentValue;
        }
        // close popover if title and content become empty, or disablePopover set to true
        if ((ngbPopover || popoverTitle || disablePopover) && this._isDisabled()) {
            this.close();
        }
    }
    ngOnDestroy() {
        this.close(false);
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        this._unregisterListenersFn?.();
    }
    _getPositionTargetElement() {
        return ((isString(this.positionTarget) ? this._document.querySelector(this.positionTarget) : this.positionTarget) ||
            this._elementRef.nativeElement);
    }
}
NgbPopover.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbPopover, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i0.ViewContainerRef }, { token: i1.NgbPopoverConfig }, { token: i0.NgZone }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPopover.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0", type: NgbPopover, isStandalone: true, selector: "[ngbPopover]", inputs: { animation: "animation", autoClose: "autoClose", ngbPopover: "ngbPopover", popoverTitle: "popoverTitle", placement: "placement", popperOptions: "popperOptions", triggers: "triggers", positionTarget: "positionTarget", container: "container", disablePopover: "disablePopover", popoverClass: "popoverClass", openDelay: "openDelay", closeDelay: "closeDelay" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbPopover"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbPopover, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i0.ViewContainerRef }, { type: i1.NgbPopoverConfig }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ApplicationRef }]; }, propDecorators: { animation: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], ngbPopover: [{
                type: Input
            }], popoverTitle: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], triggers: [{
                type: Input
            }], positionTarget: [{
                type: Input
            }], container: [{
                type: Input
            }], disablePopover: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], openDelay: [{
                type: Input
            }], closeDelay: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wb3BvdmVyL3BvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVOLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsU0FBUyxFQUVULFlBQVksRUFDWixNQUFNLEVBRU4sS0FBSyxFQUtMLE1BQU0sRUFHTixXQUFXLEVBRVgsaUJBQWlCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBS3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRzNELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQXdCZixNQUFNLE9BQU8sZ0JBQWdCO0lBTzVCLGVBQWU7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLFlBQVksV0FBVyxDQUFDO0lBQzFDLENBQUM7OzZHQVRXLGdCQUFnQjtpR0FBaEIsZ0JBQWdCLHlXQVZsQjs7Ozs7Ozs7NERBUWlELDREQWpCakQsZ0JBQWdCLG9KQUFFLElBQUk7MkZBbUJwQixnQkFBZ0I7a0JBdEI1QixTQUFTO21CQUFDO29CQUNWLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7b0JBQ2pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsSUFBSSxFQUFFO3dCQUNMLFNBQVMsRUFBRSxzREFBc0Q7d0JBQ2pFLGNBQWMsRUFBRSxXQUFXO3dCQUMzQixJQUFJLEVBQUUsU0FBUzt3QkFDZixNQUFNLEVBQUUsSUFBSTtxQkFDWjtvQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7OzREQVFpRDtpQkFDM0Q7OEJBRVMsU0FBUztzQkFBakIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLOztBQU9QOztHQUVHO0FBRUgsTUFBTSxPQUFPLFVBQVU7SUFxSXRCLFlBQ1MsV0FBb0MsRUFDcEMsU0FBb0IsRUFDNUIsUUFBa0IsRUFDbEIsZ0JBQWtDLEVBQ2xDLE1BQXdCLEVBQ2hCLE9BQWUsRUFDRyxTQUFjLEVBQ2hDLGVBQWtDLEVBQzFDLGNBQThCO1FBUnRCLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUNwQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSXBCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDRyxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQ2hDLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjtRQXBDM0M7O1dBRUc7UUFDTyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUUzQzs7OztXQUlHO1FBQ08sV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFcEMsd0JBQW1CLEdBQUcsZUFBZSxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBRWhELGVBQVUsR0FBMEMsSUFBSSxDQUFDO1FBeUJoRSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBWSxDQUNwQyxnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsSUFBSSxDQUFDLE9BQU8sRUFDWixjQUFjLENBQ2QsQ0FBQztJQUNILENBQUM7SUF4Q08sV0FBVztRQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMzQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBa0NEOzs7OztPQUtHO0lBQ0gsSUFBSSxDQUFDLE9BQWE7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDNUMsOEVBQThFO1lBQzlFLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3pELElBQUksQ0FBQyxVQUF1QyxFQUM1QyxPQUFPLEVBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FDZCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUU1RyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFO2dCQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2pHO1lBRUQsdUZBQXVGO1lBQ3ZGLHdFQUF3RTtZQUN4RSw2RUFBNkU7WUFDN0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVsRCxxRkFBcUY7WUFDckYsaUZBQWlGO1lBQ2pGLDRFQUE0RTtZQUM1RSxtRkFBbUY7WUFDbkYsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFakQsK0RBQStEO1lBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztvQkFDOUIsV0FBVyxFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtvQkFDN0MsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFXLENBQUMsUUFBUSxDQUFDLGFBQWE7b0JBQ3RELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztvQkFDekIsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTTtvQkFDdkMsU0FBUyxFQUFFLFlBQVk7b0JBQ3ZCLG1CQUFtQixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN0RixDQUFDLENBQUM7Z0JBRUgsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQzNCLHNEQUFzRDtvQkFDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQzVGLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFFSCxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzNGLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWE7YUFDdEMsQ0FBQyxDQUFDO1lBRUgsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDL0M7SUFDRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVM7UUFDL0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDckYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNO1FBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNiO2FBQU07WUFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDWjtJQUNGLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxRQUFRO1FBQ1AsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGdCQUFnQixDQUM3QyxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUM5QixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ3JCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFDZixDQUFDLElBQUksQ0FBQyxVQUFVLENBQ2hCLENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFpQjtRQUNwRixJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFVBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7U0FDbkU7UUFDRCxpRkFBaUY7UUFDakYsSUFBSSxDQUFDLFVBQVUsSUFBSSxZQUFZLElBQUksY0FBYyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3pFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNiO0lBQ0YsQ0FBQztJQUVELFdBQVc7UUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xCLHFGQUFxRjtRQUNyRiwwRkFBMEY7UUFDMUYsSUFBSSxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU8seUJBQXlCO1FBQ2hDLE9BQU8sQ0FDTixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN6RyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FDOUIsQ0FBQztJQUNILENBQUM7O3VHQS9TVyxVQUFVLG1MQTRJYixRQUFROzJGQTVJTCxVQUFVOzJGQUFWLFVBQVU7a0JBRHRCLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTs7MEJBNkk5RSxNQUFNOzJCQUFDLFFBQVE7eUdBcElSLFNBQVM7c0JBQWpCLEtBQUs7Z0JBYUcsU0FBUztzQkFBakIsS0FBSztnQkFPRyxVQUFVO3NCQUFsQixLQUFLO2dCQU9HLFlBQVk7c0JBQXBCLEtBQUs7Z0JBU0csU0FBUztzQkFBakIsS0FBSztnQkFRRyxhQUFhO3NCQUFyQixLQUFLO2dCQVFHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBUUcsY0FBYztzQkFBdEIsS0FBSztnQkFPRyxTQUFTO3NCQUFqQixLQUFLO2dCQU9HLGNBQWM7c0JBQXRCLEtBQUs7Z0JBT0csWUFBWTtzQkFBcEIsS0FBSztnQkFPRyxTQUFTO3NCQUFqQixLQUFLO2dCQU9HLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0ksS0FBSztzQkFBZCxNQUFNO2dCQU9HLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFwcGxpY2F0aW9uUmVmLFxuXHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbXBvbmVudCxcblx0Q29tcG9uZW50UmVmLFxuXHREaXJlY3RpdmUsXG5cdEVsZW1lbnRSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0SW5qZWN0LFxuXHRJbmplY3Rvcixcblx0SW5wdXQsXG5cdE5nWm9uZSxcblx0T25DaGFuZ2VzLFxuXHRPbkRlc3Ryb3ksXG5cdE9uSW5pdCxcblx0T3V0cHV0LFxuXHRSZW5kZXJlcjIsXG5cdFNpbXBsZUNoYW5nZXMsXG5cdFRlbXBsYXRlUmVmLFxuXHRWaWV3Q29udGFpbmVyUmVmLFxuXHRWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCwgTmdJZiwgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IGxpc3RlblRvVHJpZ2dlcnMgfSBmcm9tICcuLi91dGlsL3RyaWdnZXJzJztcbmltcG9ydCB7IG5nYkF1dG9DbG9zZSB9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7IG5nYlBvc2l0aW9uaW5nLCBQbGFjZW1lbnRBcnJheSB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmltcG9ydCB7IE5nYlBvcG92ZXJDb25maWcgfSBmcm9tICcuL3BvcG92ZXItY29uZmlnJztcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XG5cbmltcG9ydCB7IGFkZFBvcHBlck9mZnNldCB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmctdXRpbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25nYi1wb3BvdmVyLXdpbmRvdycsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGltcG9ydHM6IFtOZ1RlbXBsYXRlT3V0bGV0LCBOZ0lmXSxcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG5cdGhvc3Q6IHtcblx0XHQnW2NsYXNzXSc6ICdcInBvcG92ZXJcIiArIChwb3BvdmVyQ2xhc3MgPyBcIiBcIiArIHBvcG92ZXJDbGFzcyA6IFwiXCIpJyxcblx0XHQnW2NsYXNzLmZhZGVdJzogJ2FuaW1hdGlvbicsXG5cdFx0cm9sZTogJ3Rvb2x0aXAnLFxuXHRcdCdbaWRdJzogJ2lkJyxcblx0fSxcblx0dGVtcGxhdGU6IGAgPGRpdiBjbGFzcz1cInBvcG92ZXItYXJyb3dcIiBkYXRhLXBvcHBlci1hcnJvdz48L2Rpdj5cblx0XHQ8aDMgY2xhc3M9XCJwb3BvdmVyLWhlYWRlclwiICpuZ0lmPVwidGl0bGVcIj5cblx0XHRcdDxuZy10ZW1wbGF0ZSAjc2ltcGxlVGl0bGU+e3sgdGl0bGUgfX08L25nLXRlbXBsYXRlPlxuXHRcdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0XT1cImlzVGl0bGVUZW1wbGF0ZSgpID8gJGFueSh0aXRsZSkgOiBzaW1wbGVUaXRsZVwiXG5cdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjb250ZXh0XCJcblx0XHRcdD48L25nLXRlbXBsYXRlPlxuXHRcdDwvaDM+XG5cdFx0PGRpdiBjbGFzcz1cInBvcG92ZXItYm9keVwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5gLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JQb3BvdmVyV2luZG93IHtcblx0QElucHV0KCkgYW5pbWF0aW9uOiBib29sZWFuO1xuXHRASW5wdXQoKSB0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IG51bGwgfCB1bmRlZmluZWQ7XG5cdEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cdEBJbnB1dCgpIHBvcG92ZXJDbGFzczogc3RyaW5nO1xuXHRASW5wdXQoKSBjb250ZXh0OiBhbnk7XG5cblx0aXNUaXRsZVRlbXBsYXRlKCkge1xuXHRcdHJldHVybiB0aGlzLnRpdGxlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG5cdH1cbn1cblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0IGFuZCBleHRlbnNpYmxlIGRpcmVjdGl2ZSBmb3IgZmFuY3kgcG9wb3ZlciBjcmVhdGlvbi5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nYlBvcG92ZXJdJywgZXhwb3J0QXM6ICduZ2JQb3BvdmVyJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcblx0c3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2F1dG9DbG9zZTogYm9vbGVhbiB8IHN0cmluZztcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBwb3BvdmVyIG9wZW5pbmcgYW5kIGNsb3Npbmcgd2lsbCBiZSBhbmltYXRlZC5cblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBiZSBjbG9zZWQgb24gYEVzY2FwZWAga2V5IGFuZCBpbnNpZGUvb3V0c2lkZSBjbGlja3M6XG5cdCAqXG5cdCAqICogYHRydWVgIC0gY2xvc2VzIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIGBFc2NhcGVgIHByZXNzZXNcblx0ICogKiBgZmFsc2VgIC0gZGlzYWJsZXMgdGhlIGF1dG9DbG9zZSBmZWF0dXJlIChOQjogdHJpZ2dlcnMgc3RpbGwgYXBwbHkpXG5cdCAqICogYFwiaW5zaWRlXCJgIC0gY2xvc2VzIG9uIGluc2lkZSBjbGlja3MgYXMgd2VsbCBhcyBFc2NhcGUgcHJlc3Nlc1xuXHQgKiAqIGBcIm91dHNpZGVcImAgLSBjbG9zZXMgb24gb3V0c2lkZSBjbGlja3MgKHNvbWV0aW1lcyBhbHNvIGFjaGlldmFibGUgdGhyb3VnaCB0cmlnZ2Vycylcblx0ICogYXMgd2VsbCBhcyBgRXNjYXBlYCBwcmVzc2VzXG5cdCAqXG5cdCAqIEBzaW5jZSAzLjAuMFxuXHQgKi9cblx0QElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZSc7XG5cblx0LyoqXG5cdCAqIFRoZSBzdHJpbmcgY29udGVudCBvciBhIGBUZW1wbGF0ZVJlZmAgZm9yIHRoZSBjb250ZW50IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgcG9wb3Zlci5cblx0ICpcblx0ICogSWYgdGhlIHRpdGxlIGFuZCB0aGUgY29udGVudCBhcmUgZmFsc3ksIHRoZSBwb3BvdmVyIHdvbid0IG9wZW4uXG5cdCAqL1xuXHRASW5wdXQoKSBuZ2JQb3BvdmVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHRpdGxlIG9mIHRoZSBwb3BvdmVyLlxuXHQgKlxuXHQgKiBJZiB0aGUgdGl0bGUgYW5kIHRoZSBjb250ZW50IGFyZSBmYWxzeSwgdGhlIHBvcG92ZXIgd29uJ3Qgb3Blbi5cblx0ICovXG5cdEBJbnB1dCgpIHBvcG92ZXJUaXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IG51bGwgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBwcmVmZXJyZWQgcGxhY2VtZW50IG9mIHRoZSBwb3BvdmVyLCBhbW9uZyB0aGUgW3Bvc3NpYmxlIHZhbHVlc10oIy9ndWlkZXMvcG9zaXRpb25pbmcjYXBpKS5cblx0ICpcblx0ICogVGhlIGRlZmF1bHQgb3JkZXIgb2YgcHJlZmVyZW5jZSBpcyBgXCJhdXRvXCJgLlxuXHQgKlxuXHQgKiBQbGVhc2Ugc2VlIHRoZSBbcG9zaXRpb25pbmcgb3ZlcnZpZXddKCMvcG9zaXRpb25pbmcpIGZvciBtb3JlIGRldGFpbHMuXG5cdCAqL1xuXHRASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xuXG5cdC8qKlxuXHQgKiBBbGxvd3MgdG8gY2hhbmdlIGRlZmF1bHQgUG9wcGVyIG9wdGlvbnMgd2hlbiBwb3NpdGlvbmluZyB0aGUgcG9wb3Zlci5cblx0ICogUmVjZWl2ZXMgY3VycmVudCBwb3BwZXIgb3B0aW9ucyBhbmQgcmV0dXJucyBtb2RpZmllZCBvbmVzLlxuXHQgKlxuXHQgKiBAc2luY2UgMTMuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBwb3BwZXJPcHRpb25zOiAob3B0aW9uczogUGFydGlhbDxPcHRpb25zPikgPT4gUGFydGlhbDxPcHRpb25zPjtcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyIHRoZSB0b29sdGlwLlxuXHQgKlxuXHQgKiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50IG5hbWVzLlxuXHQgKiBGb3IgbW9yZSBkZXRhaWxzIHNlZSB0aGUgW3RyaWdnZXJzIGRlbW9dKCMvY29tcG9uZW50cy9wb3BvdmVyL2V4YW1wbGVzI3RyaWdnZXJzKS5cblx0ICovXG5cdEBJbnB1dCgpIHRyaWdnZXJzOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEEgY3NzIHNlbGVjdG9yIG9yIGh0bWwgZWxlbWVudCBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBwb3BvdmVyIHNob3VsZCBiZSBwb3NpdGlvbmVkIGFnYWluc3QuXG5cdCAqIEJ5IGRlZmF1bHQsIHRoZSBlbGVtZW50IGBuZ2JQb3BvdmVyYCBkaXJlY3RpdmUgaXMgYXBwbGllZCB0byB3aWxsIGJlIHNldCBhcyBhIHRhcmdldC5cblx0ICpcblx0ICogQHNpbmNlIDEzLjEuMFxuXHQgKi9cblx0QElucHV0KCkgcG9zaXRpb25UYXJnZXQ/OiBzdHJpbmcgfCBIVE1MRWxlbWVudDtcblxuXHQvKipcblx0ICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cblx0ICpcblx0ICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgYGJvZHlgLlxuXHQgKi9cblx0QElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgcG9wb3ZlciBpcyBkaXNhYmxlZCBhbmQgd29uJ3QgYmUgZGlzcGxheWVkLlxuXHQgKlxuXHQgKiBAc2luY2UgMS4xLjBcblx0ICovXG5cdEBJbnB1dCgpIGRpc2FibGVQb3BvdmVyOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIHRoZSBwb3BvdmVyIHdpbmRvdyBlbGVtZW50LlxuXHQgKlxuXHQgKiBAc2luY2UgMi4yLjBcblx0ICovXG5cdEBJbnB1dCgpIHBvcG92ZXJDbGFzczogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgb3BlbmluZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3IgXCJub24tbWFudWFsXCIgb3BlbmluZyB0cmlnZ2VycyBkZWZpbmVkIGJ5IHRoZSBgdHJpZ2dlcnNgIGlucHV0LlxuXHQgKlxuXHQgKiBAc2luY2UgNC4xLjBcblx0ICovXG5cdEBJbnB1dCgpIG9wZW5EZWxheTogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgY2xvc2luZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3IgXCJub24tbWFudWFsXCIgb3BlbmluZyB0cmlnZ2VycyBkZWZpbmVkIGJ5IHRoZSBgdHJpZ2dlcnNgIGlucHV0LlxuXHQgKlxuXHQgKiBAc2luY2UgNC4xLjBcblx0ICovXG5cdEBJbnB1dCgpIGNsb3NlRGVsYXk6IG51bWJlcjtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb3BvdmVyIG9wZW5pbmcgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZC4gQ29udGFpbnMgbm8gcGF5bG9hZC5cblx0ICovXG5cdEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb3BvdmVyIGNsb3NpbmcgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZC4gQ29udGFpbnMgbm8gcGF5bG9hZC5cblx0ICpcblx0ICogQXQgdGhpcyBwb2ludCBwb3BvdmVyIGlzIG5vdCBpbiB0aGUgRE9NIGFueW1vcmUuXG5cdCAqL1xuXHRAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cdHByaXZhdGUgX25nYlBvcG92ZXJXaW5kb3dJZCA9IGBuZ2ItcG9wb3Zlci0ke25leHRJZCsrfWA7XG5cdHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlBvcG92ZXJXaW5kb3c+O1xuXHRwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JQb3BvdmVyV2luZG93PiB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIF91bnJlZ2lzdGVyTGlzdGVuZXJzRm47XG5cdHByaXZhdGUgX3Bvc2l0aW9uaW5nOiBSZXR1cm5UeXBlPHR5cGVvZiBuZ2JQb3NpdGlvbmluZz47XG5cdHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblx0cHJpdmF0ZSBfaXNEaXNhYmxlZCgpOiBib29sZWFuIHtcblx0XHRpZiAodGhpcy5kaXNhYmxlUG9wb3Zlcikge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5uZ2JQb3BvdmVyICYmICF0aGlzLnBvcG92ZXJUaXRsZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuXHRcdHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG5cdFx0aW5qZWN0b3I6IEluamVjdG9yLFxuXHRcdHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG5cdFx0Y29uZmlnOiBOZ2JQb3BvdmVyQ29uZmlnLFxuXHRcdHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuXHRcdEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG5cdFx0cHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuXHRcdGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcblx0KSB7XG5cdFx0dGhpcy5hbmltYXRpb24gPSBjb25maWcuYW5pbWF0aW9uO1xuXHRcdHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcblx0XHR0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG5cdFx0dGhpcy5wb3BwZXJPcHRpb25zID0gY29uZmlnLnBvcHBlck9wdGlvbnM7XG5cdFx0dGhpcy50cmlnZ2VycyA9IGNvbmZpZy50cmlnZ2Vycztcblx0XHR0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG5cdFx0dGhpcy5kaXNhYmxlUG9wb3ZlciA9IGNvbmZpZy5kaXNhYmxlUG9wb3Zlcjtcblx0XHR0aGlzLnBvcG92ZXJDbGFzcyA9IGNvbmZpZy5wb3BvdmVyQ2xhc3M7XG5cdFx0dGhpcy5vcGVuRGVsYXkgPSBjb25maWcub3BlbkRlbGF5O1xuXHRcdHRoaXMuY2xvc2VEZWxheSA9IGNvbmZpZy5jbG9zZURlbGF5O1xuXHRcdHRoaXMuX3Bvc2l0aW9uaW5nID0gbmdiUG9zaXRpb25pbmcoKTtcblx0XHR0aGlzLl9wb3B1cFNlcnZpY2UgPSBuZXcgUG9wdXBTZXJ2aWNlPE5nYlBvcG92ZXJXaW5kb3c+KFxuXHRcdFx0TmdiUG9wb3ZlcldpbmRvdyxcblx0XHRcdGluamVjdG9yLFxuXHRcdFx0dmlld0NvbnRhaW5lclJlZixcblx0XHRcdF9yZW5kZXJlcixcblx0XHRcdHRoaXMuX25nWm9uZSxcblx0XHRcdGFwcGxpY2F0aW9uUmVmLFxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogT3BlbnMgdGhlIHBvcG92ZXIuXG5cdCAqXG5cdCAqIFRoaXMgaXMgY29uc2lkZXJlZCB0byBiZSBhIFwibWFudWFsXCIgdHJpZ2dlcmluZy5cblx0ICogVGhlIGBjb250ZXh0YCBpcyBhbiBvcHRpb25hbCB2YWx1ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBwb3BvdmVyIHRlbXBsYXRlIHdoZW4gaXQgaXMgY3JlYXRlZC5cblx0ICovXG5cdG9wZW4oY29udGV4dD86IGFueSkge1xuXHRcdGlmICghdGhpcy5fd2luZG93UmVmICYmICF0aGlzLl9pc0Rpc2FibGVkKCkpIHtcblx0XHRcdC8vIHRoaXMgdHlwZSBhc3NlcnRpb24gaXMgc2FmZSBiZWNhdXNlIG90aGVyd2lzZSBfaXNEaXNhYmxlZCB3b3VsZCByZXR1cm4gdHJ1ZVxuXHRcdFx0Y29uc3QgeyB3aW5kb3dSZWYsIHRyYW5zaXRpb24kIH0gPSB0aGlzLl9wb3B1cFNlcnZpY2Uub3Blbihcblx0XHRcdFx0dGhpcy5uZ2JQb3BvdmVyIGFzIHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4sXG5cdFx0XHRcdGNvbnRleHQsXG5cdFx0XHRcdHRoaXMuYW5pbWF0aW9uLFxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZiA9IHdpbmRvd1JlZjtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5zZXRJbnB1dCgnYW5pbWF0aW9uJywgdGhpcy5hbmltYXRpb24pO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmLnNldElucHV0KCd0aXRsZScsIHRoaXMucG9wb3ZlclRpdGxlKTtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5zZXRJbnB1dCgnY29udGV4dCcsIGNvbnRleHQpO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmLnNldElucHV0KCdwb3BvdmVyQ2xhc3MnLCB0aGlzLnBvcG92ZXJDbGFzcyk7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYuc2V0SW5wdXQoJ2lkJywgdGhpcy5fbmdiUG9wb3ZlcldpbmRvd0lkKTtcblxuXHRcdFx0dGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2dldFBvc2l0aW9uVGFyZ2V0RWxlbWVudCgpLCAnYXJpYS1kZXNjcmliZWRieScsIHRoaXMuX25nYlBvcG92ZXJXaW5kb3dJZCk7XG5cblx0XHRcdGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG5cdFx0XHRcdHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2UgbmVlZCB0byBkZXRlY3QgY2hhbmdlcywgYmVjYXVzZSB3ZSBkb24ndCBrbm93IHdoZXJlIC5vcGVuKCkgbWlnaHQgYmUgY2FsbGVkIGZyb20uXG5cdFx0XHQvLyBFeC4gb3BlbmluZyBwb3BvdmVyIGZyb20gb25lIG9mIGxpZmVjeWNsZSBob29rcyB0aGF0IHJ1biBhZnRlciB0aGUgQ0Rcblx0XHRcdC8vIChzYXkgZnJvbSBuZ0FmdGVyVmlld0luaXQpIHdpbGwgcmVzdWx0IGluICdFeHByZXNzaW9uSGFzQ2hhbmdlZCcgZXhjZXB0aW9uXG5cdFx0XHR0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG5cdFx0XHQvLyBXZSBuZWVkIHRvIG1hcmsgZm9yIGNoZWNrLCBiZWNhdXNlIHBvcG92ZXIgd29uJ3Qgd29yayBpbnNpZGUgdGhlIE9uUHVzaCBjb21wb25lbnQuXG5cdFx0XHQvLyBFeC4gd2hlbiB3ZSB1c2UgZXhwcmVzc2lvbiBsaWtlIGB7eyBwb3BvdmVyLmlzT3BlbigpIDogJ29wZW5lZCcgOiAnY2xvc2VkJyB9fWBcblx0XHRcdC8vIGluc2lkZSB0aGUgdGVtcGxhdGUgb2YgYW4gT25QdXNoIGNvbXBvbmVudCBhbmQgd2UgY2hhbmdlIHRoZSBwb3BvdmVyIGZyb21cblx0XHRcdC8vIG9wZW4gLT4gY2xvc2VkLCB0aGUgZXhwcmVzc2lvbiBpbiBxdWVzdGlvbiB3b24ndCBiZSB1cGRhdGVkIHVubGVzcyB3ZSBleHBsaWNpdGx5XG5cdFx0XHQvLyBtYXJrIHRoZSBwYXJlbnQgY29tcG9uZW50IHRvIGJlIGNoZWNrZWQuXG5cdFx0XHR0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cblx0XHRcdC8vIFNldHRpbmcgdXAgcG9wcGVyIGFuZCBzY2hlZHVsaW5nIHVwZGF0ZXMgd2hlbiB6b25lIGlzIHN0YWJsZVxuXHRcdFx0dGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblx0XHRcdFx0dGhpcy5fcG9zaXRpb25pbmcuY3JlYXRlUG9wcGVyKHtcblx0XHRcdFx0XHRob3N0RWxlbWVudDogdGhpcy5fZ2V0UG9zaXRpb25UYXJnZXRFbGVtZW50KCksXG5cdFx0XHRcdFx0dGFyZ2V0RWxlbWVudDogdGhpcy5fd2luZG93UmVmIS5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XHRcdHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXG5cdFx0XHRcdFx0YXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLFxuXHRcdFx0XHRcdGJhc2VDbGFzczogJ2JzLXBvcG92ZXInLFxuXHRcdFx0XHRcdHVwZGF0ZVBvcHBlck9wdGlvbnM6IChvcHRpb25zKSA9PiB0aGlzLnBvcHBlck9wdGlvbnMoYWRkUG9wcGVyT2Zmc2V0KFswLCA4XSkob3B0aW9ucykpLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcblx0XHRcdFx0XHQvLyBUaGlzIHVwZGF0ZSBpcyByZXF1aXJlZCBmb3IgY29ycmVjdCBhcnJvdyBwbGFjZW1lbnRcblx0XHRcdFx0XHR0aGlzLl9wb3NpdGlvbmluZy51cGRhdGUoKTtcblx0XHRcdFx0XHR0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gdGhpcy5fbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9wb3NpdGlvbmluZy51cGRhdGUoKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdG5nYkF1dG9DbG9zZSh0aGlzLl9uZ1pvbmUsIHRoaXMuX2RvY3VtZW50LCB0aGlzLmF1dG9DbG9zZSwgKCkgPT4gdGhpcy5jbG9zZSgpLCB0aGlzLmhpZGRlbiwgW1xuXHRcdFx0XHR0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCxcblx0XHRcdF0pO1xuXG5cdFx0XHR0cmFuc2l0aW9uJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zaG93bi5lbWl0KCkpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZXMgdGhlIHBvcG92ZXIuXG5cdCAqXG5cdCAqIFRoaXMgaXMgY29uc2lkZXJlZCB0byBiZSBhIFwibWFudWFsXCIgdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cblx0ICovXG5cdGNsb3NlKGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9uKSB7XG5cdFx0aWYgKHRoaXMuX3dpbmRvd1JlZikge1xuXHRcdFx0dGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuX2dldFBvc2l0aW9uVGFyZ2V0RWxlbWVudCgpLCAnYXJpYS1kZXNjcmliZWRieScpO1xuXHRcdFx0dGhpcy5fcG9wdXBTZXJ2aWNlLmNsb3NlKGFuaW1hdGlvbikuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0dGhpcy5fd2luZG93UmVmID0gbnVsbDtcblx0XHRcdFx0dGhpcy5fcG9zaXRpb25pbmcuZGVzdHJveSgpO1xuXHRcdFx0XHR0aGlzLl96b25lU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuXHRcdFx0XHR0aGlzLmhpZGRlbi5lbWl0KCk7XG5cdFx0XHRcdHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRvZ2dsZXMgdGhlIHBvcG92ZXIuXG5cdCAqXG5cdCAqIFRoaXMgaXMgY29uc2lkZXJlZCB0byBiZSBhIFwibWFudWFsXCIgdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cblx0ICovXG5cdHRvZ2dsZSgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fd2luZG93UmVmKSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub3BlbigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIHBvcG92ZXIgaXMgY3VycmVudGx5IHNob3duLlxuXHQgKi9cblx0aXNPcGVuKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl93aW5kb3dSZWYgIT0gbnVsbDtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbiA9IGxpc3RlblRvVHJpZ2dlcnMoXG5cdFx0XHR0aGlzLl9yZW5kZXJlcixcblx0XHRcdHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcblx0XHRcdHRoaXMudHJpZ2dlcnMsXG5cdFx0XHR0aGlzLmlzT3Blbi5iaW5kKHRoaXMpLFxuXHRcdFx0dGhpcy5vcGVuLmJpbmQodGhpcyksXG5cdFx0XHR0aGlzLmNsb3NlLmJpbmQodGhpcyksXG5cdFx0XHQrdGhpcy5vcGVuRGVsYXksXG5cdFx0XHQrdGhpcy5jbG9zZURlbGF5LFxuXHRcdCk7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyh7IG5nYlBvcG92ZXIsIHBvcG92ZXJUaXRsZSwgZGlzYWJsZVBvcG92ZXIsIHBvcG92ZXJDbGFzcyB9OiBTaW1wbGVDaGFuZ2VzKSB7XG5cdFx0aWYgKHBvcG92ZXJDbGFzcyAmJiB0aGlzLmlzT3BlbigpKSB7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYhLmluc3RhbmNlLnBvcG92ZXJDbGFzcyA9IHBvcG92ZXJDbGFzcy5jdXJyZW50VmFsdWU7XG5cdFx0fVxuXHRcdC8vIGNsb3NlIHBvcG92ZXIgaWYgdGl0bGUgYW5kIGNvbnRlbnQgYmVjb21lIGVtcHR5LCBvciBkaXNhYmxlUG9wb3ZlciBzZXQgdG8gdHJ1ZVxuXHRcdGlmICgobmdiUG9wb3ZlciB8fCBwb3BvdmVyVGl0bGUgfHwgZGlzYWJsZVBvcG92ZXIpICYmIHRoaXMuX2lzRGlzYWJsZWQoKSkge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdHRoaXMuY2xvc2UoZmFsc2UpO1xuXHRcdC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIGFzIGl0IG1pZ2h0IGhhcHBlbiB0aGF0IG5nT25EZXN0cm95IGlzIGNhbGxlZCBiZWZvcmUgbmdPbkluaXRcblx0XHQvLyB1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnMsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIxOTlcblx0XHR0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4/LigpO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0UG9zaXRpb25UYXJnZXRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0KGlzU3RyaW5nKHRoaXMucG9zaXRpb25UYXJnZXQpID8gdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnBvc2l0aW9uVGFyZ2V0KSA6IHRoaXMucG9zaXRpb25UYXJnZXQpIHx8XG5cdFx0XHR0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRcblx0XHQpO1xuXHR9XG59XG4iXX0=