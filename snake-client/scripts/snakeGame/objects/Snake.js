define(
	'snakeGame/objects/Snake',
	['snakeGame/objects/SnakeUnit',
	 'snakeGame/objects/SnakeHead',
	 'snakeGame/common/Location',
	 'snakeGame/common/Direction'],
	function (SnakeUnit, SnakeHead, Location, Direction) {
		function Snake(gameSettings, gameObjectsManager, foodManager, foodConsumedEventHandler) {
			var self = this;// mb get rid of self ?
			var defaultSnakeLength = gameSettings.snakeLength;
			var headLocation = gameSettings.snakeHeadLocation;
			var direction = gameSettings.motionDirection;
			var width = gameSettings.width;
			var height = gameSettings.height;
			var x = headLocation.x, y = headLocation.y;//rename(?)

			//var snakeUnitCreatedEvent = new Event();

			self.units = Array.apply(undefined, Array(defaultSnakeLength))// check this code
				.map(function (_, i) {
					var snakeUnitConstructor = i === 0 ? SnakeHead : SnakeUnit;
					return gameObjectsManager.createGameObject(snakeUnitConstructor, new Location(x, y++));
				});

			function getHead() {
				return self.units[0];
			};

			function getTail() {
				return self.units[self.units.length - 1];
			};

			function moveTailToHead() {
				var headLocation = getHead().getLocation();
				var tailUnit = self.units.pop();
				gameObjectsManager.setLocation(tailUnit, headLocation.x, headLocation.y);

				// TODO: ATTENTION - may slightly affect performance
				// TODO: Change it to linked list
				self.units.splice(1, 0, tailUnit);
			};

			function tryToConsumeFood() {
				var food = foodManager.getFoodAt(getHead().getLocation());
				if (food != undefined) {
					//foodManager.markFoodConsumed();
					food.isConsumed = true;
					foodConsumedEventHandler();
				}
			};

			function tryToDigestFood(tailLocation) {
				var food = foodManager.getFoodAt(tailLocation);
				if (food != undefined) {
					gameObjectsManager.deleteGameObject(food);//mb to food maanger?
					self.units.push(gameObjectsManager.createGameObject(SnakeUnit, tailLocation));
				}
			};

			self.getNextLocation = function () {
				var headLocation = getHead().getLocation();//mb name it current location
				var nextX = headLocation.x, nextY = headLocation.y;

				switch (direction) { // try to enhance this code
					case Direction.Up: {
						nextY = headLocation.y === 0 ? height - 1 : headLocation.y - 1;
					} break;
					case Direction.Down: {
						nextY = headLocation.y === height - 1 ? 0 : headLocation.y + 1;
					} break;
					case Direction.Left: {
						nextX = headLocation.x === 0 ? width - 1 : headLocation.x - 1;
					} break;
					case Direction.Right: {
						nextX = headLocation.x === width - 1 ? 0 : headLocation.x + 1;
					} break;
				};

				return new Location(nextX, nextY);
			};

			self.move = function () {
				var headUnit = getHead();
				var nextLocation = self.getNextLocation();
				var tailLocation = getTail().getLocation().copy();// mb current/previous tail location?

				moveTailToHead();

				tryToDigestFood(tailLocation);//why to pass this to this function?

				gameObjectsManager.setLocation(headUnit, nextLocation.x, nextLocation.y);

				tryToConsumeFood();
			};

			self.setDirection = function (newMotionDirection) {
				if (!Direction.areOpposite(direction, newMotionDirection)) {
					direction = newMotionDirection;
				}
			};

			self.getDirection = function () {
				return direction;
			};

			//self.snakeUnitCreatedEvent = snakeUnitCreatedEvent;

			return self;
		}

		return Snake;
	}
);