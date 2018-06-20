+function ($, App) {

	var exports = App.controllers = App.controllers || {};
	var core = App.core = App.core || {};
	var ToggleableComponent = core.component('toggleable')

	function HomeController(el) {
		if (this instanceof HomeController === false)
			return new HomeController(el)

		this.scope = scope = $(el)

		this.model = {
			title: scope.data(HomeController.DATA_CONFIG_TITLE)
		}

		$(ToggleableComponent.SELECTOR, scope).appToggleable()
	}

	HomeController.prototype.OnClick1 = function () {
		$ctrl = $(this).ctrl()

		$(HomeController.DATA_TITLE_SELECTOR, $ctrl.scope).text($ctrl.model.title)
	}

	HomeController.DATA_TITLE_SELECTOR = '[data-app-gui-title]'
	HomeController.DATA_CONFIG_TITLE = 'app-config-title'

	exports['home-controller'] = HomeController

}(jQuery, window.ClientApp = window.ClientApp || {});
