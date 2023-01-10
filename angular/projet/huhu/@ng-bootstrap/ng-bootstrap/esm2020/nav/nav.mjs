import { Attribute, ContentChildren, Directive, EventEmitter, forwardRef, Inject, Input, Output, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isDefined } from '../util/util';
import { Key } from '../util/key';
import * as i0 from "@angular/core";
import * as i1 from "./nav-config";
const isValidNavId = (id) => isDefined(id) && id !== '';
let navCounter = 0;
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * @since 5.2.0
 */
export class NgbNavContent {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbNavContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbNavContent, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbNavContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0", type: NgbNavContent, isStandalone: true, selector: "ng-template[ngbNavContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbNavContent, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbNavContent]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * @since 5.2.0
 */
export class NgbNavItem {
    constructor(_nav, elementRef) {
        this._nav = _nav;
        this.elementRef = elementRef;
        /**
         * If `true`, the current nav item is disabled and can't be toggled by user.
         *
         * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
         */
        this.disabled = false;
        /**
         * An event emitted when the fade in transition is finished on the related nav content
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the fade out transition is finished on the related nav content
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
    }
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.contentTpl = this.contentTpls.first;
    }
    ngOnInit() {
        if (!isDefined(this.domId)) {
            this.domId = `ngb-nav-${navCounter++}`;
        }
    }
    get active() {
        return this._nav.activeId === this.id;
    }
    get id() {
        return isValidNavId(this._id) ? this._id : this.domId;
    }
    get panelDomId() {
        return `${this.domId}-panel`;
    }
    isPanelInDom() {
        return (isDefined(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active;
    }
}
NgbNavItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbNavItem, deps: [{ token: forwardRef(() => NgbNav) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbNavItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0", type: NgbNavItem, isStandalone: true, selector: "[ngbNavItem]", inputs: { destroyOnHide: "destroyOnHide", disabled: "disabled", domId: "domId", _id: ["ngbNavItem", "_id"] }, outputs: { shown: "shown", hidden: "hidden" }, host: { properties: { "class.nav-item": "true" } }, queries: [{ propertyName: "contentTpls", predicate: NgbNavContent }], exportAs: ["ngbNavItem"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbNavItem, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbNavItem]', exportAs: 'ngbNavItem', standalone: true, host: { '[class.nav-item]': 'true' } }]
        }], ctorParameters: function () { return [{ type: NgbNav, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbNav)]
                }] }, { type: i0.ElementRef }]; }, propDecorators: { destroyOnHide: [{
                type: Input
            }], disabled: [{
                type: Input
            }], domId: [{
                type: Input
            }], _id: [{
                type: Input,
                args: ['ngbNavItem']
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], contentTpls: [{
                type: ContentChildren,
                args: [NgbNavContent, { descendants: false }]
            }] } });
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * @since 5.2.0
 */
export class NgbNav {
    constructor(role, config, _cd, _document) {
        this.role = role;
        this._cd = _cd;
        this._document = _document;
        /**
         * The event emitted after the active nav changes
         * The payload of the event is the newly active nav id
         *
         * If you want to prevent nav change, you should use `(navChange)` event
         */
        this.activeIdChange = new EventEmitter();
        /**
         * An event emitted when the fade in transition is finished for one of the items.
         *
         * Payload of the event is the nav id that was just shown.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the fade out transition is finished for one of the items.
         *
         * Payload of the event is the nav id that was just hidden.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        this.destroy$ = new Subject();
        this.navItemChange$ = new Subject();
        /**
         * The nav change event emitted right before the nav change happens on user click.
         *
         * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
         *
         * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
         */
        this.navChange = new EventEmitter();
        this.animation = config.animation;
        this.destroyOnHide = config.destroyOnHide;
        this.orientation = config.orientation;
        this.roles = config.roles;
        this.keyboard = config.keyboard;
    }
    click(item) {
        if (!item.disabled) {
            this._updateActiveId(item.id);
        }
    }
    onKeyDown(event) {
        if (this.roles !== 'tablist' || !this.keyboard) {
            return;
        }
        /* eslint-disable-next-line deprecation/deprecation */
        const key = event.which;
        const enabledLinks = this.links.filter((link) => !link.navItem.disabled);
        const { length } = enabledLinks;
        let position = -1;
        enabledLinks.forEach((link, index) => {
            if (link.elRef.nativeElement === this._document.activeElement) {
                position = index;
            }
        });
        if (length) {
            switch (key) {
                case Key.ArrowLeft:
                    if (this.orientation === 'vertical') {
                        return;
                    }
                    position = (position - 1 + length) % length;
                    break;
                case Key.ArrowRight:
                    if (this.orientation === 'vertical') {
                        return;
                    }
                    position = (position + 1) % length;
                    break;
                case Key.ArrowDown:
                    if (this.orientation === 'horizontal') {
                        return;
                    }
                    position = (position + 1) % length;
                    break;
                case Key.ArrowUp:
                    if (this.orientation === 'horizontal') {
                        return;
                    }
                    position = (position - 1 + length) % length;
                    break;
                case Key.Home:
                    position = 0;
                    break;
                case Key.End:
                    position = length - 1;
                    break;
            }
            if (this.keyboard === 'changeWithArrows') {
                this.select(enabledLinks[position].navItem.id);
            }
            enabledLinks[position].elRef.nativeElement.focus();
            event.preventDefault();
        }
    }
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     */
    select(id) {
        this._updateActiveId(id, false);
    }
    ngAfterContentInit() {
        if (!isDefined(this.activeId)) {
            const nextId = this.items.first ? this.items.first.id : null;
            if (isValidNavId(nextId)) {
                this._updateActiveId(nextId, false);
                this._cd.detectChanges();
            }
        }
        this.items.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this._notifyItemChanged(this.activeId));
    }
    ngOnChanges({ activeId }) {
        if (activeId && !activeId.firstChange) {
            this._notifyItemChanged(activeId.currentValue);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    _updateActiveId(nextId, emitNavChange = true) {
        if (this.activeId !== nextId) {
            let defaultPrevented = false;
            if (emitNavChange) {
                this.navChange.emit({
                    activeId: this.activeId,
                    nextId,
                    preventDefault: () => {
                        defaultPrevented = true;
                    },
                });
            }
            if (!defaultPrevented) {
                this.activeId = nextId;
                this.activeIdChange.emit(nextId);
                this._notifyItemChanged(nextId);
            }
        }
    }
    _notifyItemChanged(nextItemId) {
        this.navItemChange$.next(this._getItemById(nextItemId));
    }
    _getItemById(itemId) {
        return (this.items && this.items.find((item) => item.id === itemId)) || null;
    }
}
NgbNav.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbNav, deps: [{ token: 'role', attribute: true }, { token: i1.NgbNavConfig }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
NgbNav.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0", type: NgbNav, isStandalone: true, selector: "[ngbNav]", inputs: { activeId: "activeId", animation: "animation", destroyOnHide: "destroyOnHide", orientation: "orientation", roles: "roles", keyboard: "keyboard" }, outputs: { activeIdChange: "activeIdChange", shown: "shown", hidden: "hidden", navChange: "navChange" }, host: { listeners: { "keydown.arrowLeft": "onKeyDown($event)", "keydown.arrowRight": "onKeyDown($event)", "keydown.arrowDown": "onKeyDown($event)", "keydown.arrowUp": "onKeyDown($event)", "keydown.Home": "onKeyDown($event)", "keydown.End": "onKeyDown($event)" }, properties: { "class.nav": "true", "class.flex-column": "orientation === 'vertical'", "attr.aria-orientation": "orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined", "attr.role": "role ? role : roles ? 'tablist' : undefined" } }, queries: [{ propertyName: "items", predicate: NgbNavItem }, { propertyName: "links", predicate: i0.forwardRef(function () { return NgbNavLink; }), descendants: true }], exportAs: ["ngbNav"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbNav, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNav]',
                    exportAs: 'ngbNav',
                    standalone: true,
                    host: {
                        '[class.nav]': 'true',
                        '[class.flex-column]': `orientation === 'vertical'`,
                        '[attr.aria-orientation]': `orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined`,
                        '[attr.role]': `role ? role : roles ? 'tablist' : undefined`,
                        '(keydown.arrowLeft)': 'onKeyDown($event)',
                        '(keydown.arrowRight)': 'onKeyDown($event)',
                        '(keydown.arrowDown)': 'onKeyDown($event)',
                        '(keydown.arrowUp)': 'onKeyDown($event)',
                        '(keydown.Home)': 'onKeyDown($event)',
                        '(keydown.End)': 'onKeyDown($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }, { type: i1.NgbNavConfig }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { activeId: [{
                type: Input
            }], activeIdChange: [{
                type: Output
            }], animation: [{
                type: Input
            }], destroyOnHide: [{
                type: Input
            }], orientation: [{
                type: Input
            }], roles: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], items: [{
                type: ContentChildren,
                args: [NgbNavItem]
            }], links: [{
                type: ContentChildren,
                args: [forwardRef(() => NgbNavLink), { descendants: true }]
            }], navChange: [{
                type: Output
            }] } });
/**
 * A directive to put on the nav link.
 *
 * @since 5.2.0
 */
export class NgbNavLink {
    constructor(role, navItem, nav, elRef) {
        this.role = role;
        this.navItem = navItem;
        this.nav = nav;
        this.elRef = elRef;
    }
    hasNavItemClass() {
        // with alternative markup we have to add `.nav-item` class, because `ngbNavItem` is on the ng-container
        return this.navItem.elementRef.nativeElement.nodeType === Node.COMMENT_NODE;
    }
}
NgbNavLink.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbNavLink, deps: [{ token: 'role', attribute: true }, { token: NgbNavItem }, { token: NgbNav }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbNavLink.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0", type: NgbNavLink, isStandalone: true, selector: "a[ngbNavLink]", host: { attributes: { "href": "" }, listeners: { "click": "nav.click(navItem); $event.preventDefault()" }, properties: { "id": "navItem.domId", "class.nav-link": "true", "class.nav-item": "hasNavItemClass()", "attr.role": "role ? role : nav.roles ? 'tab' : undefined", "class.active": "navItem.active", "class.disabled": "navItem.disabled", "attr.tabindex": "navItem.disabled ? -1 : undefined", "attr.aria-controls": "navItem.isPanelInDom() ? navItem.panelDomId : null", "attr.aria-selected": "navItem.active", "attr.aria-disabled": "navItem.disabled" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbNavLink, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[ngbNavLink]',
                    standalone: true,
                    host: {
                        '[id]': 'navItem.domId',
                        '[class.nav-link]': 'true',
                        '[class.nav-item]': 'hasNavItemClass()',
                        '[attr.role]': `role ? role : nav.roles ? 'tab' : undefined`,
                        href: '',
                        '[class.active]': 'navItem.active',
                        '[class.disabled]': 'navItem.disabled',
                        '[attr.tabindex]': 'navItem.disabled ? -1 : undefined',
                        '[attr.aria-controls]': 'navItem.isPanelInDom() ? navItem.panelDomId : null',
                        '[attr.aria-selected]': 'navItem.active',
                        '[attr.aria-disabled]': 'navItem.disabled',
                        '(click)': 'nav.click(navItem); $event.preventDefault()',
                    },
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }, { type: NgbNavItem }, { type: NgbNav }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25hdi9uYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdOLFNBQVMsRUFFVCxlQUFlLEVBQ2YsU0FBUyxFQUVULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBRWxDLE1BQU0sWUFBWSxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUU3RCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFnQm5COzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sYUFBYTtJQUN6QixZQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7SUFBRyxDQUFDOzswR0FEeEMsYUFBYTs4RkFBYixhQUFhOzJGQUFiLGFBQWE7a0JBRHpCLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsNEJBQTRCLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTs7QUFLdkU7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxVQUFVO0lBaUR0QixZQUFzRCxJQUFZLEVBQVMsVUFBMkI7UUFBaEQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBMUN0Rzs7OztXQUlHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQW1CMUI7Ozs7V0FJRztRQUNPLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTNDOzs7O1dBSUc7UUFDTyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQU02RCxDQUFDO0lBRTFHLHFCQUFxQjtRQUNwQiw4RkFBOEY7UUFDOUYsOEVBQThFO1FBQzlFLGlFQUFpRTtRQUNqRSwyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUMxQyxDQUFDO0lBRUQsUUFBUTtRQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxVQUFVLEVBQUUsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0YsQ0FBQztJQUVELElBQUksTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxFQUFFO1FBQ0wsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDYixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDO0lBQzlCLENBQUM7SUFFRCxZQUFZO1FBQ1gsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDeEcsQ0FBQzs7dUdBL0VXLFVBQVUsa0JBaURGLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkZBakRoQyxVQUFVLHFUQStDTCxhQUFhOzJGQS9DbEIsVUFBVTtrQkFEdEIsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxFQUFFOzswQkFrRHpHLE1BQU07MkJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztxRUE1Q25DLGFBQWE7c0JBQXJCLEtBQUs7Z0JBT0csUUFBUTtzQkFBaEIsS0FBSztnQkFRRyxLQUFLO3NCQUFiLEtBQUs7Z0JBU2UsR0FBRztzQkFBdkIsS0FBSzt1QkFBQyxZQUFZO2dCQU9ULEtBQUs7c0JBQWQsTUFBTTtnQkFPRyxNQUFNO3NCQUFmLE1BQU07Z0JBSWlELFdBQVc7c0JBQWxFLGVBQWU7dUJBQUMsYUFBYSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTs7QUFtQ3ZEOzs7O0dBSUc7QUFrQkgsTUFBTSxPQUFPLE1BQU07SUFtRmxCLFlBQzJCLElBQVksRUFDdEMsTUFBb0IsRUFDWixHQUFzQixFQUNKLFNBQWM7UUFIZCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBRTlCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ0osY0FBUyxHQUFULFNBQVMsQ0FBSztRQTVFekM7Ozs7O1dBS0c7UUFDTyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUEwQ25EOzs7Ozs7V0FNRztRQUNPLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTFDOzs7Ozs7V0FNRztRQUNPLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSzNDLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQXFCLENBQUM7UUFlbEQ7Ozs7OztXQU1HO1FBQ08sY0FBUyxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBZDNELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDakMsQ0FBQztJQVdELEtBQUssQ0FBQyxJQUFnQjtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QjtJQUNGLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBb0I7UUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDL0MsT0FBTztTQUNQO1FBQ0Qsc0RBQXNEO1FBQ3RELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDeEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsWUFBWSxDQUFDO1FBRWhDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWxCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRTtnQkFDOUQsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUNqQjtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxNQUFNLEVBQUU7WUFDWCxRQUFRLEdBQUcsRUFBRTtnQkFDWixLQUFLLEdBQUcsQ0FBQyxTQUFTO29CQUNqQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO3dCQUNwQyxPQUFPO3FCQUNQO29CQUNELFFBQVEsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO29CQUM1QyxNQUFNO2dCQUNQLEtBQUssR0FBRyxDQUFDLFVBQVU7b0JBQ2xCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7d0JBQ3BDLE9BQU87cUJBQ1A7b0JBQ0QsUUFBUSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDbkMsTUFBTTtnQkFDUCxLQUFLLEdBQUcsQ0FBQyxTQUFTO29CQUNqQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWSxFQUFFO3dCQUN0QyxPQUFPO3FCQUNQO29CQUNELFFBQVEsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7b0JBQ25DLE1BQU07Z0JBQ1AsS0FBSyxHQUFHLENBQUMsT0FBTztvQkFDZixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWSxFQUFFO3dCQUN0QyxPQUFPO3FCQUNQO29CQUNELFFBQVEsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO29CQUM1QyxNQUFNO2dCQUNQLEtBQUssR0FBRyxDQUFDLElBQUk7b0JBQ1osUUFBUSxHQUFHLENBQUMsQ0FBQztvQkFDYixNQUFNO2dCQUNQLEtBQUssR0FBRyxDQUFDLEdBQUc7b0JBQ1gsUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ3RCLE1BQU07YUFDUDtZQUNELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxrQkFBa0IsRUFBRTtnQkFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFbkQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0YsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxFQUFPO1FBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDN0QsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3pCO1NBQ0Q7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDM0csQ0FBQztJQUVELFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBaUI7UUFDdEMsSUFBSSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDL0M7SUFDRixDQUFDO0lBRUQsV0FBVztRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLGVBQWUsQ0FBQyxNQUFXLEVBQUUsYUFBYSxHQUFHLElBQUk7UUFDeEQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtZQUM3QixJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUU3QixJQUFJLGFBQWEsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDdkIsTUFBTTtvQkFDTixjQUFjLEVBQUUsR0FBRyxFQUFFO3dCQUNwQixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQ3pCLENBQUM7aUJBQ0QsQ0FBQyxDQUFDO2FBQ0g7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO2dCQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Q7SUFDRixDQUFDO0lBRU8sa0JBQWtCLENBQUMsVUFBZTtRQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLFlBQVksQ0FBQyxNQUFXO1FBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQzlFLENBQUM7O21HQXBPVyxNQUFNLGtCQW9GTixNQUFNLDJGQUdULFFBQVE7dUZBdkZMLE1BQU0sbTJCQTZFRCxVQUFVLDJFQUNPLFVBQVU7MkZBOUVoQyxNQUFNO2tCQWpCbEIsU0FBUzttQkFBQztvQkFDVixRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixJQUFJLEVBQUU7d0JBQ0wsYUFBYSxFQUFFLE1BQU07d0JBQ3JCLHFCQUFxQixFQUFFLDRCQUE0Qjt3QkFDbkQseUJBQXlCLEVBQUUsNEVBQTRFO3dCQUN2RyxhQUFhLEVBQUUsNkNBQTZDO3dCQUM1RCxxQkFBcUIsRUFBRSxtQkFBbUI7d0JBQzFDLHNCQUFzQixFQUFFLG1CQUFtQjt3QkFDM0MscUJBQXFCLEVBQUUsbUJBQW1CO3dCQUMxQyxtQkFBbUIsRUFBRSxtQkFBbUI7d0JBQ3hDLGdCQUFnQixFQUFFLG1CQUFtQjt3QkFDckMsZUFBZSxFQUFFLG1CQUFtQjtxQkFDcEM7aUJBQ0Q7OzBCQXFGRSxTQUFTOzJCQUFDLE1BQU07OzBCQUdoQixNQUFNOzJCQUFDLFFBQVE7NENBOUVSLFFBQVE7c0JBQWhCLEtBQUs7Z0JBUUksY0FBYztzQkFBdkIsTUFBTTtnQkFPRSxTQUFTO3NCQUFqQixLQUFLO2dCQU1HLGFBQWE7c0JBQXJCLEtBQUs7Z0JBT0csV0FBVztzQkFBbkIsS0FBSztnQkFPRyxLQUFLO3NCQUFiLEtBQUs7Z0JBYUcsUUFBUTtzQkFBaEIsS0FBSztnQkFTSSxLQUFLO3NCQUFkLE1BQU07Z0JBU0csTUFBTTtzQkFBZixNQUFNO2dCQUVzQixLQUFLO3NCQUFqQyxlQUFlO3VCQUFDLFVBQVU7Z0JBQzJDLEtBQUs7c0JBQTFFLGVBQWU7dUJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkF5QjFELFNBQVM7c0JBQWxCLE1BQU07O0FBZ0lSOzs7O0dBSUc7QUFtQkgsTUFBTSxPQUFPLFVBQVU7SUFDdEIsWUFDMkIsSUFBWSxFQUMvQixPQUFtQixFQUNuQixHQUFXLEVBQ1gsS0FBaUI7UUFIRSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQy9CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLFVBQUssR0FBTCxLQUFLLENBQVk7SUFDdEIsQ0FBQztJQUVKLGVBQWU7UUFDZCx3R0FBd0c7UUFDeEcsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0UsQ0FBQzs7dUdBWFcsVUFBVSxrQkFFVixNQUFNOzJGQUZOLFVBQVU7MkZBQVYsVUFBVTtrQkFsQnRCLFNBQVM7bUJBQUM7b0JBQ1YsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixJQUFJLEVBQUU7d0JBQ0wsTUFBTSxFQUFFLGVBQWU7d0JBQ3ZCLGtCQUFrQixFQUFFLE1BQU07d0JBQzFCLGtCQUFrQixFQUFFLG1CQUFtQjt3QkFDdkMsYUFBYSxFQUFFLDZDQUE2Qzt3QkFDNUQsSUFBSSxFQUFFLEVBQUU7d0JBQ1IsZ0JBQWdCLEVBQUUsZ0JBQWdCO3dCQUNsQyxrQkFBa0IsRUFBRSxrQkFBa0I7d0JBQ3RDLGlCQUFpQixFQUFFLG1DQUFtQzt3QkFDdEQsc0JBQXNCLEVBQUUsb0RBQW9EO3dCQUM1RSxzQkFBc0IsRUFBRSxnQkFBZ0I7d0JBQ3hDLHNCQUFzQixFQUFFLGtCQUFrQjt3QkFDMUMsU0FBUyxFQUFFLDZDQUE2QztxQkFDeEQ7aUJBQ0Q7OzBCQUdFLFNBQVM7MkJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFmdGVyQ29udGVudENoZWNrZWQsXG5cdEFmdGVyQ29udGVudEluaXQsXG5cdEF0dHJpYnV0ZSxcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbnRlbnRDaGlsZHJlbixcblx0RGlyZWN0aXZlLFxuXHRFbGVtZW50UmVmLFxuXHRFdmVudEVtaXR0ZXIsXG5cdGZvcndhcmRSZWYsXG5cdEluamVjdCxcblx0SW5wdXQsXG5cdE9uQ2hhbmdlcyxcblx0T25EZXN0cm95LFxuXHRPbkluaXQsXG5cdE91dHB1dCxcblx0UXVlcnlMaXN0LFxuXHRTaW1wbGVDaGFuZ2VzLFxuXHRUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgaXNEZWZpbmVkIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IE5nYk5hdkNvbmZpZyB9IGZyb20gJy4vbmF2LWNvbmZpZyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi91dGlsL2tleSc7XG5cbmNvbnN0IGlzVmFsaWROYXZJZCA9IChpZDogYW55KSA9PiBpc0RlZmluZWQoaWQpICYmIGlkICE9PSAnJztcblxubGV0IG5hdkNvdW50ZXIgPSAwO1xuXG4vKipcbiAqIENvbnRleHQgcGFzc2VkIHRvIHRoZSBuYXYgY29udGVudCB0ZW1wbGF0ZS5cbiAqXG4gKiBTZWUgW3RoaXMgZGVtb10oIy9jb21wb25lbnRzL25hdi9leGFtcGxlcyNrZWVwLWNvbnRlbnQpIGFzIHRoZSBleGFtcGxlLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYk5hdkNvbnRlbnRDb250ZXh0IHtcblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgY3VycmVudCBuYXYgY29udGVudCBpcyB2aXNpYmxlIGFuZCBhY3RpdmVcblx0ICovXG5cdCRpbXBsaWNpdDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBtdXN0IGJlIHVzZWQgdG8gd3JhcCBjb250ZW50IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgbmF2LlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JOYXZDb250ZW50XScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZDb250ZW50IHtcblx0Y29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIFRoZSBkaXJlY3RpdmUgdXNlZCB0byBncm91cCBuYXYgbGluayBhbmQgcmVsYXRlZCBuYXYgY29udGVudC4gQXMgd2VsbCBhcyBzZXQgbmF2IGlkZW50aWZpZXIgYW5kIHNvbWUgb3B0aW9ucy5cbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nYk5hdkl0ZW1dJywgZXhwb3J0QXM6ICduZ2JOYXZJdGVtJywgc3RhbmRhbG9uZTogdHJ1ZSwgaG9zdDogeyAnW2NsYXNzLm5hdi1pdGVtXSc6ICd0cnVlJyB9IH0pXG5leHBvcnQgY2xhc3MgTmdiTmF2SXRlbSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsIE9uSW5pdCB7XG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIG5vbi1hY3RpdmUgY3VycmVudCBuYXYgaXRlbSBjb250ZW50IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIERPTVxuXHQgKiBPdGhlcndpc2UgaXQgd2lsbCBqdXN0IGJlIGhpZGRlblxuXHQgKi9cblx0QElucHV0KCkgZGVzdHJveU9uSGlkZTtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB0aGUgY3VycmVudCBuYXYgaXRlbSBpcyBkaXNhYmxlZCBhbmQgY2FuJ3QgYmUgdG9nZ2xlZCBieSB1c2VyLlxuXHQgKlxuXHQgKiBOZXZlcnRoZWxlc3MgZGlzYWJsZWQgbmF2IGNhbiBiZSBzZWxlY3RlZCBwcm9ncmFtbWF0aWNhbGx5IHZpYSB0aGUgYC5zZWxlY3QoKWAgbWV0aG9kIGFuZCB0aGUgYFthY3RpdmVJZF1gIGJpbmRpbmcuXG5cdCAqL1xuXHRASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWQgdXNlZCBmb3IgdGhlIERPTSBlbGVtZW50cy5cblx0ICogTXVzdCBiZSB1bmlxdWUgaW5zaWRlIHRoZSBkb2N1bWVudCBpbiBjYXNlIHlvdSBoYXZlIG11bHRpcGxlIGBuZ2JOYXZgcyBvbiB0aGUgcGFnZS5cblx0ICpcblx0ICogQXV0b2dlbmVyYXRlZCBhcyBgbmdiLW5hdi1YWFhgIGlmIG5vdCBwcm92aWRlZC5cblx0ICovXG5cdEBJbnB1dCgpIGRvbUlkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBpZCB1c2VkIGFzIGEgbW9kZWwgZm9yIGFjdGl2ZSBuYXYuXG5cdCAqIEl0IGNhbiBiZSBhbnl0aGluZywgYnV0IG11c3QgYmUgdW5pcXVlIGluc2lkZSBvbmUgYG5nYk5hdmAuXG5cdCAqXG5cdCAqIFRoZSBvbmx5IGxpbWl0YXRpb24gaXMgdGhhdCBpdCBpcyBub3QgcG9zc2libGUgdG8gaGF2ZSB0aGUgYCcnYCAoZW1wdHkgc3RyaW5nKSBhcyBpZCxcblx0ICogYmVjYXVzZSBgIG5nYk5hdkl0ZW0gYCwgYG5nYk5hdkl0ZW09JydgIGFuZCBgW25nYk5hdkl0ZW1dPVwiJydcImAgYXJlIGluZGlzdGluZ3Vpc2hhYmxlXG5cdCAqL1xuXHRASW5wdXQoJ25nYk5hdkl0ZW0nKSBfaWQ6IGFueTtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBmYWRlIGluIHRyYW5zaXRpb24gaXMgZmluaXNoZWQgb24gdGhlIHJlbGF0ZWQgbmF2IGNvbnRlbnRcblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZmFkZSBvdXQgdHJhbnNpdGlvbiBpcyBmaW5pc2hlZCBvbiB0aGUgcmVsYXRlZCBuYXYgY29udGVudFxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblx0Y29udGVudFRwbDogTmdiTmF2Q29udGVudCB8IG51bGw7XG5cblx0QENvbnRlbnRDaGlsZHJlbihOZ2JOYXZDb250ZW50LCB7IGRlc2NlbmRhbnRzOiBmYWxzZSB9KSBjb250ZW50VHBsczogUXVlcnlMaXN0PE5nYk5hdkNvbnRlbnQ+O1xuXG5cdGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JOYXYpKSBwcml2YXRlIF9uYXY6IE5nYk5hdiwgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8YW55Pikge31cblxuXHRuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG5cdFx0Ly8gV2UgYXJlIHVzaW5nIEBDb250ZW50Q2hpbGRyZW4gaW5zdGVhZCBvZiBAQ29udGVudENoaWxkIGFzIGluIHRoZSBBbmd1bGFyIHZlcnNpb24gYmVpbmcgdXNlZFxuXHRcdC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxuXHRcdC8vIFdpdGhvdXQge2Rlc2NlbmRhbnRzOiBmYWxzZX0gd2UgYXJlIGhpdHRpbmcgYnVncyBkZXNjcmliZWQgaW46XG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIyNDBcblx0XHR0aGlzLmNvbnRlbnRUcGwgPSB0aGlzLmNvbnRlbnRUcGxzLmZpcnN0O1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0aWYgKCFpc0RlZmluZWQodGhpcy5kb21JZCkpIHtcblx0XHRcdHRoaXMuZG9tSWQgPSBgbmdiLW5hdi0ke25hdkNvdW50ZXIrK31gO1xuXHRcdH1cblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX25hdi5hY3RpdmVJZCA9PT0gdGhpcy5pZDtcblx0fVxuXG5cdGdldCBpZCgpIHtcblx0XHRyZXR1cm4gaXNWYWxpZE5hdklkKHRoaXMuX2lkKSA/IHRoaXMuX2lkIDogdGhpcy5kb21JZDtcblx0fVxuXG5cdGdldCBwYW5lbERvbUlkKCkge1xuXHRcdHJldHVybiBgJHt0aGlzLmRvbUlkfS1wYW5lbGA7XG5cdH1cblxuXHRpc1BhbmVsSW5Eb20oKSB7XG5cdFx0cmV0dXJuIChpc0RlZmluZWQodGhpcy5kZXN0cm95T25IaWRlKSA/ICF0aGlzLmRlc3Ryb3lPbkhpZGUgOiAhdGhpcy5fbmF2LmRlc3Ryb3lPbkhpZGUpIHx8IHRoaXMuYWN0aXZlO1xuXHR9XG59XG5cbi8qKlxuICogQSBuYXYgZGlyZWN0aXZlIHRoYXQgaGVscHMgd2l0aCBpbXBsZW1lbnRpbmcgdGFiYmVkIG5hdmlnYXRpb24gY29tcG9uZW50cy5cbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW25nYk5hdl0nLFxuXHRleHBvcnRBczogJ25nYk5hdicsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGhvc3Q6IHtcblx0XHQnW2NsYXNzLm5hdl0nOiAndHJ1ZScsXG5cdFx0J1tjbGFzcy5mbGV4LWNvbHVtbl0nOiBgb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCdgLFxuXHRcdCdbYXR0ci5hcmlhLW9yaWVudGF0aW9uXSc6IGBvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiByb2xlcyA9PT0gJ3RhYmxpc3QnID8gJ3ZlcnRpY2FsJyA6IHVuZGVmaW5lZGAsXG5cdFx0J1thdHRyLnJvbGVdJzogYHJvbGUgPyByb2xlIDogcm9sZXMgPyAndGFibGlzdCcgOiB1bmRlZmluZWRgLFxuXHRcdCcoa2V5ZG93bi5hcnJvd0xlZnQpJzogJ29uS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKGtleWRvd24uYXJyb3dSaWdodCknOiAnb25LZXlEb3duKCRldmVudCknLFxuXHRcdCcoa2V5ZG93bi5hcnJvd0Rvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKGtleWRvd24uYXJyb3dVcCknOiAnb25LZXlEb3duKCRldmVudCknLFxuXHRcdCcoa2V5ZG93bi5Ib21lKSc6ICdvbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLkVuZCknOiAnb25LZXlEb3duKCRldmVudCknLFxuXHR9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXYgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cdHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vcmllbnRhdGlvbjogc3RyaW5nO1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcm9sZXM6IGJvb2xlYW4gfCBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgbmF2IHRoYXQgc2hvdWxkIGJlIGFjdGl2ZVxuXHQgKlxuXHQgKiBZb3UgY291bGQgYWxzbyB1c2UgdGhlIGAuc2VsZWN0KClgIG1ldGhvZCBhbmQgdGhlIGAobmF2Q2hhbmdlKWAgZXZlbnRcblx0ICovXG5cdEBJbnB1dCgpIGFjdGl2ZUlkOiBhbnk7XG5cblx0LyoqXG5cdCAqIFRoZSBldmVudCBlbWl0dGVkIGFmdGVyIHRoZSBhY3RpdmUgbmF2IGNoYW5nZXNcblx0ICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIHRoZSBuZXdseSBhY3RpdmUgbmF2IGlkXG5cdCAqXG5cdCAqIElmIHlvdSB3YW50IHRvIHByZXZlbnQgbmF2IGNoYW5nZSwgeW91IHNob3VsZCB1c2UgYChuYXZDaGFuZ2UpYCBldmVudFxuXHQgKi9cblx0QE91dHB1dCgpIGFjdGl2ZUlkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgbmF2IGNoYW5nZSB3aWxsIGJlIGFuaW1hdGVkLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBub24tYWN0aXZlIG5hdiBjb250ZW50IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIERPTVxuXHQgKiBPdGhlcndpc2UgaXQgd2lsbCBqdXN0IGJlIGhpZGRlblxuXHQgKi9cblx0QElucHV0KCkgZGVzdHJveU9uSGlkZTtcblxuXHQvKipcblx0ICogVGhlIG9yaWVudGF0aW9uIG9mIG5hdnMuXG5cdCAqXG5cdCAqIFVzaW5nIGB2ZXJ0aWNhbGAgd2lsbCBhbHNvIGFkZCB0aGUgYGFyaWEtb3JpZW50YXRpb25gIGF0dHJpYnV0ZVxuXHQgKi9cblx0QElucHV0KCkgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG5cblx0LyoqXG5cdCAqIFJvbGUgYXR0cmlidXRlIGdlbmVyYXRpbmcgc3RyYXRlZ3k6XG5cdCAqIC0gYGZhbHNlYCAtIG5vIHJvbGUgYXR0cmlidXRlcyB3aWxsIGJlIGdlbmVyYXRlZFxuXHQgKiAtIGAndGFibGlzdCdgIC0gJ3RhYmxpc3QnLCAndGFiJyBhbmQgJ3RhYnBhbmVsJyB3aWxsIGJlIGdlbmVyYXRlZCAoZGVmYXVsdClcblx0ICovXG5cdEBJbnB1dCgpIHJvbGVzOiAndGFibGlzdCcgfCBmYWxzZTtcblxuXHQvKipcblx0ICogS2V5Ym9hcmQgc3VwcG9ydCBmb3IgbmF2IGZvY3VzL3NlbGVjdGlvbiB1c2luZyBhcnJvdyBrZXlzLlxuXHQgKlxuXHQgKiAqIGBmYWxzZWAgLSBubyBrZXlib2FyZCBzdXBwb3J0LlxuXHQgKiAqIGB0cnVlYCAtIG5hdnMgd2lsbCBiZSBmb2N1c2VkIHVzaW5nIGtleWJvYXJkIGFycm93IGtleXNcblx0ICogKiBgJ2NoYW5nZVdpdGhBcnJvd3MnYCAtICBuYXYgd2lsbCBiZSBzZWxlY3RlZCB1c2luZyBrZXlib2FyZCBhcnJvdyBrZXlzXG5cdCAqXG5cdCAqIFNlZSB0aGUgW2xpc3Qgb2YgYXZhaWxhYmxlIGtleWJvYXJkIHNob3J0Y3V0c10oIy9jb21wb25lbnRzL25hdi9vdmVydmlldyNrZXlib2FyZC1zaG9ydGN1dHMpLlxuXHQgKlxuXHQgKiBAc2luY2UgNi4xLjBcblx0ICovXG5cdEBJbnB1dCgpIGtleWJvYXJkOiBib29sZWFuIHwgJ2NoYW5nZVdpdGhBcnJvd3MnO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGZhZGUgaW4gdHJhbnNpdGlvbiBpcyBmaW5pc2hlZCBmb3Igb25lIG9mIHRoZSBpdGVtcy5cblx0ICpcblx0ICogUGF5bG9hZCBvZiB0aGUgZXZlbnQgaXMgdGhlIG5hdiBpZCB0aGF0IHdhcyBqdXN0IHNob3duLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGZhZGUgb3V0IHRyYW5zaXRpb24gaXMgZmluaXNoZWQgZm9yIG9uZSBvZiB0aGUgaXRlbXMuXG5cdCAqXG5cdCAqIFBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIHRoZSBuYXYgaWQgdGhhdCB3YXMganVzdCBoaWRkZW4uXG5cdCAqXG5cdCAqIEBzaW5jZSA4LjAuMFxuXHQgKi9cblx0QE91dHB1dCgpIGhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cdEBDb250ZW50Q2hpbGRyZW4oTmdiTmF2SXRlbSkgaXRlbXM6IFF1ZXJ5TGlzdDxOZ2JOYXZJdGVtPjtcblx0QENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IE5nYk5hdkxpbmspLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGxpbmtzOiBRdWVyeUxpc3Q8TmdiTmF2TGluaz47XG5cblx0ZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXHRuYXZJdGVtQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PE5nYk5hdkl0ZW0gfCBudWxsPigpO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdEBBdHRyaWJ1dGUoJ3JvbGUnKSBwdWJsaWMgcm9sZTogc3RyaW5nLFxuXHRcdGNvbmZpZzogTmdiTmF2Q29uZmlnLFxuXHRcdHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0XHRASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuXHQpIHtcblx0XHR0aGlzLmFuaW1hdGlvbiA9IGNvbmZpZy5hbmltYXRpb247XG5cdFx0dGhpcy5kZXN0cm95T25IaWRlID0gY29uZmlnLmRlc3Ryb3lPbkhpZGU7XG5cdFx0dGhpcy5vcmllbnRhdGlvbiA9IGNvbmZpZy5vcmllbnRhdGlvbjtcblx0XHR0aGlzLnJvbGVzID0gY29uZmlnLnJvbGVzO1xuXHRcdHRoaXMua2V5Ym9hcmQgPSBjb25maWcua2V5Ym9hcmQ7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG5hdiBjaGFuZ2UgZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdiBjaGFuZ2UgaGFwcGVucyBvbiB1c2VyIGNsaWNrLlxuXHQgKlxuXHQgKiBUaGlzIGV2ZW50IHdvbid0IGJlIGVtaXR0ZWQgaWYgbmF2IGlzIGNoYW5nZWQgcHJvZ3JhbW1hdGljYWxseSB2aWEgYFthY3RpdmVJZF1gIG9yIGAuc2VsZWN0KClgLlxuXHQgKlxuXHQgKiBTZWUgW2BOZ2JOYXZDaGFuZ2VFdmVudGBdKCMvY29tcG9uZW50cy9uYXYvYXBpI05nYk5hdkNoYW5nZUV2ZW50KSBmb3IgcGF5bG9hZCBkZXRhaWxzLlxuXHQgKi9cblx0QE91dHB1dCgpIG5hdkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiTmF2Q2hhbmdlRXZlbnQ+KCk7XG5cblx0Y2xpY2soaXRlbTogTmdiTmF2SXRlbSkge1xuXHRcdGlmICghaXRlbS5kaXNhYmxlZCkge1xuXHRcdFx0dGhpcy5fdXBkYXRlQWN0aXZlSWQoaXRlbS5pZCk7XG5cdFx0fVxuXHR9XG5cblx0b25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucm9sZXMgIT09ICd0YWJsaXN0JyB8fCAhdGhpcy5rZXlib2FyZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb24gKi9cblx0XHRjb25zdCBrZXkgPSBldmVudC53aGljaDtcblx0XHRjb25zdCBlbmFibGVkTGlua3MgPSB0aGlzLmxpbmtzLmZpbHRlcigobGluaykgPT4gIWxpbmsubmF2SXRlbS5kaXNhYmxlZCk7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IGVuYWJsZWRMaW5rcztcblxuXHRcdGxldCBwb3NpdGlvbiA9IC0xO1xuXG5cdFx0ZW5hYmxlZExpbmtzLmZvckVhY2goKGxpbmssIGluZGV4KSA9PiB7XG5cdFx0XHRpZiAobGluay5lbFJlZi5uYXRpdmVFbGVtZW50ID09PSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG5cdFx0XHRcdHBvc2l0aW9uID0gaW5kZXg7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAobGVuZ3RoKSB7XG5cdFx0XHRzd2l0Y2ggKGtleSkge1xuXHRcdFx0XHRjYXNlIEtleS5BcnJvd0xlZnQ6XG5cdFx0XHRcdFx0aWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zaXRpb24gPSAocG9zaXRpb24gLSAxICsgbGVuZ3RoKSAlIGxlbmd0aDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBLZXkuQXJyb3dSaWdodDpcblx0XHRcdFx0XHRpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3NpdGlvbiA9IChwb3NpdGlvbiArIDEpICUgbGVuZ3RoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIEtleS5BcnJvd0Rvd246XG5cdFx0XHRcdFx0aWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3NpdGlvbiA9IChwb3NpdGlvbiArIDEpICUgbGVuZ3RoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIEtleS5BcnJvd1VwOlxuXHRcdFx0XHRcdGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zaXRpb24gPSAocG9zaXRpb24gLSAxICsgbGVuZ3RoKSAlIGxlbmd0aDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBLZXkuSG9tZTpcblx0XHRcdFx0XHRwb3NpdGlvbiA9IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgS2V5LkVuZDpcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5rZXlib2FyZCA9PT0gJ2NoYW5nZVdpdGhBcnJvd3MnKSB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0KGVuYWJsZWRMaW5rc1twb3NpdGlvbl0ubmF2SXRlbS5pZCk7XG5cdFx0XHR9XG5cdFx0XHRlbmFibGVkTGlua3NbcG9zaXRpb25dLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2VsZWN0cyB0aGUgbmF2IHdpdGggdGhlIGdpdmVuIGlkIGFuZCBzaG93cyBpdHMgYXNzb2NpYXRlZCBwYW5lLlxuXHQgKiBBbnkgb3RoZXIgbmF2IHRoYXQgd2FzIHByZXZpb3VzbHkgc2VsZWN0ZWQgYmVjb21lcyB1bnNlbGVjdGVkIGFuZCBpdHMgYXNzb2NpYXRlZCBwYW5lIGlzIGhpZGRlbi5cblx0ICovXG5cdHNlbGVjdChpZDogYW55KSB7XG5cdFx0dGhpcy5fdXBkYXRlQWN0aXZlSWQoaWQsIGZhbHNlKTtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHRpZiAoIWlzRGVmaW5lZCh0aGlzLmFjdGl2ZUlkKSkge1xuXHRcdFx0Y29uc3QgbmV4dElkID0gdGhpcy5pdGVtcy5maXJzdCA/IHRoaXMuaXRlbXMuZmlyc3QuaWQgOiBudWxsO1xuXHRcdFx0aWYgKGlzVmFsaWROYXZJZChuZXh0SWQpKSB7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZUFjdGl2ZUlkKG5leHRJZCwgZmFsc2UpO1xuXHRcdFx0XHR0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5pdGVtcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbm90aWZ5SXRlbUNoYW5nZWQodGhpcy5hY3RpdmVJZCkpO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoeyBhY3RpdmVJZCB9OiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG5cdFx0aWYgKGFjdGl2ZUlkICYmICFhY3RpdmVJZC5maXJzdENoYW5nZSkge1xuXHRcdFx0dGhpcy5fbm90aWZ5SXRlbUNoYW5nZWQoYWN0aXZlSWQuY3VycmVudFZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLmRlc3Ryb3kkLm5leHQoKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZUFjdGl2ZUlkKG5leHRJZDogYW55LCBlbWl0TmF2Q2hhbmdlID0gdHJ1ZSkge1xuXHRcdGlmICh0aGlzLmFjdGl2ZUlkICE9PSBuZXh0SWQpIHtcblx0XHRcdGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG5cblx0XHRcdGlmIChlbWl0TmF2Q2hhbmdlKSB7XG5cdFx0XHRcdHRoaXMubmF2Q2hhbmdlLmVtaXQoe1xuXHRcdFx0XHRcdGFjdGl2ZUlkOiB0aGlzLmFjdGl2ZUlkLFxuXHRcdFx0XHRcdG5leHRJZCxcblx0XHRcdFx0XHRwcmV2ZW50RGVmYXVsdDogKCkgPT4ge1xuXHRcdFx0XHRcdFx0ZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZGVmYXVsdFByZXZlbnRlZCkge1xuXHRcdFx0XHR0aGlzLmFjdGl2ZUlkID0gbmV4dElkO1xuXHRcdFx0XHR0aGlzLmFjdGl2ZUlkQ2hhbmdlLmVtaXQobmV4dElkKTtcblx0XHRcdFx0dGhpcy5fbm90aWZ5SXRlbUNoYW5nZWQobmV4dElkKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9ub3RpZnlJdGVtQ2hhbmdlZChuZXh0SXRlbUlkOiBhbnkpIHtcblx0XHR0aGlzLm5hdkl0ZW1DaGFuZ2UkLm5leHQodGhpcy5fZ2V0SXRlbUJ5SWQobmV4dEl0ZW1JZCkpO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0SXRlbUJ5SWQoaXRlbUlkOiBhbnkpOiBOZ2JOYXZJdGVtIHwgbnVsbCB7XG5cdFx0cmV0dXJuICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaXRlbUlkKSkgfHwgbnVsbDtcblx0fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIHB1dCBvbiB0aGUgbmF2IGxpbmsuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ2FbbmdiTmF2TGlua10nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7XG5cdFx0J1tpZF0nOiAnbmF2SXRlbS5kb21JZCcsXG5cdFx0J1tjbGFzcy5uYXYtbGlua10nOiAndHJ1ZScsXG5cdFx0J1tjbGFzcy5uYXYtaXRlbV0nOiAnaGFzTmF2SXRlbUNsYXNzKCknLFxuXHRcdCdbYXR0ci5yb2xlXSc6IGByb2xlID8gcm9sZSA6IG5hdi5yb2xlcyA/ICd0YWInIDogdW5kZWZpbmVkYCxcblx0XHRocmVmOiAnJyxcblx0XHQnW2NsYXNzLmFjdGl2ZV0nOiAnbmF2SXRlbS5hY3RpdmUnLFxuXHRcdCdbY2xhc3MuZGlzYWJsZWRdJzogJ25hdkl0ZW0uZGlzYWJsZWQnLFxuXHRcdCdbYXR0ci50YWJpbmRleF0nOiAnbmF2SXRlbS5kaXNhYmxlZCA/IC0xIDogdW5kZWZpbmVkJyxcblx0XHQnW2F0dHIuYXJpYS1jb250cm9sc10nOiAnbmF2SXRlbS5pc1BhbmVsSW5Eb20oKSA/IG5hdkl0ZW0ucGFuZWxEb21JZCA6IG51bGwnLFxuXHRcdCdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICduYXZJdGVtLmFjdGl2ZScsXG5cdFx0J1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ25hdkl0ZW0uZGlzYWJsZWQnLFxuXHRcdCcoY2xpY2spJzogJ25hdi5jbGljayhuYXZJdGVtKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KCknLFxuXHR9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZMaW5rIHtcblx0Y29uc3RydWN0b3IoXG5cdFx0QEF0dHJpYnV0ZSgncm9sZScpIHB1YmxpYyByb2xlOiBzdHJpbmcsXG5cdFx0cHVibGljIG5hdkl0ZW06IE5nYk5hdkl0ZW0sXG5cdFx0cHVibGljIG5hdjogTmdiTmF2LFxuXHRcdHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZixcblx0KSB7fVxuXG5cdGhhc05hdkl0ZW1DbGFzcygpIHtcblx0XHQvLyB3aXRoIGFsdGVybmF0aXZlIG1hcmt1cCB3ZSBoYXZlIHRvIGFkZCBgLm5hdi1pdGVtYCBjbGFzcywgYmVjYXVzZSBgbmdiTmF2SXRlbWAgaXMgb24gdGhlIG5nLWNvbnRhaW5lclxuXHRcdHJldHVybiB0aGlzLm5hdkl0ZW0uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5vZGVUeXBlID09PSBOb2RlLkNPTU1FTlRfTk9ERTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdiBjaGFuZ2UgaGFwcGVucyBvbiB1c2VyIGNsaWNrLlxuICpcbiAqIFRoaXMgZXZlbnQgd29uJ3QgYmUgZW1pdHRlZCBpZiBuYXYgaXMgY2hhbmdlZCBwcm9ncmFtbWF0aWNhbGx5IHZpYSBgW2FjdGl2ZUlkXWAgb3IgYC5zZWxlY3QoKWAuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiTmF2Q2hhbmdlRXZlbnQ8VCA9IGFueT4ge1xuXHQvKipcblx0ICogSWQgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgbmF2LlxuXHQgKi9cblx0YWN0aXZlSWQ6IFQ7XG5cblx0LyoqXG5cdCAqIElkIG9mIHRoZSBuZXdseSBzZWxlY3RlZCBuYXYuXG5cdCAqL1xuXHRuZXh0SWQ6IFQ7XG5cblx0LyoqXG5cdCAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IG5hdiBjaGFuZ2UgaWYgY2FsbGVkLlxuXHQgKi9cblx0cHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XG59XG4iXX0=