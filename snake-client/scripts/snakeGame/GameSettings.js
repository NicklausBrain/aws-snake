define(
	'snakeGame/GameSettings',
	['snakeGame/common/Location',
	 'snakeGame/common/Direction'],
	function (Location, Direction) {

		function GameSettings(gameSpeed) {
			var width = 18;
			var height = 32;
			var snakeHeadLocation = new Location(width / 2, height / 2);

			this.gameSpeed = gameSpeed || 100;

			Object.defineProperties(this, {
				'width': {
					value: width,
					writable: false,
					configurable: false
				},
				'height': {
					value: height,
					writable: false,
					configurable: false
				},
				'snakeLength': {
					value: 6,
					writable: false,
					configurable: false
				},
				'motionDirection': {
					value: Direction.Up,
					writable: false,
					configurable: false
				},
				'snakeHeadLocation': {
					value: snakeHeadLocation,
					writable: false,
					configurable: false
				}
			});

		};

		return GameSettings;
	}
);