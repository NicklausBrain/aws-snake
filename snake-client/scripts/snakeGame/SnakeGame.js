define(
	'snakeGame/SnakeGame',
	['snakeGame/managers/GameObjectsManager',
	 'snakeGame/managers/FoodManager',
	 'snakeGame/objects/SnakeUnit',
	 'snakeGame/objects/Snake',
	 'snakeGame/managers/ScoresManager',
	 'snakeGame/managers/SettingsManager'],
	function (GameObjectsManager, FoodManager, SnakeUnit, Snake, scoresManager, settingsManager) {

		function SnakeGame(gameEventHandlers) {
			var gameSettings = settingsManager.getSettings();
			var stepInterval = gameSettings.gameSpeed;
			var gameObjectsManager = new GameObjectsManager(gameEventHandlers);
			var foodManager = new FoodManager(gameSettings, gameObjectsManager);
			var snake = new Snake(gameSettings, gameObjectsManager, foodManager, foodConsumedEventHandler);
			var score = 0;
			var gameStepTimerId;
			var isRecordAlreadySaved = false;

			function trySaveNewRecord() {
				if (!isRecordAlreadySaved) {
					scoresManager.trySaveNewRecord(score);
					isRecordAlreadySaved = true;
				}
			}

			function collisionWillOccure() {
				var nextLocation = snake.getNextLocation();

				return gameObjectsManager.getObjectsAt(nextLocation)
					.filter(function (object) {
						return object instanceof SnakeUnit && object != snake.units.last();//check this code
					})
					.any();
			}

			function foodConsumedEventHandler() {
				gameEventHandlers.scoreChangedEventHandler(score += 10);
			}

			function gameStep() {
				if (collisionWillOccure()) {
					clearInterval(gameStepTimerId);
					trySaveNewRecord(); // think about it
					gameEventHandlers.gameOverEventHandler();
					return;
				}
				snake.move();
				foodManager.tryCreateFood();
			}

			this.play = function () {
				gameStepTimerId = setInterval(gameStep, stepInterval);
			};

			this.pause = function () {
				clearInterval(gameStepTimerId);
			};

			this.destroy = function () {
				clearInterval(gameStepTimerId);
				trySaveNewRecord(); // think about it
				gameObjectsManager.deleteAllGameObjects();
			};

			this.setSnakeDirection = function (directionArg) {
				snake.setDirection(directionArg);
			};

			this.getSnakeDirection = function () {
				return snake.getDirection();
			};

			this.getSnake = function () {// not used (?)
				return snake;
			};

		};

		return SnakeGame;
	}
);