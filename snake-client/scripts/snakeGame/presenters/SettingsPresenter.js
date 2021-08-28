define(
	'snakeGame/presenters/SettingsPresenter',
	[],
	function () {

		function SettingsPresenter(settingsView, viewActivator) {

			settingsView.quitButtonClickHandler = function () {
				viewActivator.activateMenuView();
			};
		}

		return SettingsPresenter;
	}
);