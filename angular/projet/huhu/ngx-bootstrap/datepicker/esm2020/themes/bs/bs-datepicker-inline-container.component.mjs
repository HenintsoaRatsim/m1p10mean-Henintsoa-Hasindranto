import { Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { BsDatepickerContainerComponent } from './bs-datepicker-container.component';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { datepickerAnimation } from '../../datepicker-animations';
import * as i0 from "@angular/core";
import * as i1 from "../../bs-datepicker.config";
import * as i2 from "../../reducer/bs-datepicker.store";
import * as i3 from "../../reducer/bs-datepicker.actions";
import * as i4 from "../../reducer/bs-datepicker.effects";
import * as i5 from "ngx-bootstrap/positioning";
import * as i6 from "@angular/common";
import * as i7 from "ngx-bootstrap/timepicker";
import * as i8 from "./bs-custom-dates-view.component";
import * as i9 from "./bs-days-calendar-view.component";
import * as i10 from "./bs-months-calendar-view.component";
import * as i11 from "./bs-years-calendar-view.component";
export class BsDatepickerInlineContainerComponent extends BsDatepickerContainerComponent {
    constructor(_renderer, _config, _store, _element, _actions, _effects, _positioningService) {
        super(_renderer, _config, _store, _element, _actions, _effects, _positioningService);
        _renderer.setStyle(_element.nativeElement, 'display', 'inline-block');
        _renderer.setStyle(_element.nativeElement, 'position', 'static');
    }
    get disabledValue() {
        return this.isDatePickerDisabled ? '' : null;
    }
    get readonlyValue() {
        return this.isDatePickerDisabled ? '' : null;
    }
}
BsDatepickerInlineContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: BsDatepickerInlineContainerComponent, deps: [{ token: i0.Renderer2 }, { token: i1.BsDatepickerConfig }, { token: i2.BsDatepickerStore }, { token: i0.ElementRef }, { token: i3.BsDatepickerActions }, { token: i4.BsDatepickerEffects }, { token: i5.PositioningService }], target: i0.ɵɵFactoryTarget.Component });
BsDatepickerInlineContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: BsDatepickerInlineContainerComponent, selector: "bs-datepicker-inline-container", host: { listeners: { "click": "_stopPropagation($event)" }, properties: { "attr.disabled": "this.disabledValue", "attr.readonly": "this.readonlyValue" } }, providers: [BsDatepickerStore, BsDatepickerEffects], usesInheritance: true, ngImport: i0, template: "<!-- days calendar view mode -->\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\n  <div class=\"bs-datepicker-container\"\n    [@datepickerAnimation]=\"animationState\"\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\n    <!--calendars-->\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\n      <!--days calendar-->\n      <ng-container *ngSwitchCase=\"'day'\">\n        <div class=\"bs-media-container\">\n          <bs-days-calendar-view\n            *ngFor=\"let calendar of daysCalendar$ | async\"\n            [class.bs-datepicker-multiple]=\"multipleCalendars\"\n            [calendar]=\"calendar\"\n            [isDisabled]=\"isDatePickerDisabled\"\n            [options]=\"options$ | async\"\n            (onNavigate)=\"navigateTo($event)\"\n            (onViewMode)=\"setViewMode($event)\"\n            (onHover)=\"dayHoverHandler($event)\"\n            (onHoverWeek)=\"weekHoverHandler($event)\"\n            (onSelect)=\"daySelectHandler($event)\">\n          </bs-days-calendar-view>\n        </div>\n        <div *ngIf=\"withTimepicker\" class=\"bs-timepicker-in-datepicker-container\">\n          <timepicker #startTP [disabled]=\"isDatePickerDisabled\"></timepicker>\n          <timepicker #endTP *ngIf=\"isRangePicker\" [disabled]=\"isDatePickerDisabled\"></timepicker>\n        </div>\n      </ng-container>\n\n      <!--months calendar-->\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\n        <bs-month-calendar-view\n          *ngFor=\"let calendar of monthsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"monthHoverHandler($event)\"\n          (onSelect)=\"monthSelectHandler($event)\">\n        </bs-month-calendar-view>\n      </div>\n\n      <!--years calendar-->\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\n        <bs-years-calendar-view\n          *ngFor=\"let calendar of yearsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"yearHoverHandler($event)\"\n          (onSelect)=\"yearSelectHandler($event)\">\n        </bs-years-calendar-view>\n      </div>\n    </div>\n\n    <!--applycancel buttons-->\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\n    </div>\n\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"showTodayBtn || showClearBtn\">\n      <div class=\"btn-today-wrapper\"\n           [class.today-left]=\"todayPos === 'left'\"\n           [class.today-right]=\"todayPos === 'right'\"\n           [class.today-center]=\"todayPos === 'center'\"\n           *ngIf=\"showTodayBtn\">\n        <button class=\"btn btn-success\" (click)=\"setToday()\">{{todayBtnLbl}}</button>\n      </div>\n\n        <div class=\"btn-clear-wrapper\"\n        [class.clear-left]=\"clearPos === 'left'\"\n        [class.clear-right]=\"clearPos === 'right'\"\n        [class.clear-center]=\"clearPos === 'center'\"\n        *ngIf=\"showClearBtn\">\n          <button class=\"btn btn-success\" (click)=\"clearDate()\">{{clearBtnLbl}}</button>\n        </div>\n    </div>\n\n  </div>\n\n  <!--custom dates or date ranges picker-->\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges && customRanges.length > 0\">\n    <bs-custom-date-view\n      [selectedRange]=\"chosenRange\"\n      [ranges]=\"customRanges\"\n      [customRangeLabel]=\"customRangeBtnLbl\"\n      (onSelect)=\"setRangeOnCalendar($event)\">\n    </bs-custom-date-view>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i7.TimepickerComponent, selector: "timepicker", inputs: ["hourStep", "minuteStep", "secondsStep", "readonlyInput", "disabled", "mousewheel", "arrowkeys", "showSpinners", "showMeridian", "showMinutes", "showSeconds", "meridians", "min", "max", "hoursPlaceholder", "minutesPlaceholder", "secondsPlaceholder"], outputs: ["isValid", "meridianChange"] }, { kind: "component", type: i8.BsCustomDatesViewComponent, selector: "bs-custom-date-view", inputs: ["ranges", "selectedRange", "customRangeLabel"], outputs: ["onSelect"] }, { kind: "component", type: i9.BsDaysCalendarViewComponent, selector: "bs-days-calendar-view", inputs: ["calendar", "options", "isDisabled"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover", "onHoverWeek"] }, { kind: "component", type: i10.BsMonthCalendarViewComponent, selector: "bs-month-calendar-view", inputs: ["calendar"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover"] }, { kind: "component", type: i11.BsYearsCalendarViewComponent, selector: "bs-years-calendar-view", inputs: ["calendar"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }], animations: [datepickerAnimation] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: BsDatepickerInlineContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bs-datepicker-inline-container', providers: [BsDatepickerStore, BsDatepickerEffects], host: {
                        '(click)': '_stopPropagation($event)'
                    }, animations: [datepickerAnimation], template: "<!-- days calendar view mode -->\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\n  <div class=\"bs-datepicker-container\"\n    [@datepickerAnimation]=\"animationState\"\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\n    <!--calendars-->\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\n      <!--days calendar-->\n      <ng-container *ngSwitchCase=\"'day'\">\n        <div class=\"bs-media-container\">\n          <bs-days-calendar-view\n            *ngFor=\"let calendar of daysCalendar$ | async\"\n            [class.bs-datepicker-multiple]=\"multipleCalendars\"\n            [calendar]=\"calendar\"\n            [isDisabled]=\"isDatePickerDisabled\"\n            [options]=\"options$ | async\"\n            (onNavigate)=\"navigateTo($event)\"\n            (onViewMode)=\"setViewMode($event)\"\n            (onHover)=\"dayHoverHandler($event)\"\n            (onHoverWeek)=\"weekHoverHandler($event)\"\n            (onSelect)=\"daySelectHandler($event)\">\n          </bs-days-calendar-view>\n        </div>\n        <div *ngIf=\"withTimepicker\" class=\"bs-timepicker-in-datepicker-container\">\n          <timepicker #startTP [disabled]=\"isDatePickerDisabled\"></timepicker>\n          <timepicker #endTP *ngIf=\"isRangePicker\" [disabled]=\"isDatePickerDisabled\"></timepicker>\n        </div>\n      </ng-container>\n\n      <!--months calendar-->\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\n        <bs-month-calendar-view\n          *ngFor=\"let calendar of monthsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"monthHoverHandler($event)\"\n          (onSelect)=\"monthSelectHandler($event)\">\n        </bs-month-calendar-view>\n      </div>\n\n      <!--years calendar-->\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\n        <bs-years-calendar-view\n          *ngFor=\"let calendar of yearsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"yearHoverHandler($event)\"\n          (onSelect)=\"yearSelectHandler($event)\">\n        </bs-years-calendar-view>\n      </div>\n    </div>\n\n    <!--applycancel buttons-->\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\n    </div>\n\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"showTodayBtn || showClearBtn\">\n      <div class=\"btn-today-wrapper\"\n           [class.today-left]=\"todayPos === 'left'\"\n           [class.today-right]=\"todayPos === 'right'\"\n           [class.today-center]=\"todayPos === 'center'\"\n           *ngIf=\"showTodayBtn\">\n        <button class=\"btn btn-success\" (click)=\"setToday()\">{{todayBtnLbl}}</button>\n      </div>\n\n        <div class=\"btn-clear-wrapper\"\n        [class.clear-left]=\"clearPos === 'left'\"\n        [class.clear-right]=\"clearPos === 'right'\"\n        [class.clear-center]=\"clearPos === 'center'\"\n        *ngIf=\"showClearBtn\">\n          <button class=\"btn btn-success\" (click)=\"clearDate()\">{{clearBtnLbl}}</button>\n        </div>\n    </div>\n\n  </div>\n\n  <!--custom dates or date ranges picker-->\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges && customRanges.length > 0\">\n    <bs-custom-date-view\n      [selectedRange]=\"chosenRange\"\n      [ranges]=\"customRanges\"\n      [customRangeLabel]=\"customRangeBtnLbl\"\n      (onSelect)=\"setRangeOnCalendar($event)\">\n    </bs-custom-date-view>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.BsDatepickerConfig }, { type: i2.BsDatepickerStore }, { type: i0.ElementRef }, { type: i3.BsDatepickerActions }, { type: i4.BsDatepickerEffects }, { type: i5.PositioningService }]; }, propDecorators: { disabledValue: [{
                type: HostBinding,
                args: ['attr.disabled']
            }], readonlyValue: [{
                type: HostBinding,
                args: ['attr.readonly']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci1pbmxpbmUtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL3RoZW1lcy9icy9icy1kYXRlcGlja2VyLWlubGluZS1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvdGhlbWVzL2JzL2JzLWRhdGVwaWNrZXItdmlldy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBcUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXJGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7Ozs7Ozs7O0FBV2xFLE1BQU0sT0FBTyxvQ0FBcUMsU0FBUSw4QkFBOEI7SUFVdEYsWUFDRSxTQUFvQixFQUNwQixPQUEyQixFQUMzQixNQUF5QixFQUN6QixRQUFvQixFQUNwQixRQUE2QixFQUM3QixRQUE2QixFQUM3QixtQkFBdUM7UUFFdkMsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFckYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0RSxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFwQkQsSUFBbUMsYUFBYTtRQUM5QyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDL0MsQ0FBQztJQUVELElBQW1DLGFBQWE7UUFDOUMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQy9DLENBQUM7O2lJQVRVLG9DQUFvQztxSEFBcEMsb0NBQW9DLHFOQVBwQyxDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLGlEQ2JyRCw0M0hBNEZBLDhyREQxRWMsQ0FBQyxtQkFBbUIsQ0FBQzsyRkFFdEIsb0NBQW9DO2tCQVRoRCxTQUFTOytCQUNFLGdDQUFnQyxhQUMvQixDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLFFBRTdDO3dCQUNKLFNBQVMsRUFBRSwwQkFBMEI7cUJBQ3RDLGNBQ1csQ0FBQyxtQkFBbUIsQ0FBQzsrUkFLRSxhQUFhO3NCQUEvQyxXQUFXO3VCQUFFLGVBQWU7Z0JBSU0sYUFBYTtzQkFBL0MsV0FBVzt1QkFBRSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vYnMtZGF0ZXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQnNEYXRlcGlja2VyQWN0aW9ucyB9IGZyb20gJy4uLy4uL3JlZHVjZXIvYnMtZGF0ZXBpY2tlci5hY3Rpb25zJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckNvbmZpZyB9IGZyb20gJy4uLy4uL2JzLWRhdGVwaWNrZXIuY29uZmlnJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckVmZmVjdHMgfSBmcm9tICcuLi8uLi9yZWR1Y2VyL2JzLWRhdGVwaWNrZXIuZWZmZWN0cyc7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJTdG9yZSB9IGZyb20gJy4uLy4uL3JlZHVjZXIvYnMtZGF0ZXBpY2tlci5zdG9yZSc7XG5cbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgZGF0ZXBpY2tlckFuaW1hdGlvbiB9IGZyb20gJy4uLy4uL2RhdGVwaWNrZXItYW5pbWF0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JzLWRhdGVwaWNrZXItaW5saW5lLWNvbnRhaW5lcicsXG4gIHByb3ZpZGVyczogW0JzRGF0ZXBpY2tlclN0b3JlLCBCc0RhdGVwaWNrZXJFZmZlY3RzXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2JzLWRhdGVwaWNrZXItdmlldy5odG1sJyxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ19zdG9wUHJvcGFnYXRpb24oJGV2ZW50KSdcbiAgfSxcbiAgYW5pbWF0aW9uczogW2RhdGVwaWNrZXJBbmltYXRpb25dXG59KVxuZXhwb3J0IGNsYXNzIEJzRGF0ZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCBleHRlbmRzIEJzRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASG9zdEJpbmRpbmcgKCdhdHRyLmRpc2FibGVkJykgZ2V0IGRpc2FibGVkVmFsdWUgKCkge1xuICAgIHJldHVybiB0aGlzLmlzRGF0ZVBpY2tlckRpc2FibGVkID8gJycgOiBudWxsO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nICgnYXR0ci5yZWFkb25seScpIGdldCByZWFkb25seVZhbHVlICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0RhdGVQaWNrZXJEaXNhYmxlZCA/ICcnIDogbnVsbDtcbiAgfVxuICBjb25zdHJ1Y3RvcihcbiAgICBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBfY29uZmlnOiBCc0RhdGVwaWNrZXJDb25maWcsXG4gICAgX3N0b3JlOiBCc0RhdGVwaWNrZXJTdG9yZSxcbiAgICBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBfYWN0aW9uczogQnNEYXRlcGlja2VyQWN0aW9ucyxcbiAgICBfZWZmZWN0czogQnNEYXRlcGlja2VyRWZmZWN0cyxcbiAgICBfcG9zaXRpb25pbmdTZXJ2aWNlOiBQb3NpdGlvbmluZ1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoX3JlbmRlcmVyLCBfY29uZmlnLCBfc3RvcmUsIF9lbGVtZW50LCBfYWN0aW9ucywgX2VmZmVjdHMsIF9wb3NpdGlvbmluZ1NlcnZpY2UpO1xuXG4gICAgX3JlbmRlcmVyLnNldFN0eWxlKF9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgIF9yZW5kZXJlci5zZXRTdHlsZShfZWxlbWVudC5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAnc3RhdGljJyk7XG4gIH1cbn1cbiIsIjwhLS0gZGF5cyBjYWxlbmRhciB2aWV3IG1vZGUgLS0+XG48ZGl2IGNsYXNzPVwiYnMtZGF0ZXBpY2tlclwiIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzXCIgKm5nSWY9XCJ2aWV3TW9kZSB8IGFzeW5jXCI+XG4gIDxkaXYgY2xhc3M9XCJicy1kYXRlcGlja2VyLWNvbnRhaW5lclwiXG4gICAgW0BkYXRlcGlja2VyQW5pbWF0aW9uXT1cImFuaW1hdGlvblN0YXRlXCJcbiAgICAoQGRhdGVwaWNrZXJBbmltYXRpb24uZG9uZSk9XCJwb3NpdGlvblNlcnZpY2VFbmFibGUoKVwiPlxuICAgIDwhLS1jYWxlbmRhcnMtLT5cbiAgICA8ZGl2IGNsYXNzPVwiYnMtY2FsZW5kYXItY29udGFpbmVyXCIgW25nU3dpdGNoXT1cInZpZXdNb2RlIHwgYXN5bmNcIiByb2xlPVwiYXBwbGljYXRpb25cIj5cbiAgICAgIDwhLS1kYXlzIGNhbGVuZGFyLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInZGF5J1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnMtbWVkaWEtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGJzLWRheXMtY2FsZW5kYXItdmlld1xuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNhbGVuZGFyIG9mIGRheXNDYWxlbmRhciQgfCBhc3luY1wiXG4gICAgICAgICAgICBbY2xhc3MuYnMtZGF0ZXBpY2tlci1tdWx0aXBsZV09XCJtdWx0aXBsZUNhbGVuZGFyc1wiXG4gICAgICAgICAgICBbY2FsZW5kYXJdPVwiY2FsZW5kYXJcIlxuICAgICAgICAgICAgW2lzRGlzYWJsZWRdPVwiaXNEYXRlUGlja2VyRGlzYWJsZWRcIlxuICAgICAgICAgICAgW29wdGlvbnNdPVwib3B0aW9ucyQgfCBhc3luY1wiXG4gICAgICAgICAgICAob25OYXZpZ2F0ZSk9XCJuYXZpZ2F0ZVRvKCRldmVudClcIlxuICAgICAgICAgICAgKG9uVmlld01vZGUpPVwic2V0Vmlld01vZGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAob25Ib3Zlcik9XCJkYXlIb3ZlckhhbmRsZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAob25Ib3ZlcldlZWspPVwid2Vla0hvdmVySGFuZGxlcigkZXZlbnQpXCJcbiAgICAgICAgICAgIChvblNlbGVjdCk9XCJkYXlTZWxlY3RIYW5kbGVyKCRldmVudClcIj5cbiAgICAgICAgICA8L2JzLWRheXMtY2FsZW5kYXItdmlldz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ3aXRoVGltZXBpY2tlclwiIGNsYXNzPVwiYnMtdGltZXBpY2tlci1pbi1kYXRlcGlja2VyLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDx0aW1lcGlja2VyICNzdGFydFRQIFtkaXNhYmxlZF09XCJpc0RhdGVQaWNrZXJEaXNhYmxlZFwiPjwvdGltZXBpY2tlcj5cbiAgICAgICAgICA8dGltZXBpY2tlciAjZW5kVFAgKm5nSWY9XCJpc1JhbmdlUGlja2VyXCIgW2Rpc2FibGVkXT1cImlzRGF0ZVBpY2tlckRpc2FibGVkXCI+PC90aW1lcGlja2VyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tbW9udGhzIGNhbGVuZGFyLS0+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInbW9udGgnXCIgY2xhc3M9XCJicy1tZWRpYS1jb250YWluZXJcIj5cbiAgICAgICAgPGJzLW1vbnRoLWNhbGVuZGFyLXZpZXdcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY2FsZW5kYXIgb2YgbW9udGhzQ2FsZW5kYXIgfCBhc3luY1wiXG4gICAgICAgICAgW2NsYXNzLmJzLWRhdGVwaWNrZXItbXVsdGlwbGVdPVwibXVsdGlwbGVDYWxlbmRhcnNcIlxuICAgICAgICAgIFtjYWxlbmRhcl09XCJjYWxlbmRhclwiXG4gICAgICAgICAgKG9uTmF2aWdhdGUpPVwibmF2aWdhdGVUbygkZXZlbnQpXCJcbiAgICAgICAgICAob25WaWV3TW9kZSk9XCJzZXRWaWV3TW9kZSgkZXZlbnQpXCJcbiAgICAgICAgICAob25Ib3Zlcik9XCJtb250aEhvdmVySGFuZGxlcigkZXZlbnQpXCJcbiAgICAgICAgICAob25TZWxlY3QpPVwibW9udGhTZWxlY3RIYW5kbGVyKCRldmVudClcIj5cbiAgICAgICAgPC9icy1tb250aC1jYWxlbmRhci12aWV3PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS15ZWFycyBjYWxlbmRhci0tPlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3llYXInXCIgY2xhc3M9XCJicy1tZWRpYS1jb250YWluZXJcIj5cbiAgICAgICAgPGJzLXllYXJzLWNhbGVuZGFyLXZpZXdcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY2FsZW5kYXIgb2YgeWVhcnNDYWxlbmRhciB8IGFzeW5jXCJcbiAgICAgICAgICBbY2xhc3MuYnMtZGF0ZXBpY2tlci1tdWx0aXBsZV09XCJtdWx0aXBsZUNhbGVuZGFyc1wiXG4gICAgICAgICAgW2NhbGVuZGFyXT1cImNhbGVuZGFyXCJcbiAgICAgICAgICAob25OYXZpZ2F0ZSk9XCJuYXZpZ2F0ZVRvKCRldmVudClcIlxuICAgICAgICAgIChvblZpZXdNb2RlKT1cInNldFZpZXdNb2RlKCRldmVudClcIlxuICAgICAgICAgIChvbkhvdmVyKT1cInllYXJIb3ZlckhhbmRsZXIoJGV2ZW50KVwiXG4gICAgICAgICAgKG9uU2VsZWN0KT1cInllYXJTZWxlY3RIYW5kbGVyKCRldmVudClcIj5cbiAgICAgICAgPC9icy15ZWFycy1jYWxlbmRhci12aWV3PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tYXBwbHljYW5jZWwgYnV0dG9ucy0tPlxuICAgIDxkaXYgY2xhc3M9XCJicy1kYXRlcGlja2VyLWJ1dHRvbnNcIiAqbmdJZj1cImZhbHNlXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgdHlwZT1cImJ1dHRvblwiPkFwcGx5PC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImJzLWRhdGVwaWNrZXItYnV0dG9uc1wiICpuZ0lmPVwic2hvd1RvZGF5QnRuIHx8IHNob3dDbGVhckJ0blwiPlxuICAgICAgPGRpdiBjbGFzcz1cImJ0bi10b2RheS13cmFwcGVyXCJcbiAgICAgICAgICAgW2NsYXNzLnRvZGF5LWxlZnRdPVwidG9kYXlQb3MgPT09ICdsZWZ0J1wiXG4gICAgICAgICAgIFtjbGFzcy50b2RheS1yaWdodF09XCJ0b2RheVBvcyA9PT0gJ3JpZ2h0J1wiXG4gICAgICAgICAgIFtjbGFzcy50b2RheS1jZW50ZXJdPVwidG9kYXlQb3MgPT09ICdjZW50ZXInXCJcbiAgICAgICAgICAgKm5nSWY9XCJzaG93VG9kYXlCdG5cIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIChjbGljayk9XCJzZXRUb2RheSgpXCI+e3t0b2RheUJ0bkxibH19PC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWNsZWFyLXdyYXBwZXJcIlxuICAgICAgICBbY2xhc3MuY2xlYXItbGVmdF09XCJjbGVhclBvcyA9PT0gJ2xlZnQnXCJcbiAgICAgICAgW2NsYXNzLmNsZWFyLXJpZ2h0XT1cImNsZWFyUG9zID09PSAncmlnaHQnXCJcbiAgICAgICAgW2NsYXNzLmNsZWFyLWNlbnRlcl09XCJjbGVhclBvcyA9PT0gJ2NlbnRlcidcIlxuICAgICAgICAqbmdJZj1cInNob3dDbGVhckJ0blwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiAoY2xpY2spPVwiY2xlYXJEYXRlKClcIj57e2NsZWFyQnRuTGJsfX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbiAgPCEtLWN1c3RvbSBkYXRlcyBvciBkYXRlIHJhbmdlcyBwaWNrZXItLT5cbiAgPGRpdiBjbGFzcz1cImJzLWRhdGVwaWNrZXItY3VzdG9tLXJhbmdlXCIgKm5nSWY9XCJjdXN0b21SYW5nZXMgJiYgY3VzdG9tUmFuZ2VzLmxlbmd0aCA+IDBcIj5cbiAgICA8YnMtY3VzdG9tLWRhdGUtdmlld1xuICAgICAgW3NlbGVjdGVkUmFuZ2VdPVwiY2hvc2VuUmFuZ2VcIlxuICAgICAgW3Jhbmdlc109XCJjdXN0b21SYW5nZXNcIlxuICAgICAgW2N1c3RvbVJhbmdlTGFiZWxdPVwiY3VzdG9tUmFuZ2VCdG5MYmxcIlxuICAgICAgKG9uU2VsZWN0KT1cInNldFJhbmdlT25DYWxlbmRhcigkZXZlbnQpXCI+XG4gICAgPC9icy1jdXN0b20tZGF0ZS12aWV3PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19