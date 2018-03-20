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
