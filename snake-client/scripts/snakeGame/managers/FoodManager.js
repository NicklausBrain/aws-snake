define(
	'snakeGame/managers/FoodManager',
	['snakeGame/common/Location',
	 'snakeGame/objects/Food'],
	function (Location, Food) {
		function FoodManager(gameSettings, gameObjectsManager) {
			var width = gameSettings.width;//rename
			var height = gameSettings.height;//rename
			var food;

			function getRandomLocation() { // extract to somewhere
				var randomLocation = new Location(Math.randomInt(0, width), Math.randomInt(0, height));
				return gameObjectsManager.getObjectsAt(randomLocation).any()
					? getRandomLocation()
					: randomLocation;
			};

			this.getFoodAt = function (location) {
				return gameObjectsManager
					.getObjectsAt(location)
					.filter(function (gameObject) {
						return gameObject instanceof Food;
					})[0]; // beautify
			};

			this.tryCreateFood = function () {
				if (food == undefined || food.isConsumed) {
					food = gameObjectsManager.createGameObject(Food, getRandomLocation());
					return true;
				}
				return false;
			};
		}

		return FoodManager;
	}
);