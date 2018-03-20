+function ($, App) {

	var exports = App.components = App.components || {}

	function ToggleableComponent() {
		return this.each(function () {
			var $this = $(this)
			var text = $this.data(ToggleableComponent.DATA_COMPONENT)
			var handler = function () {
				var $el = $(this)
				var current = $el.text()

				$el.text(text)
				text = current

				$this.data(
					ToggleableComponent.DATA_CHANGED,
					!$this.data(ToggleableComponent.DATA_CHANGED)
				)
			}
			$this.on('click', handler)
		})
	};

	ToggleableComponent.SELECTOR = '[data-app-gui-toggleable]'
	ToggleableComponent.DATA_COMPONENT = 'app-gui-toggleable'
	ToggleableComponent.DATA_CHANGED = 'app-gui-toggleable-changed'

	exports['toggleable-component'] = $.fn.appToggleable = ToggleableComponent

}(jQuery, window.ClientApp = window.ClientApp || {});
