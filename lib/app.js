+function ($, root, App) {
	; function require(_) { return App[_] = App[_] || {} }
	(function () {

		var core = require('core')
		var utils = require('utils')

		var CONTROLLER_IDENTIFIER = 'app-controller'
		var BIND_IDENTIFIER = 'app-bind'
		var CONTROLLER_SELECTOR = '[data-app-controller]'
		var BIND_SELECTOR = '[data-app-bind]'
		var COMPONENT_SELECTOR_KEY = 'SELECTOR'
		var COMPONENT_NAME_KEY = 'NAME'
		var COMPONENT_SUFFIX = '-component'

		var setTitle = function () {
			var appTitle = core.getConfig('app.title')

			if (appTitle)
				$(document).attr('title', appTitle)
		}

		var installControllers = function () {
			$(CONTROLLER_SELECTOR, root).each(function () {
				var el = $(this)
				var name = el.data(CONTROLLER_IDENTIFIER)
				var ctor = core.controller(name)
				var ctrl = ctor(el)

				connect(el, ctrl)
				initComponents(el, ctrl)
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

		var initComponents = function (el, ctrl) {
			core.listComponents().map(function (cmp) {
				if (!utils.isString(cmp.id)) return
				if (!utils.isFunction(cmp.component)) return
				if (!utils.isString(cmp.component[COMPONENT_SELECTOR_KEY])) return
				if (!utils.isString(cmp.component[COMPONENT_NAME_KEY])) return
				if (cmp.id.lastIndexOf(COMPONENT_SUFFIX) !== cmp.id.length - COMPONENT_SUFFIX.length) return

				var jqSelector = cmp.component[COMPONENT_SELECTOR_KEY]
				var jqFn = cmp.component[COMPONENT_NAME_KEY]

				$(jqSelector, el)[jqFn](el)
			})
		}

		var install = function () {
			setTitle()
			installControllers()
		}

		$(root).ready(install)

	})()
}(jQuery, document, window.ClientApp = window.ClientApp || {});
