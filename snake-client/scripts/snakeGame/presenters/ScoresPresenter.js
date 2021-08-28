define(
	'snakeGame/presenters/ScoresPresenter',
	['snakeGame/managers/ScoresManager'],
	function (scoresManager) {

		function ScoresPresenter(scoresView, viewActivator) {

			scoresView.quitButtonClickHandler = function () {
				viewActivator.activateMenuView();
			};

			scoresManager.getRecords().forEach(scoresView.renderRecord);
		}

		return ScoresPresenter;
	}
);