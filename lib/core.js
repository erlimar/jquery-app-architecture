+function($, App) {

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
                : function() { }
        }

        return function() { };
    }

    function _getComponent(cmpName) {
        if (utils.isString(cmpName)) {
            var cmp = components[cmpName + COMPONENT_SUFFIX]

            return utils.isFunction(cmp)
                ? cmp
                : function() { }
        }

        return function() { };
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
    exports.getConfig = _getConfig
    exports.setConfig = _setConfig

}(jQuery, window.ClientApp = window.ClientApp || {});
