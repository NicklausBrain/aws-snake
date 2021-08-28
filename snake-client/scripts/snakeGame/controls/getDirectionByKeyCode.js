define(
	'snakeGame/controls/getDirectionByKeyCode',
	['snakeGame/common/Direction',
	 'snakeGame/controls/Key'],
	function (Direction, Key) {

		var keyCodeToDirection = {};

		keyCodeToDirection[Key.UpArrow] = Direction.Up;
		keyCodeToDirection[Key.DownArrow] = Direction.Down;
		keyCodeToDirection[Key.LeftArrow] = Direction.Left;
		keyCodeToDirection[Key.RightArrow] = Direction.Right;

		function getDirectionByKeyCode(keyCode) {
			return keyCodeToDirection[keyCode];
		}

		return getDirectionByKeyCode;
	}
);