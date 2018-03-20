+function ($, App) {

	var exports = App.components = App.components || {}
	var utils = App.utils = App.utils || {}

	function CtrlComponent(ctrl) {

		if (utils.isObject(ctrl)) {
			this.data(CtrlComponent.DATA_CTRL, ctrl)
			return ctrl
		}

		return this.data(CtrlComponent.DATA_CTRL)
	};

	CtrlComponent.DATA_CTRL = '$ctrl'

	exports['ctrl-component'] = $.fn.ctrl = CtrlComponent

}(jQuery, window.ClientApp = window.ClientApp || {});
