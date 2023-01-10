import { ElementRef, Component, Renderer2, HostBinding } from '@angular/core';
import { BsDaterangepickerContainerComponent } from './bs-daterangepicker-container.component';
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
export class BsDaterangepickerInlineContainerComponent extends BsDaterangepickerContainerComponent {
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
BsDaterangepickerInlineContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: BsDaterangepickerInlineContainerComponent, deps: [{ token: i0.Renderer2 }, { token: i1.BsDatepickerConfig }, { token: i2.BsDatepickerStore }, { token: i0.ElementRef }, { token: i3.BsDatepickerActions }, { token: i4.BsDatepickerEffects }, { token: i5.PositioningService }], target: i0.ɵɵFactoryTarget.Component });
BsDaterangepickerInlineContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: BsDaterangepickerInlineContainerComponent, selector: "bs-daterangepicker-inline-container", host: { listeners: { "click": "_stopPropagation($event)" }, properties: { "attr.disabled": "this.disabledValue", "attr.readonly": "this.readonlyValue" } }, providers: [BsDatepickerStore, BsDatepickerEffects], usesInheritance: true, ngImport: i0, template: "<!-- days calendar view mode -->\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\n  <div class=\"bs-datepicker-container\"\n    [@datepickerAnimation]=\"animationState\"\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\n    <!--calendars-->\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\n      <!--days calendar-->\n      <ng-container *ngSwitchCase=\"'day'\">\n        <div class=\"bs-media-container\">\n          <bs-days-calendar-view\n            *ngFor=\"let calendar of daysCalendar$ | async\"\n            [class.bs-datepicker-multiple]=\"multipleCalendars\"\n            [calendar]=\"calendar\"\n            [isDisabled]=\"isDatePickerDisabled\"\n            [options]=\"options$ | async\"\n            (onNavigate)=\"navigateTo($event)\"\n            (onViewMode)=\"setViewMode($event)\"\n            (onHover)=\"dayHoverHandler($event)\"\n            (onHoverWeek)=\"weekHoverHandler($event)\"\n            (onSelect)=\"daySelectHandler($event)\">\n          </bs-days-calendar-view>\n        </div>\n        <div *ngIf=\"withTimepicker\" class=\"bs-timepicker-in-datepicker-container\">\n          <timepicker #startTP [disabled]=\"isDatePickerDisabled\"></timepicker>\n          <timepicker #endTP *ngIf=\"isRangePicker\" [disabled]=\"isDatePickerDisabled\"></timepicker>\n        </div>\n      </ng-container>\n\n      <!--months calendar-->\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\n        <bs-month-calendar-view\n          *ngFor=\"let calendar of monthsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"monthHoverHandler($event)\"\n          (onSelect)=\"monthSelectHandler($event)\">\n        </bs-month-calendar-view>\n      </div>\n\n      <!--years calendar-->\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\n        <bs-years-calendar-view\n          *ngFor=\"let calendar of yearsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"yearHoverHandler($event)\"\n          (onSelect)=\"yearSelectHandler($event)\">\n        </bs-years-calendar-view>\n      </div>\n    </div>\n\n    <!--applycancel buttons-->\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\n    </div>\n\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"showTodayBtn || showClearBtn\">\n      <div class=\"btn-today-wrapper\"\n           [class.today-left]=\"todayPos === 'left'\"\n           [class.today-right]=\"todayPos === 'right'\"\n           [class.today-center]=\"todayPos === 'center'\"\n           *ngIf=\"showTodayBtn\">\n        <button class=\"btn btn-success\" (click)=\"setToday()\">{{todayBtnLbl}}</button>\n      </div>\n\n        <div class=\"btn-clear-wrapper\"\n        [class.clear-left]=\"clearPos === 'left'\"\n        [class.clear-right]=\"clearPos === 'right'\"\n        [class.clear-center]=\"clearPos === 'center'\"\n        *ngIf=\"showClearBtn\">\n          <button class=\"btn btn-success\" (click)=\"clearDate()\">{{clearBtnLbl}}</button>\n        </div>\n    </div>\n\n  </div>\n\n  <!--custom dates or date ranges picker-->\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges && customRanges.length > 0\">\n    <bs-custom-date-view\n      [selectedRange]=\"chosenRange\"\n      [ranges]=\"customRanges\"\n      [customRangeLabel]=\"customRangeBtnLbl\"\n      (onSelect)=\"setRangeOnCalendar($event)\">\n    </bs-custom-date-view>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i7.TimepickerComponent, selector: "timepicker", inputs: ["hourStep", "minuteStep", "secondsStep", "readonlyInput", "disabled", "mousewheel", "arrowkeys", "showSpinners", "showMeridian", "showMinutes", "showSeconds", "meridians", "min", "max", "hoursPlaceholder", "minutesPlaceholder", "secondsPlaceholder"], outputs: ["isValid", "meridianChange"] }, { kind: "component", type: i8.BsCustomDatesViewComponent, selector: "bs-custom-date-view", inputs: ["ranges", "selectedRange", "customRangeLabel"], outputs: ["onSelect"] }, { kind: "component", type: i9.BsDaysCalendarViewComponent, selector: "bs-days-calendar-view", inputs: ["calendar", "options", "isDisabled"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover", "onHoverWeek"] }, { kind: "component", type: i10.BsMonthCalendarViewComponent, selector: "bs-month-calendar-view", inputs: ["calendar"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover"] }, { kind: "component", type: i11.BsYearsCalendarViewComponent, selector: "bs-years-calendar-view", inputs: ["calendar"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }], animations: [datepickerAnimation] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: BsDaterangepickerInlineContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bs-daterangepicker-inline-container', providers: [BsDatepickerStore, BsDatepickerEffects], host: {
                        '(click)': '_stopPropagation($event)'
                    }, animations: [datepickerAnimation], template: "<!-- days calendar view mode -->\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\n  <div class=\"bs-datepicker-container\"\n    [@datepickerAnimation]=\"animationState\"\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\n    <!--calendars-->\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\n      <!--days calendar-->\n      <ng-container *ngSwitchCase=\"'day'\">\n        <div class=\"bs-media-container\">\n          <bs-days-calendar-view\n            *ngFor=\"let calendar of daysCalendar$ | async\"\n            [class.bs-datepicker-multiple]=\"multipleCalendars\"\n            [calendar]=\"calendar\"\n            [isDisabled]=\"isDatePickerDisabled\"\n            [options]=\"options$ | async\"\n            (onNavigate)=\"navigateTo($event)\"\n            (onViewMode)=\"setViewMode($event)\"\n            (onHover)=\"dayHoverHandler($event)\"\n            (onHoverWeek)=\"weekHoverHandler($event)\"\n            (onSelect)=\"daySelectHandler($event)\">\n          </bs-days-calendar-view>\n        </div>\n        <div *ngIf=\"withTimepicker\" class=\"bs-timepicker-in-datepicker-container\">\n          <timepicker #startTP [disabled]=\"isDatePickerDisabled\"></timepicker>\n          <timepicker #endTP *ngIf=\"isRangePicker\" [disabled]=\"isDatePickerDisabled\"></timepicker>\n        </div>\n      </ng-container>\n\n      <!--months calendar-->\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\n        <bs-month-calendar-view\n          *ngFor=\"let calendar of monthsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"monthHoverHandler($event)\"\n          (onSelect)=\"monthSelectHandler($event)\">\n        </bs-month-calendar-view>\n      </div>\n\n      <!--years calendar-->\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\n        <bs-years-calendar-view\n          *ngFor=\"let calendar of yearsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"yearHoverHandler($event)\"\n          (onSelect)=\"yearSelectHandler($event)\">\n        </bs-years-calendar-view>\n      </div>\n    </div>\n\n    <!--applycancel buttons-->\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\n    </div>\n\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"showTodayBtn || showClearBtn\">\n      <div class=\"btn-today-wrapper\"\n           [class.today-left]=\"todayPos === 'left'\"\n           [class.today-right]=\"todayPos === 'right'\"\n           [class.today-center]=\"todayPos === 'center'\"\n           *ngIf=\"showTodayBtn\">\n        <button class=\"btn btn-success\" (click)=\"setToday()\">{{todayBtnLbl}}</button>\n      </div>\n\n        <div class=\"btn-clear-wrapper\"\n        [class.clear-left]=\"clearPos === 'left'\"\n        [class.clear-right]=\"clearPos === 'right'\"\n        [class.clear-center]=\"clearPos === 'center'\"\n        *ngIf=\"showClearBtn\">\n          <button class=\"btn btn-success\" (click)=\"clearDate()\">{{clearBtnLbl}}</button>\n        </div>\n    </div>\n\n  </div>\n\n  <!--custom dates or date ranges picker-->\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges && customRanges.length > 0\">\n    <bs-custom-date-view\n      [selectedRange]=\"chosenRange\"\n      [ranges]=\"customRanges\"\n      [customRangeLabel]=\"customRangeBtnLbl\"\n      (onSelect)=\"setRangeOnCalendar($event)\">\n    </bs-custom-date-view>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.BsDatepickerConfig }, { type: i2.BsDatepickerStore }, { type: i0.ElementRef }, { type: i3.BsDatepickerActions }, { type: i4.BsDatepickerEffects }, { type: i5.PositioningService }]; }, propDecorators: { disabledValue: [{
                type: HostBinding,
                args: ['attr.disabled']
            }], readonlyValue: [{
                type: HostBinding,
                args: ['attr.readonly']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXJhbmdlcGlja2VyLWlubGluZS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvdGhlbWVzL2JzL2JzLWRhdGVyYW5nZXBpY2tlci1pbmxpbmUtY29udGFpbmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL3RoZW1lcy9icy9icy1kYXRlcGlja2VyLXZpZXcuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUUvRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUV0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQVdsRSxNQUFNLE9BQU8seUNBQTBDLFNBQVEsbUNBQW1DO0lBVWhHLFlBQ0UsU0FBb0IsRUFDcEIsT0FBMkIsRUFDM0IsTUFBeUIsRUFDekIsUUFBb0IsRUFDcEIsUUFBNkIsRUFDN0IsUUFBNkIsRUFDN0IsbUJBQXVDO1FBRXZDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRXJGLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDdEUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBckJELElBQW1DLGFBQWE7UUFDOUMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFtQyxhQUFhO1FBQzlDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMvQyxDQUFDOztzSUFSVSx5Q0FBeUM7MEhBQXpDLHlDQUF5QywwTkFQekMsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxpRENickQsNDNIQTRGQSw4ckREMUVjLENBQUMsbUJBQW1CLENBQUM7MkZBRXRCLHlDQUF5QztrQkFUckQsU0FBUzsrQkFDRSxxQ0FBcUMsYUFDcEMsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxRQUU3Qzt3QkFDSixTQUFTLEVBQUUsMEJBQTBCO3FCQUN0QyxjQUNXLENBQUMsbUJBQW1CLENBQUM7K1JBSUUsYUFBYTtzQkFBL0MsV0FBVzt1QkFBRSxlQUFlO2dCQUlNLGFBQWE7c0JBQS9DLFdBQVc7dUJBQUUsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T25Jbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIENvbXBvbmVudCwgUmVuZGVyZXIyLCBIb3N0QmluZGluZ30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCc0RhdGVyYW5nZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vYnMtZGF0ZXJhbmdlcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJBY3Rpb25zIH0gZnJvbSAnLi4vLi4vcmVkdWNlci9icy1kYXRlcGlja2VyLmFjdGlvbnMnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyQ29uZmlnIH0gZnJvbSAnLi4vLi4vYnMtZGF0ZXBpY2tlci5jb25maWcnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyRWZmZWN0cyB9IGZyb20gJy4uLy4uL3JlZHVjZXIvYnMtZGF0ZXBpY2tlci5lZmZlY3RzJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlclN0b3JlIH0gZnJvbSAnLi4vLi4vcmVkdWNlci9icy1kYXRlcGlja2VyLnN0b3JlJztcblxuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBkYXRlcGlja2VyQW5pbWF0aW9uIH0gZnJvbSAnLi4vLi4vZGF0ZXBpY2tlci1hbmltYXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnMtZGF0ZXJhbmdlcGlja2VyLWlubGluZS1jb250YWluZXInLFxuICBwcm92aWRlcnM6IFtCc0RhdGVwaWNrZXJTdG9yZSwgQnNEYXRlcGlja2VyRWZmZWN0c10sXG4gIHRlbXBsYXRlVXJsOiAnLi9icy1kYXRlcGlja2VyLXZpZXcuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnKGNsaWNrKSc6ICdfc3RvcFByb3BhZ2F0aW9uKCRldmVudCknXG4gIH0sXG4gIGFuaW1hdGlvbnM6IFtkYXRlcGlja2VyQW5pbWF0aW9uXVxufSlcbmV4cG9ydCBjbGFzcyBCc0RhdGVyYW5nZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCBleHRlbmRzIEJzRGF0ZXJhbmdlcGlja2VyQ29udGFpbmVyQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASG9zdEJpbmRpbmcgKCdhdHRyLmRpc2FibGVkJykgZ2V0IGRpc2FibGVkVmFsdWUgKCkge1xuICAgIHJldHVybiB0aGlzLmlzRGF0ZVBpY2tlckRpc2FibGVkID8gJycgOiBudWxsO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nICgnYXR0ci5yZWFkb25seScpIGdldCByZWFkb25seVZhbHVlICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0RhdGVQaWNrZXJEaXNhYmxlZCA/ICcnIDogbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIF9jb25maWc6IEJzRGF0ZXBpY2tlckNvbmZpZyxcbiAgICBfc3RvcmU6IEJzRGF0ZXBpY2tlclN0b3JlLFxuICAgIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIF9hY3Rpb25zOiBCc0RhdGVwaWNrZXJBY3Rpb25zLFxuICAgIF9lZmZlY3RzOiBCc0RhdGVwaWNrZXJFZmZlY3RzLFxuICAgIF9wb3NpdGlvbmluZ1NlcnZpY2U6IFBvc2l0aW9uaW5nU2VydmljZVxuICApIHtcbiAgICBzdXBlcihfcmVuZGVyZXIsIF9jb25maWcsIF9zdG9yZSwgX2VsZW1lbnQsIF9hY3Rpb25zLCBfZWZmZWN0cywgX3Bvc2l0aW9uaW5nU2VydmljZSk7XG5cbiAgICBfcmVuZGVyZXIuc2V0U3R5bGUoX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gICAgX3JlbmRlcmVyLnNldFN0eWxlKF9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsICdzdGF0aWMnKTtcbiAgfVxufVxuIiwiPCEtLSBkYXlzIGNhbGVuZGFyIHZpZXcgbW9kZSAtLT5cbjxkaXYgY2xhc3M9XCJicy1kYXRlcGlja2VyXCIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3NcIiAqbmdJZj1cInZpZXdNb2RlIHwgYXN5bmNcIj5cbiAgPGRpdiBjbGFzcz1cImJzLWRhdGVwaWNrZXItY29udGFpbmVyXCJcbiAgICBbQGRhdGVwaWNrZXJBbmltYXRpb25dPVwiYW5pbWF0aW9uU3RhdGVcIlxuICAgIChAZGF0ZXBpY2tlckFuaW1hdGlvbi5kb25lKT1cInBvc2l0aW9uU2VydmljZUVuYWJsZSgpXCI+XG4gICAgPCEtLWNhbGVuZGFycy0tPlxuICAgIDxkaXYgY2xhc3M9XCJicy1jYWxlbmRhci1jb250YWluZXJcIiBbbmdTd2l0Y2hdPVwidmlld01vZGUgfCBhc3luY1wiIHJvbGU9XCJhcHBsaWNhdGlvblwiPlxuICAgICAgPCEtLWRheXMgY2FsZW5kYXItLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXknXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJicy1tZWRpYS1jb250YWluZXJcIj5cbiAgICAgICAgICA8YnMtZGF5cy1jYWxlbmRhci12aWV3XG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgY2FsZW5kYXIgb2YgZGF5c0NhbGVuZGFyJCB8IGFzeW5jXCJcbiAgICAgICAgICAgIFtjbGFzcy5icy1kYXRlcGlja2VyLW11bHRpcGxlXT1cIm11bHRpcGxlQ2FsZW5kYXJzXCJcbiAgICAgICAgICAgIFtjYWxlbmRhcl09XCJjYWxlbmRhclwiXG4gICAgICAgICAgICBbaXNEaXNhYmxlZF09XCJpc0RhdGVQaWNrZXJEaXNhYmxlZFwiXG4gICAgICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zJCB8IGFzeW5jXCJcbiAgICAgICAgICAgIChvbk5hdmlnYXRlKT1cIm5hdmlnYXRlVG8oJGV2ZW50KVwiXG4gICAgICAgICAgICAob25WaWV3TW9kZSk9XCJzZXRWaWV3TW9kZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChvbkhvdmVyKT1cImRheUhvdmVySGFuZGxlcigkZXZlbnQpXCJcbiAgICAgICAgICAgIChvbkhvdmVyV2Vlayk9XCJ3ZWVrSG92ZXJIYW5kbGVyKCRldmVudClcIlxuICAgICAgICAgICAgKG9uU2VsZWN0KT1cImRheVNlbGVjdEhhbmRsZXIoJGV2ZW50KVwiPlxuICAgICAgICAgIDwvYnMtZGF5cy1jYWxlbmRhci12aWV3PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIndpdGhUaW1lcGlja2VyXCIgY2xhc3M9XCJicy10aW1lcGlja2VyLWluLWRhdGVwaWNrZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgPHRpbWVwaWNrZXIgI3N0YXJ0VFAgW2Rpc2FibGVkXT1cImlzRGF0ZVBpY2tlckRpc2FibGVkXCI+PC90aW1lcGlja2VyPlxuICAgICAgICAgIDx0aW1lcGlja2VyICNlbmRUUCAqbmdJZj1cImlzUmFuZ2VQaWNrZXJcIiBbZGlzYWJsZWRdPVwiaXNEYXRlUGlja2VyRGlzYWJsZWRcIj48L3RpbWVwaWNrZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS1tb250aHMgY2FsZW5kYXItLT5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidtb250aCdcIiBjbGFzcz1cImJzLW1lZGlhLWNvbnRhaW5lclwiPlxuICAgICAgICA8YnMtbW9udGgtY2FsZW5kYXItdmlld1xuICAgICAgICAgICpuZ0Zvcj1cImxldCBjYWxlbmRhciBvZiBtb250aHNDYWxlbmRhciB8IGFzeW5jXCJcbiAgICAgICAgICBbY2xhc3MuYnMtZGF0ZXBpY2tlci1tdWx0aXBsZV09XCJtdWx0aXBsZUNhbGVuZGFyc1wiXG4gICAgICAgICAgW2NhbGVuZGFyXT1cImNhbGVuZGFyXCJcbiAgICAgICAgICAob25OYXZpZ2F0ZSk9XCJuYXZpZ2F0ZVRvKCRldmVudClcIlxuICAgICAgICAgIChvblZpZXdNb2RlKT1cInNldFZpZXdNb2RlKCRldmVudClcIlxuICAgICAgICAgIChvbkhvdmVyKT1cIm1vbnRoSG92ZXJIYW5kbGVyKCRldmVudClcIlxuICAgICAgICAgIChvblNlbGVjdCk9XCJtb250aFNlbGVjdEhhbmRsZXIoJGV2ZW50KVwiPlxuICAgICAgICA8L2JzLW1vbnRoLWNhbGVuZGFyLXZpZXc+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLXllYXJzIGNhbGVuZGFyLS0+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIneWVhcidcIiBjbGFzcz1cImJzLW1lZGlhLWNvbnRhaW5lclwiPlxuICAgICAgICA8YnMteWVhcnMtY2FsZW5kYXItdmlld1xuICAgICAgICAgICpuZ0Zvcj1cImxldCBjYWxlbmRhciBvZiB5ZWFyc0NhbGVuZGFyIHwgYXN5bmNcIlxuICAgICAgICAgIFtjbGFzcy5icy1kYXRlcGlja2VyLW11bHRpcGxlXT1cIm11bHRpcGxlQ2FsZW5kYXJzXCJcbiAgICAgICAgICBbY2FsZW5kYXJdPVwiY2FsZW5kYXJcIlxuICAgICAgICAgIChvbk5hdmlnYXRlKT1cIm5hdmlnYXRlVG8oJGV2ZW50KVwiXG4gICAgICAgICAgKG9uVmlld01vZGUpPVwic2V0Vmlld01vZGUoJGV2ZW50KVwiXG4gICAgICAgICAgKG9uSG92ZXIpPVwieWVhckhvdmVySGFuZGxlcigkZXZlbnQpXCJcbiAgICAgICAgICAob25TZWxlY3QpPVwieWVhclNlbGVjdEhhbmRsZXIoJGV2ZW50KVwiPlxuICAgICAgICA8L2JzLXllYXJzLWNhbGVuZGFyLXZpZXc+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS1hcHBseWNhbmNlbCBidXR0b25zLS0+XG4gICAgPGRpdiBjbGFzcz1cImJzLWRhdGVwaWNrZXItYnV0dG9uc1wiICpuZ0lmPVwiZmFsc2VcIj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiB0eXBlPVwiYnV0dG9uXCI+QXBwbHk8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiYnMtZGF0ZXBpY2tlci1idXR0b25zXCIgKm5nSWY9XCJzaG93VG9kYXlCdG4gfHwgc2hvd0NsZWFyQnRuXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLXRvZGF5LXdyYXBwZXJcIlxuICAgICAgICAgICBbY2xhc3MudG9kYXktbGVmdF09XCJ0b2RheVBvcyA9PT0gJ2xlZnQnXCJcbiAgICAgICAgICAgW2NsYXNzLnRvZGF5LXJpZ2h0XT1cInRvZGF5UG9zID09PSAncmlnaHQnXCJcbiAgICAgICAgICAgW2NsYXNzLnRvZGF5LWNlbnRlcl09XCJ0b2RheVBvcyA9PT0gJ2NlbnRlcidcIlxuICAgICAgICAgICAqbmdJZj1cInNob3dUb2RheUJ0blwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgKGNsaWNrKT1cInNldFRvZGF5KClcIj57e3RvZGF5QnRuTGJsfX08L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tY2xlYXItd3JhcHBlclwiXG4gICAgICAgIFtjbGFzcy5jbGVhci1sZWZ0XT1cImNsZWFyUG9zID09PSAnbGVmdCdcIlxuICAgICAgICBbY2xhc3MuY2xlYXItcmlnaHRdPVwiY2xlYXJQb3MgPT09ICdyaWdodCdcIlxuICAgICAgICBbY2xhc3MuY2xlYXItY2VudGVyXT1cImNsZWFyUG9zID09PSAnY2VudGVyJ1wiXG4gICAgICAgICpuZ0lmPVwic2hvd0NsZWFyQnRuXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIChjbGljayk9XCJjbGVhckRhdGUoKVwiPnt7Y2xlYXJCdG5MYmx9fTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuICA8IS0tY3VzdG9tIGRhdGVzIG9yIGRhdGUgcmFuZ2VzIHBpY2tlci0tPlxuICA8ZGl2IGNsYXNzPVwiYnMtZGF0ZXBpY2tlci1jdXN0b20tcmFuZ2VcIiAqbmdJZj1cImN1c3RvbVJhbmdlcyAmJiBjdXN0b21SYW5nZXMubGVuZ3RoID4gMFwiPlxuICAgIDxicy1jdXN0b20tZGF0ZS12aWV3XG4gICAgICBbc2VsZWN0ZWRSYW5nZV09XCJjaG9zZW5SYW5nZVwiXG4gICAgICBbcmFuZ2VzXT1cImN1c3RvbVJhbmdlc1wiXG4gICAgICBbY3VzdG9tUmFuZ2VMYWJlbF09XCJjdXN0b21SYW5nZUJ0bkxibFwiXG4gICAgICAob25TZWxlY3QpPVwic2V0UmFuZ2VPbkNhbGVuZGFyKCRldmVudClcIj5cbiAgICA8L2JzLWN1c3RvbS1kYXRlLXZpZXc+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=