define(
	'snakeGame/presenters/MenuPresenter',
	[],
	function () {

		function MenuPresenter(menuView, viewActivator) {

			menuView.playButtonClickHandler = function () {
				viewActivator.activateGameView();
			};

			menuView.settingsButtonClickHandler = function () {
				viewActivator.activateSettingsView();
			};

			menuView.scoresButtonClickHandler = function () {
				viewActivator.activateScoresView();
			};
		}

		return MenuPresenter;
	}
);