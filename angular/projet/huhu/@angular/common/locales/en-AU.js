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
        define("@angular/common/locales/en-AU", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY.
    var u = undefined;
    function plural(n) {
        var i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
        if (i === 1 && v === 0)
            return 1;
        return 5;
    }
    exports.default = ["en-AU", [["am", "pm"], u, u], u, [["Su.", "M.", "Tu.", "W.", "Th.", "F.", "Sa."], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"]], u, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], u, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["d/M/yy", "d MMM y", "d MMMM y", "EEEE, d MMMM y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", u, "{1} 'at' {0}", u], [".", ",", ";", "%", "+", "-", "e", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0%", "¤#,##0.00", "#E0"], "AUD", "$", "Australian Dollar", { "AUD": ["$"], "BDT": [u, "Tk"], "BOB": [u, "$b"], "BRL": [u, "R$"], "CAD": [u, "$"], "CNY": [u, "¥"], "CUP": [u, "₱"], "EGP": [u, "£"], "EUR": [u, "€"], "GBP": [u, "£"], "HKD": [u, "$"], "ILS": [u, "₪"], "INR": [u, "₹"], "ISK": [u, "Kr"], "JPY": [u, "¥"], "KRW": [u, "₩"], "MXN": [u, "$"], "NZD": [u, "$"], "PYG": [u, "Gs"], "SCR": ["Rs"], "SEK": [u, "Kr"], "TWD": [u, "$"], "USD": [u, "$"], "UYU": [u, "$U"], "VND": [u, "₫"], "XAF": [], "XCD": [u, "$"], "XOF": [], "XPF": ["CFP"] }, "ltr", plural];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW4tQVUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9lbi1BVS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILDBDQUEwQztJQUMxQyxJQUFNLENBQUMsR0FBRyxTQUFTLENBQUM7SUFFcEIsU0FBUyxNQUFNLENBQUMsQ0FBUztRQUN6QixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRXBGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQixPQUFPLENBQUMsQ0FBQztRQUNiLE9BQU8sQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELGtCQUFlLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsRUFBQyxDQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsZUFBZSxFQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsZ0JBQWdCLENBQUMsRUFBQyxDQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsYUFBYSxFQUFDLGdCQUFnQixDQUFDLEVBQUMsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRISVMgQ09ERSBJUyBHRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZLlxuY29uc3QgdSA9IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gcGx1cmFsKG46IG51bWJlcik6IG51bWJlciB7XG5jb25zdCBpID0gTWF0aC5mbG9vcihNYXRoLmFicyhuKSksIHYgPSBuLnRvU3RyaW5nKCkucmVwbGFjZSgvXlteLl0qXFwuPy8sICcnKS5sZW5ndGg7XG5cbmlmIChpID09PSAxICYmIHYgPT09IDApXG4gICAgcmV0dXJuIDE7XG5yZXR1cm4gNTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW1wiZW4tQVVcIixbW1wiYW1cIixcInBtXCJdLHUsdV0sdSxbW1wiU3UuXCIsXCJNLlwiLFwiVHUuXCIsXCJXLlwiLFwiVGguXCIsXCJGLlwiLFwiU2EuXCJdLFtcIlN1blwiLFwiTW9uXCIsXCJUdWVcIixcIldlZFwiLFwiVGh1XCIsXCJGcmlcIixcIlNhdFwiXSxbXCJTdW5kYXlcIixcIk1vbmRheVwiLFwiVHVlc2RheVwiLFwiV2VkbmVzZGF5XCIsXCJUaHVyc2RheVwiLFwiRnJpZGF5XCIsXCJTYXR1cmRheVwiXSxbXCJTdVwiLFwiTW9uXCIsXCJUdVwiLFwiV2VkXCIsXCJUaFwiLFwiRnJpXCIsXCJTYXRcIl1dLHUsW1tcIkpcIixcIkZcIixcIk1cIixcIkFcIixcIk1cIixcIkpcIixcIkpcIixcIkFcIixcIlNcIixcIk9cIixcIk5cIixcIkRcIl0sW1wiSmFuXCIsXCJGZWJcIixcIk1hclwiLFwiQXByXCIsXCJNYXlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcFwiLFwiT2N0XCIsXCJOb3ZcIixcIkRlY1wiXSxbXCJKYW51YXJ5XCIsXCJGZWJydWFyeVwiLFwiTWFyY2hcIixcIkFwcmlsXCIsXCJNYXlcIixcIkp1bmVcIixcIkp1bHlcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPY3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl1dLHUsW1tcIkJcIixcIkFcIl0sW1wiQkNcIixcIkFEXCJdLFtcIkJlZm9yZSBDaHJpc3RcIixcIkFubm8gRG9taW5pXCJdXSwwLFs2LDBdLFtcImQvTS95eVwiLFwiZCBNTU0geVwiLFwiZCBNTU1NIHlcIixcIkVFRUUsIGQgTU1NTSB5XCJdLFtcImg6bW0gYVwiLFwiaDptbTpzcyBhXCIsXCJoOm1tOnNzIGEgelwiLFwiaDptbTpzcyBhIHp6enpcIl0sW1wiezF9LCB7MH1cIix1LFwiezF9ICdhdCcgezB9XCIsdV0sW1wiLlwiLFwiLFwiLFwiO1wiLFwiJVwiLFwiK1wiLFwiLVwiLFwiZVwiLFwiw5dcIixcIuKAsFwiLFwi4oieXCIsXCJOYU5cIixcIjpcIl0sW1wiIywjIzAuIyMjXCIsXCIjLCMjMCVcIixcIsKkIywjIzAuMDBcIixcIiNFMFwiXSxcIkFVRFwiLFwiJFwiLFwiQXVzdHJhbGlhbiBEb2xsYXJcIix7XCJBVURcIjpbXCIkXCJdLFwiQkRUXCI6W3UsXCJUa1wiXSxcIkJPQlwiOlt1LFwiJGJcIl0sXCJCUkxcIjpbdSxcIlIkXCJdLFwiQ0FEXCI6W3UsXCIkXCJdLFwiQ05ZXCI6W3UsXCLCpVwiXSxcIkNVUFwiOlt1LFwi4oKxXCJdLFwiRUdQXCI6W3UsXCLCo1wiXSxcIkVVUlwiOlt1LFwi4oKsXCJdLFwiR0JQXCI6W3UsXCLCo1wiXSxcIkhLRFwiOlt1LFwiJFwiXSxcIklMU1wiOlt1LFwi4oKqXCJdLFwiSU5SXCI6W3UsXCLigrlcIl0sXCJJU0tcIjpbdSxcIktyXCJdLFwiSlBZXCI6W3UsXCLCpVwiXSxcIktSV1wiOlt1LFwi4oKpXCJdLFwiTVhOXCI6W3UsXCIkXCJdLFwiTlpEXCI6W3UsXCIkXCJdLFwiUFlHXCI6W3UsXCJHc1wiXSxcIlNDUlwiOltcIlJzXCJdLFwiU0VLXCI6W3UsXCJLclwiXSxcIlRXRFwiOlt1LFwiJFwiXSxcIlVTRFwiOlt1LFwiJFwiXSxcIlVZVVwiOlt1LFwiJFVcIl0sXCJWTkRcIjpbdSxcIuKCq1wiXSxcIlhBRlwiOltdLFwiWENEXCI6W3UsXCIkXCJdLFwiWE9GXCI6W10sXCJYUEZcIjpbXCJDRlBcIl19LFwibHRyXCIsIHBsdXJhbF07XG4iXX0=