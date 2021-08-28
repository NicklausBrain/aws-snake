define(
	'snakeGame/objects/SnakeUnit',
	['snakeGame/objects/GameObject'],
	function (GameObject) {

		function SnakeUnit(location, locationChangedEventHandler) {
			SnakeUnit.super.constructor.call(this, location, locationChangedEventHandler);
		};

		SnakeUnit.extends(GameObject)

		return SnakeUnit;
	}
);