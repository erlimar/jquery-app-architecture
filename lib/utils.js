+function ($, App) {
	; function require(_) { return App[_] = App[_] || {} }
	(function (exports) {

		exports.isString = function (value) {
			return typeof value === 'string'
		}

		exports.isFunction = function (value) {
			return typeof value === 'function'
		}

		exports.isUndefined = function (value) {
			return typeof value === 'undefined'
		}
		exports.isObject = function (value) {
			// http://jsperf.com/isobject4
			return value !== null && typeof value === 'object'
		}

		exports.isNumber = function (value) {
			return typeof value === 'number'
		}

		exports.isArray = function (arr) {
			return Array.isArray(arr) || arr instanceof Array
		}

	})(App.core = App.core || {})
}(jQuery, window.ClientApp = window.ClientApp || {});
