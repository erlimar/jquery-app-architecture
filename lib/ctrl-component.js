+function ($, App) {
	; function require(_) { return App[_] = App[_] || {} }
	(function (exports) {

		var utils = require('utils')

		function CtrlComponent(ctrl) {

			if (utils.isObject(ctrl)) {
				this.data(CtrlComponent.DATA_CTRL, ctrl)
				return ctrl
			}

			return this.data(CtrlComponent.DATA_CTRL)
		};

		CtrlComponent.DATA_CTRL = '$ctrl'

		exports['ctrl-component'] = $.fn.ctrl = CtrlComponent

	})(App.components = App.components || {})
}(jQuery, window.ClientApp = window.ClientApp || {});
