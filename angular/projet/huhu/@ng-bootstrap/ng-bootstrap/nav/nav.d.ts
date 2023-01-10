import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbNavConfig } from './nav-config';
import * as i0 from "@angular/core";
/**
 * Context passed to the nav content template.
 *
 * See [this demo](#/components/nav/examples#keep-content) as the example.
 *
 * @since 5.2.0
 */
export interface NgbNavContentContext {
    /**
     * If `true`, current nav content is visible and active
     */
    $implicit: boolean;
}
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * @since 5.2.0
 */
export declare class NgbNavContent {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavContent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavContent, "ng-template[ngbNavContent]", never, {}, {}, never, never, true, never>;
}
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * @since 5.2.0
 */
export declare class NgbNavItem implements AfterContentChecked, OnInit {
    private _nav;
    elementRef: ElementRef<any>;
    /**
     * If `true`, non-active current nav item content will be removed from DOM
     * Otherwise it will just be hidden
     */
    destroyOnHide: any;
    /**
     * If `true`, the current nav item is disabled and can't be toggled by user.
     *
     * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
     */
    disabled: boolean;
    /**
     * The id used for the DOM elements.
     * Must be unique inside the document in case you have multiple `ngbNav`s on the page.
     *
     * Autogenerated as `ngb-nav-XXX` if not provided.
     */
    domId: string;
    /**
     * The id used as a model for active nav.
     * It can be anything, but must be unique inside one `ngbNav`.
     *
     * The only limitation is that it is not possible to have the `''` (empty string) as id,
     * because ` ngbNavItem `, `ngbNavItem=''` and `[ngbNavItem]="''"` are indistinguishable
     */
    _id: any;
    /**
     * An event emitted when the fade in transition is finished on the related nav content
     *
     * @since 8.0.0
     */
    shown: EventEmitter<void>;
    /**
     * An event emitted when the fade out transition is finished on the related nav content
     *
     * @since 8.0.0
     */
    hidden: EventEmitter<void>;
    contentTpl: NgbNavContent | null;
    contentTpls: QueryList<NgbNavContent>;
    constructor(_nav: NgbNav, elementRef: ElementRef<any>);
    ngAfterContentChecked(): void;
    ngOnInit(): void;
    get active(): boolean;
    get id(): any;
    get panelDomId(): string;
    isPanelInDom(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavItem, "[ngbNavItem]", ["ngbNavItem"], { "destroyOnHide": "destroyOnHide"; "disabled": "disabled"; "domId": "domId"; "_id": "ngbNavItem"; }, { "shown": "shown"; "hidden": "hidden"; }, ["contentTpls"], never, true, never>;
}
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * @since 5.2.0
 */
export declare class NgbNav implements AfterContentInit, OnChanges, OnDestroy {
    role: string;
    private _cd;
    private _document;
    static ngAcceptInputType_orientation: string;
    static ngAcceptInputType_roles: boolean | string;
    /**
     * The id of the nav that should be active
     *
     * You could also use the `.select()` method and the `(navChange)` event
     */
    activeId: any;
    /**
     * The event emitted after the active nav changes
     * The payload of the event is the newly active nav id
     *
     * If you want to prevent nav change, you should use `(navChange)` event
     */
    activeIdChange: EventEmitter<any>;
    /**
     * If `true`, nav change will be animated.
     *
     * @since 8.0.0
     */
    animation: boolean;
    /**
     * If `true`, non-active nav content will be removed from DOM
     * Otherwise it will just be hidden
     */
    destroyOnHide: any;
    /**
     * The orientation of navs.
     *
     * Using `vertical` will also add the `aria-orientation` attribute
     */
    orientation: 'horizontal' | 'vertical';
    /**
     * Role attribute generating strategy:
     * - `false` - no role attributes will be generated
     * - `'tablist'` - 'tablist', 'tab' and 'tabpanel' will be generated (default)
     */
    roles: 'tablist' | false;
    /**
     * Keyboard support for nav focus/selection using arrow keys.
     *
     * * `false` - no keyboard support.
     * * `true` - navs will be focused using keyboard arrow keys
     * * `'changeWithArrows'` -  nav will be selected using keyboard arrow keys
     *
     * See the [list of available keyboard shortcuts](#/components/nav/overview#keyboard-shortcuts).
     *
     * @since 6.1.0
     */
    keyboard: boolean | 'changeWithArrows';
    /**
     * An event emitted when the fade in transition is finished for one of the items.
     *
     * Payload of the event is the nav id that was just shown.
     *
     * @since 8.0.0
     */
    shown: EventEmitter<any>;
    /**
     * An event emitted when the fade out transition is finished for one of the items.
     *
     * Payload of the event is the nav id that was just hidden.
     *
     * @since 8.0.0
     */
    hidden: EventEmitter<any>;
    items: QueryList<NgbNavItem>;
    links: QueryList<NgbNavLink>;
    destroy$: Subject<void>;
    navItemChange$: Subject<NgbNavItem | null>;
    constructor(role: string, config: NgbNavConfig, _cd: ChangeDetectorRef, _document: any);
    /**
     * The nav change event emitted right before the nav change happens on user click.
     *
     * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
     *
     * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
     */
    navChange: EventEmitter<NgbNavChangeEvent<any>>;
    click(item: NgbNavItem): void;
    onKeyDown(event: KeyboardEvent): void;
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     */
    select(id: any): void;
    ngAfterContentInit(): void;
    ngOnChanges({ activeId }: SimpleChanges): void;
    ngOnDestroy(): void;
    private _updateActiveId;
    private _notifyItemChanged;
    private _getItemById;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNav, [{ attribute: "role"; }, null, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNav, "[ngbNav]", ["ngbNav"], { "activeId": "activeId"; "animation": "animation"; "destroyOnHide": "destroyOnHide"; "orientation": "orientation"; "roles": "roles"; "keyboard": "keyboard"; }, { "activeIdChange": "activeIdChange"; "shown": "shown"; "hidden": "hidden"; "navChange": "navChange"; }, ["items", "links"], never, true, never>;
}
/**
 * A directive to put on the nav link.
 *
 * @since 5.2.0
 */
export declare class NgbNavLink {
    role: string;
    navItem: NgbNavItem;
    nav: NgbNav;
    elRef: ElementRef;
    constructor(role: string, navItem: NgbNavItem, nav: NgbNav, elRef: ElementRef);
    hasNavItemClass(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavLink, [{ attribute: "role"; }, null, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavLink, "a[ngbNavLink]", never, {}, {}, never, never, true, never>;
}
/**
 * The payload of the change event emitted right before the nav change happens on user click.
 *
 * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
 *
 * @since 5.2.0
 */
export interface NgbNavChangeEvent<T = any> {
    /**
     * Id of the currently active nav.
     */
    activeId: T;
    /**
     * Id of the newly selected nav.
     */
    nextId: T;
    /**
     * Function that will prevent nav change if called.
     */
    preventDefault: () => void;
}
