+function ($, root, App) {

	var core = App.core = App.core || {}
	var utils = App.utils = App.utils || {}

	var CONTROLLER_IDENTIFIER = 'app-controller'
	var BIND_IDENTIFIER = 'app-bind'
	var CONTROLLER_SELECTOR = '[data-app-controller]'
	var BIND_SELECTOR = '[data-app-bind]'

	var setTitle = function () {
		var appTitle = core.config('app.title', 'ClientApp')
		$(document).attr('title', appTitle)
	}

	var installControllers = function () {
		$(CONTROLLER_SELECTOR, root).each(function () {
			var el = $(this)
			var name = el.data(CONTROLLER_IDENTIFIER)
			var ctor = core.controller(name)
			var ctrl = ctor(el)

			connect(el, ctrl)
		})
	}

	var connect = function (el, ctrl) {
		$(BIND_SELECTOR, el).each(function () {
			var el = $(this)
			var binder = el.data(BIND_IDENTIFIER)

			if (!utils.isString(binder) || 0 > binder.indexOf(':')) return

			binder = binder.split(':')

			if (!utils.isArray(binder) || binder.length < 2) retun

			var event = binder[0]
			var handler = ctrl[binder[1]]

			if (!utils.isString(event) || !utils.isFunction(handler)) return

			el.on(event, handler)
			el.ctrl(ctrl)
		})
	}

	var install = function () {
		setTitle()
		installControllers()
	}

	$(root).ready(install)

}(jQuery, document, window.ClientApp = window.ClientApp || {});

+function ($, App) {

	var exports = App.core = App.core || {}
	var controllers = App.controllers = App.controllers || {}
	var components = App.components = App.components || {}
	var utils = App.utils = App.utils || {}
	var config = App.config = App.config || {}

	var CONTROLLER_SUFFIX = '-controller'
	var COMPONENT_SUFFIX = '-component'

	function _registerAndGetController(ctrlName, ctrlConstructor) {
		if (utils.isString(ctrlName) && utils.isFunction(ctrlConstructor)) {
			return controllers[ctrlName + CONTROLLER_SUFFIX] = ctrlConstructor
		}

		if (utils.isString(ctrlName)) {
			var ctrl = controllers[ctrlName + CONTROLLER_SUFFIX]

			return utils.isFunction(ctrl)
				? ctrl
				: function () { }
		}

		return function () { };
	}

	function _getComponent(cmpName) {
		if (utils.isString(cmpName)) {
			var cmp = components[cmpName + COMPONENT_SUFFIX]

			return utils.isFunction(cmp)
				? cmp
				: function () { }
		}

		return function () { };
	}

	function _getConfig(key, defaultValue) {
		if (!utils.isString(key)) return

		var value = config,
			keys = key.split('.'),
			k = 0

		while (value && k < keys.length) {
			value = value[keys[k]];
			k++
		}

		return value || defaultValue
	}

	exports.controller = _registerAndGetController
	exports.component = _getComponent
	exports.config = _getConfig

}(jQuery, window.ClientApp = window.ClientApp || {});

+function ($, App) {

	var exports = App.utils = App.utils || {};

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

}(jQuery, window.ClientApp = window.ClientApp || {});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvcmUuanMiLCJ1dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZTVyLWpxdWVyeS1hcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiK2Z1bmN0aW9uICgkLCByb290LCBBcHApIHtcclxuXHJcblx0dmFyIGNvcmUgPSBBcHAuY29yZSA9IEFwcC5jb3JlIHx8IHt9XHJcblx0dmFyIHV0aWxzID0gQXBwLnV0aWxzID0gQXBwLnV0aWxzIHx8IHt9XHJcblxyXG5cdHZhciBDT05UUk9MTEVSX0lERU5USUZJRVIgPSAnYXBwLWNvbnRyb2xsZXInXHJcblx0dmFyIEJJTkRfSURFTlRJRklFUiA9ICdhcHAtYmluZCdcclxuXHR2YXIgQ09OVFJPTExFUl9TRUxFQ1RPUiA9ICdbZGF0YS1hcHAtY29udHJvbGxlcl0nXHJcblx0dmFyIEJJTkRfU0VMRUNUT1IgPSAnW2RhdGEtYXBwLWJpbmRdJ1xyXG5cclxuXHR2YXIgc2V0VGl0bGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgYXBwVGl0bGUgPSBjb3JlLmNvbmZpZygnYXBwLnRpdGxlJywgJ0NsaWVudEFwcCcpXHJcblx0XHQkKGRvY3VtZW50KS5hdHRyKCd0aXRsZScsIGFwcFRpdGxlKVxyXG5cdH1cclxuXHJcblx0dmFyIGluc3RhbGxDb250cm9sbGVycyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoQ09OVFJPTExFUl9TRUxFQ1RPUiwgcm9vdCkuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBlbCA9ICQodGhpcylcclxuXHRcdFx0dmFyIG5hbWUgPSBlbC5kYXRhKENPTlRST0xMRVJfSURFTlRJRklFUilcclxuXHRcdFx0dmFyIGN0b3IgPSBjb3JlLmNvbnRyb2xsZXIobmFtZSlcclxuXHRcdFx0dmFyIGN0cmwgPSBjdG9yKGVsKVxyXG5cclxuXHRcdFx0Y29ubmVjdChlbCwgY3RybClcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHR2YXIgY29ubmVjdCA9IGZ1bmN0aW9uIChlbCwgY3RybCkge1xyXG5cdFx0JChCSU5EX1NFTEVDVE9SLCBlbCkuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBlbCA9ICQodGhpcylcclxuXHRcdFx0dmFyIGJpbmRlciA9IGVsLmRhdGEoQklORF9JREVOVElGSUVSKVxyXG5cclxuXHRcdFx0aWYgKCF1dGlscy5pc1N0cmluZyhiaW5kZXIpIHx8IDAgPiBiaW5kZXIuaW5kZXhPZignOicpKSByZXR1cm5cclxuXHJcblx0XHRcdGJpbmRlciA9IGJpbmRlci5zcGxpdCgnOicpXHJcblxyXG5cdFx0XHRpZiAoIXV0aWxzLmlzQXJyYXkoYmluZGVyKSB8fCBiaW5kZXIubGVuZ3RoIDwgMikgcmV0dW5cclxuXHJcblx0XHRcdHZhciBldmVudCA9IGJpbmRlclswXVxyXG5cdFx0XHR2YXIgaGFuZGxlciA9IGN0cmxbYmluZGVyWzFdXVxyXG5cclxuXHRcdFx0aWYgKCF1dGlscy5pc1N0cmluZyhldmVudCkgfHwgIXV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHJldHVyblxyXG5cclxuXHRcdFx0ZWwub24oZXZlbnQsIGhhbmRsZXIpXHJcblx0XHRcdGVsLmN0cmwoY3RybClcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHR2YXIgaW5zdGFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHNldFRpdGxlKClcclxuXHRcdGluc3RhbGxDb250cm9sbGVycygpXHJcblx0fVxyXG5cclxuXHQkKHJvb3QpLnJlYWR5KGluc3RhbGwpXHJcblxyXG59KGpRdWVyeSwgZG9jdW1lbnQsIHdpbmRvdy5DbGllbnRBcHAgPSB3aW5kb3cuQ2xpZW50QXBwIHx8IHt9KTtcclxuIiwiK2Z1bmN0aW9uICgkLCBBcHApIHtcclxuXHJcblx0dmFyIGV4cG9ydHMgPSBBcHAuY29yZSA9IEFwcC5jb3JlIHx8IHt9XHJcblx0dmFyIGNvbnRyb2xsZXJzID0gQXBwLmNvbnRyb2xsZXJzID0gQXBwLmNvbnRyb2xsZXJzIHx8IHt9XHJcblx0dmFyIGNvbXBvbmVudHMgPSBBcHAuY29tcG9uZW50cyA9IEFwcC5jb21wb25lbnRzIHx8IHt9XHJcblx0dmFyIHV0aWxzID0gQXBwLnV0aWxzID0gQXBwLnV0aWxzIHx8IHt9XHJcblx0dmFyIGNvbmZpZyA9IEFwcC5jb25maWcgPSBBcHAuY29uZmlnIHx8IHt9XHJcblxyXG5cdHZhciBDT05UUk9MTEVSX1NVRkZJWCA9ICctY29udHJvbGxlcidcclxuXHR2YXIgQ09NUE9ORU5UX1NVRkZJWCA9ICctY29tcG9uZW50J1xyXG5cclxuXHRmdW5jdGlvbiBfcmVnaXN0ZXJBbmRHZXRDb250cm9sbGVyKGN0cmxOYW1lLCBjdHJsQ29uc3RydWN0b3IpIHtcclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhjdHJsTmFtZSkgJiYgdXRpbHMuaXNGdW5jdGlvbihjdHJsQ29uc3RydWN0b3IpKSB7XHJcblx0XHRcdHJldHVybiBjb250cm9sbGVyc1tjdHJsTmFtZSArIENPTlRST0xMRVJfU1VGRklYXSA9IGN0cmxDb25zdHJ1Y3RvclxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhjdHJsTmFtZSkpIHtcclxuXHRcdFx0dmFyIGN0cmwgPSBjb250cm9sbGVyc1tjdHJsTmFtZSArIENPTlRST0xMRVJfU1VGRklYXVxyXG5cclxuXHRcdFx0cmV0dXJuIHV0aWxzLmlzRnVuY3Rpb24oY3RybClcclxuXHRcdFx0XHQ/IGN0cmxcclxuXHRcdFx0XHQ6IGZ1bmN0aW9uICgpIHsgfVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7IH07XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfZ2V0Q29tcG9uZW50KGNtcE5hbWUpIHtcclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhjbXBOYW1lKSkge1xyXG5cdFx0XHR2YXIgY21wID0gY29tcG9uZW50c1tjbXBOYW1lICsgQ09NUE9ORU5UX1NVRkZJWF1cclxuXHJcblx0XHRcdHJldHVybiB1dGlscy5pc0Z1bmN0aW9uKGNtcClcclxuXHRcdFx0XHQ/IGNtcFxyXG5cdFx0XHRcdDogZnVuY3Rpb24gKCkgeyB9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHsgfTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIF9nZXRDb25maWcoa2V5LCBkZWZhdWx0VmFsdWUpIHtcclxuXHRcdGlmICghdXRpbHMuaXNTdHJpbmcoa2V5KSkgcmV0dXJuXHJcblxyXG5cdFx0dmFyIHZhbHVlID0gY29uZmlnLFxyXG5cdFx0XHRrZXlzID0ga2V5LnNwbGl0KCcuJyksXHJcblx0XHRcdGsgPSAwXHJcblxyXG5cdFx0d2hpbGUgKHZhbHVlICYmIGsgPCBrZXlzLmxlbmd0aCkge1xyXG5cdFx0XHR2YWx1ZSA9IHZhbHVlW2tleXNba11dO1xyXG5cdFx0XHRrKytcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWUgfHwgZGVmYXVsdFZhbHVlXHJcblx0fVxyXG5cclxuXHRleHBvcnRzLmNvbnRyb2xsZXIgPSBfcmVnaXN0ZXJBbmRHZXRDb250cm9sbGVyXHJcblx0ZXhwb3J0cy5jb21wb25lbnQgPSBfZ2V0Q29tcG9uZW50XHJcblx0ZXhwb3J0cy5jb25maWcgPSBfZ2V0Q29uZmlnXHJcblxyXG59KGpRdWVyeSwgd2luZG93LkNsaWVudEFwcCA9IHdpbmRvdy5DbGllbnRBcHAgfHwge30pO1xyXG4iLCIrZnVuY3Rpb24gKCQsIEFwcCkge1xyXG5cclxuXHR2YXIgZXhwb3J0cyA9IEFwcC51dGlscyA9IEFwcC51dGlscyB8fCB7fTtcclxuXHJcblx0ZXhwb3J0cy5pc1N0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcclxuXHR9XHJcblxyXG5cdGV4cG9ydHMuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCdcclxuXHR9XHJcblx0ZXhwb3J0cy5pc09iamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0Ly8gaHR0cDovL2pzcGVyZi5jb20vaXNvYmplY3Q0XHJcblx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0J1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0cy5pc051bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcclxuXHR9XHJcblxyXG5cdGV4cG9ydHMuaXNBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KGFycikgfHwgYXJyIGluc3RhbmNlb2YgQXJyYXlcclxuXHR9XHJcblxyXG59KGpRdWVyeSwgd2luZG93LkNsaWVudEFwcCA9IHdpbmRvdy5DbGllbnRBcHAgfHwge30pO1xyXG4iXX0=
