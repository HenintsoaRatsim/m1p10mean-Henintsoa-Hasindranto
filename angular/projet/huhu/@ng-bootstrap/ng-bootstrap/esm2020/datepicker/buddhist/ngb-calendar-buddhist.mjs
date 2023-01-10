import { Injectable } from '@angular/core';
import { isInteger } from '../../util/util';
import { NgbCalendarGregorian } from '../ngb-calendar';
import { fromGregorian, toGregorian } from './buddhist';
import * as i0 from "@angular/core";
/**
 * @since 9.1.0
 */
export class NgbCalendarBuddhist extends NgbCalendarGregorian {
    getToday() {
        return fromGregorian(new Date());
    }
    getNext(date, period = 'd', number = 1) {
        let jsDate = toGregorian(date);
        let checkMonth = true;
        let expectedMonth = jsDate.getMonth();
        switch (period) {
            case 'y':
                jsDate.setFullYear(jsDate.getFullYear() + number);
                break;
            case 'm':
                expectedMonth += number;
                jsDate.setMonth(expectedMonth);
                expectedMonth = expectedMonth % 12;
                if (expectedMonth < 0) {
                    expectedMonth = expectedMonth + 12;
                }
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                checkMonth = false;
                break;
            default:
                return date;
        }
        if (checkMonth && jsDate.getMonth() !== expectedMonth) {
            // this means the destination month has less days than the initial month
            // let's go back to the end of the previous month:
            jsDate.setDate(0);
        }
        return fromGregorian(jsDate);
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        let jsDate = toGregorian(date);
        let day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        let date = week[thursdayIndex];
        const jsDate = toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    }
    isValid(date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        // year 0 doesn't exist in Gregorian calendar
        if (date.year === 0) {
            return false;
        }
        const jsDate = toGregorian(date);
        return (!isNaN(jsDate.getTime()) &&
            jsDate.getFullYear() === date.year - 543 &&
            jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day);
    }
}
NgbCalendarBuddhist.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbCalendarBuddhist, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
NgbCalendarBuddhist.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbCalendarBuddhist });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: NgbCalendarBuddhist, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWJ1ZGRoaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvYnVkZGhpc3QvbmdiLWNhbGVuZGFyLWJ1ZGRoaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxvQkFBb0IsRUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDOztBQUV4RDs7R0FFRztBQUVILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxvQkFBb0I7SUFDNUQsUUFBUTtRQUNQLE9BQU8sYUFBYSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQWEsRUFBRSxTQUFvQixHQUFHLEVBQUUsTUFBTSxHQUFHLENBQUM7UUFDekQsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFdEMsUUFBUSxNQUFNLEVBQUU7WUFDZixLQUFLLEdBQUc7Z0JBQ1AsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELE1BQU07WUFDUCxLQUFLLEdBQUc7Z0JBQ1AsYUFBYSxJQUFJLE1BQU0sQ0FBQztnQkFDeEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDL0IsYUFBYSxHQUFHLGFBQWEsR0FBRyxFQUFFLENBQUM7Z0JBQ25DLElBQUksYUFBYSxHQUFHLENBQUMsRUFB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QUFFLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHO1lBQ3hDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUs7WUFDcEMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQzdCLENBQUM7SUFDSCxDQUFDOztnSEFyRlcsbUJBQW1CO29IQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzSW50ZWdlciB9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQgeyBOZ2JDYWxlbmRhckdyZWdvcmlhbiwgTmdiUGVyaW9kIH0gZnJvbSAnLi4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7IE5nYkRhdGUgfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XG5pbXBvcnQgeyBmcm9tR3JlZ29yaWFuLCB0b0dyZWdvcmlhbiB9IGZyb20gJy4vYnVkZGhpc3QnO1xuXG4vKipcbiAqIEBzaW5jZSA5LjEuMFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiQ2FsZW5kYXJCdWRkaGlzdCBleHRlbmRzIE5nYkNhbGVuZGFyR3JlZ29yaWFuIHtcblx0Z2V0VG9kYXkoKTogTmdiRGF0ZSB7XG5cdFx0cmV0dXJuIGZyb21HcmVnb3JpYW4obmV3IERhdGUoKSk7XG5cdH1cblxuXHRnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XG5cdFx0bGV0IGpzRGF0ZSA9IHRvR3JlZ29yaWFuKGRhdGUpO1xuXHRcdGxldCBjaGVja01vbnRoID0gdHJ1ZTtcblx0XHRsZXQgZXhwZWN0ZWRNb250aCA9IGpzRGF0ZS5nZXRNb250aCgpO1xuXG5cdFx0c3dpdGNoIChwZXJpb2QpIHtcblx0XHRcdGNhc2UgJ3knOlxuXHRcdFx0XHRqc0RhdGUuc2V0RnVsbFllYXIoanNEYXRlLmdldEZ1bGxZZWFyKCkgKyBudW1iZXIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ20nOlxuXHRcdFx0XHRleHBlY3RlZE1vbnRoICs9IG51bWJlcjtcblx0XHRcdFx0anNEYXRlLnNldE1vbnRoKGV4cGVjdGVkTW9udGgpO1xuXHRcdFx0XHRleHBlY3RlZE1vbnRoID0gZXhwZWN0ZWRNb250aCAlIDEyO1xuXHRcdFx0XHRpZiAoZXhwZWN0ZWRNb250aCA8IDApIHtcblx0XHRcdFx0XHRleHBlY3RlZE1vbnRoID0gZXhwZWN0ZWRNb250aCArIDEyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnZCc6XG5cdFx0XHRcdGpzRGF0ZS5zZXREYXRlKGpzRGF0ZS5nZXREYXRlKCkgKyBudW1iZXIpO1xuXHRcdFx0XHRjaGVja01vbnRoID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGRhdGU7XG5cdFx0fVxuXG5cdFx0aWYgKGNoZWNrTW9udGggJiYganNEYXRlLmdldE1vbnRoKCkgIT09IGV4cGVjdGVkTW9udGgpIHtcblx0XHRcdC8vIHRoaXMgbWVhbnMgdGhlIGRlc3RpbmF0aW9uIG1vbnRoIGhhcyBsZXNzIGRheXMgdGhhbiB0aGUgaW5pdGlhbCBtb250aFxuXHRcdFx0Ly8gbGV0J3MgZ28gYmFjayB0byB0aGUgZW5kIG9mIHRoZSBwcmV2aW91cyBtb250aDpcblx0XHRcdGpzRGF0ZS5zZXREYXRlKDApO1xuXHRcdH1cblxuXHRcdHJldHVybiBmcm9tR3JlZ29yaWFuKGpzRGF0ZSk7XG5cdH1cblxuXHRnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TmV4dChkYXRlLCBwZXJpb2QsIC1udW1iZXIpO1xuXHR9XG5cblx0Z2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XG5cdFx0bGV0IGpzRGF0ZSA9IHRvR3JlZ29yaWFuKGRhdGUpO1xuXHRcdGxldCBkYXkgPSBqc0RhdGUuZ2V0RGF5KCk7XG5cdFx0Ly8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcblx0XHRyZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcblx0fVxuXG5cdGdldFdlZWtOdW1iZXIod2VlazogcmVhZG9ubHkgTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XG5cdFx0Ly8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcblx0XHRpZiAoZmlyc3REYXlPZldlZWsgPT09IDcpIHtcblx0XHRcdGZpcnN0RGF5T2ZXZWVrID0gMDtcblx0XHR9XG5cblx0XHRjb25zdCB0aHVyc2RheUluZGV4ID0gKDQgKyA3IC0gZmlyc3REYXlPZldlZWspICUgNztcblx0XHRsZXQgZGF0ZSA9IHdlZWtbdGh1cnNkYXlJbmRleF07XG5cblx0XHRjb25zdCBqc0RhdGUgPSB0b0dyZWdvcmlhbihkYXRlKTtcblx0XHRqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgNCAtIChqc0RhdGUuZ2V0RGF5KCkgfHwgNykpOyAvLyBUaHVyc2RheVxuXHRcdGNvbnN0IHRpbWUgPSBqc0RhdGUuZ2V0VGltZSgpO1xuXHRcdGpzRGF0ZS5zZXRNb250aCgwKTsgLy8gQ29tcGFyZSB3aXRoIEphbiAxXG5cdFx0anNEYXRlLnNldERhdGUoMSk7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgodGltZSAtIGpzRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDApIC8gNykgKyAxO1xuXHR9XG5cblx0aXNWYWxpZChkYXRlPzogTmdiRGF0ZSB8IG51bGwpOiBib29sZWFuIHtcblx0XHRpZiAoIWRhdGUgfHwgIWlzSW50ZWdlcihkYXRlLnllYXIpIHx8ICFpc0ludGVnZXIoZGF0ZS5tb250aCkgfHwgIWlzSW50ZWdlcihkYXRlLmRheSkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyB5ZWFyIDAgZG9lc24ndCBleGlzdCBpbiBHcmVnb3JpYW4gY2FsZW5kYXJcblx0XHRpZiAoZGF0ZS55ZWFyID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y29uc3QganNEYXRlID0gdG9HcmVnb3JpYW4oZGF0ZSk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0IWlzTmFOKGpzRGF0ZS5nZXRUaW1lKCkpICYmXG5cdFx0XHRqc0RhdGUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS55ZWFyIC0gNTQzICYmXG5cdFx0XHRqc0RhdGUuZ2V0TW9udGgoKSArIDEgPT09IGRhdGUubW9udGggJiZcblx0XHRcdGpzRGF0ZS5nZXREYXRlKCkgPT09IGRhdGUuZGF5XG5cdFx0KTtcblx0fVxufVxuIl19