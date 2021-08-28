define(
	'snakeGame/presenters/GamePresenter',
	['snakeGame/controls/getDirectionByKeyCode',
	 'snakeGame/controls/getDirectionBySwipeType',
	 'snakeGame/GameSettings',
	 'snakeGame/SnakeGame'],
	function (getDirectionByKeyCode, getDirectionBySwipeType, GameSettings, SnakeGame) {

		function GamePresenter(gameView, gameEventHandlers, viewActivator) {

			gameEventHandlers.scoreChangedEventHandler = gameView.setScore;
			gameEventHandlers.gameOverEventHandler = gameView.showGameOverDialog;

			var snakeGame = new SnakeGame(gameEventHandlers);

			gameView.activationHandler = function () { // TODO: think about this
				snakeGame.play();
			};

			gameView.pauseButtonClickHandler = function () {
				snakeGame.pause();
			};

			gameView.resumeButtonClickHandler = function () {
				snakeGame.play();
			};

			gameView.restartButtonClickHandler = function () {
				if (gameView.confirmGameRestart()) {
					snakeGame.destroy();
					viewActivator.activateGameView();
				}
			};

			gameView.quitButtonClickHandler = function () {
				if (gameView.confirmGameQuit()) {
					snakeGame.destroy();
					viewActivator.activateMenuView();
				}
			};

			gameView.keyDownHandler = function (e) { // duplicate
				var direction = getDirectionByKeyCode(e.keyCode);
				if (direction != undefined) {
					snakeGame.setSnakeDirection(direction);
				}
			};

			gameView.swipeHandler = function (e) {// duplicate
				console.log(e.type, e);// TODO: DEBUG
				var direction = getDirectionBySwipeType(e.type);
				if (direction != undefined) {
					snakeGame.setSnakeDirection(direction);
				}
			};
		}

		return GamePresenter;
	}
);