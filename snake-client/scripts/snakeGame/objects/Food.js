define(
	'snakeGame/objects/Food',
	['snakeGame/objects/GameObject'],
	function (GameObject) {

		function Food(location, locationChangedEventHandler) {
			Food.super.constructor.call(this, location, locationChangedEventHandler);
			this.isConsumed = false;
		};

		Food.extends(GameObject);

		return Food;
	}
);