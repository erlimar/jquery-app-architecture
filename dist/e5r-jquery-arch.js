/*!
 * e5r-jquery-arch v1.0.0
 * Arquitetura de aplicação jQuery (https://github.com/erlimar/jquery-app-architecture)
 * Copyright (c) Erlimar Silva Campos (erlimar@gmail.com). All rights reserved.
 * Licensed under the Apache-2.0 License. More license information in LICENSE.
 */
 
// ========================================================================
// app.js
// ========================================================================
+function ($, root, App) {

	var core = App.core = App.core || {}
	var utils = App.utils = App.utils || {}

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

}(jQuery, document, window.ClientApp = window.ClientApp || {});


// ========================================================================
// core.js
// ========================================================================
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

    function _listComponents() {
        var list = []

        for (var c in components)
            list.push({
                id: c,
                component: components[c]
            })

        return list
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

    function _setConfig(key, newValue) {
        if (!utils.isString(key)) return

        var value = config,
            keys = key.split('.'),
            k = 0

        while (value && k < keys.length) {
            if (typeof value[keys[k]] !== 'object')
                value[keys[k]] = {}

            if (k + 1 !== keys.length)
                value = value[keys[k]]

            k++
        }

        return value[keys[--k]] = newValue
    }

    exports.controller = _registerAndGetController
    exports.component = _getComponent
    exports.listComponents = _listComponents
    exports.getConfig = _getConfig
    exports.setConfig = _setConfig

}(jQuery, window.ClientApp = window.ClientApp || {});


// ========================================================================
// utils.js
// ========================================================================
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
