define(
	'snakeGame/presenters/ScoresPresenter',
	['snakeGame/managers/ScoresManager'],
	function (scoresManager) {

		function ScoresPresenter(scoresView, viewActivator) {

			scoresView.quitButtonClickHandler = function () {
				viewActivator.activateMenuView();
			};

			scoresManager
				.getRecords()
				.then(function (scores) {
					scores.forEach(
						scoresView.renderRecord)
				});
		}

		return ScoresPresenter;
	}
);