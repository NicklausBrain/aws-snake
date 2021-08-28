define(
	'snakeGame/objects/SnakeHead',
	['snakeGame/objects/SnakeUnit'],
	function (SnakeUnit) {

		function SnakeHead(location, locationChangedEventHandler) {
			SnakeHead.super.constructor.call(this, location, locationChangedEventHandler);
		};

		SnakeHead.extends(SnakeUnit)

		return SnakeHead;
	}
);