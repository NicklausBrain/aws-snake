define(
	'snakeGame/controls/getDirectionBySwipeType',
	['snakeGame/common/Direction',
	 'snakeGame/controls/Swipe'],
	function (Direction, Swipe) {

		var swipeTypeToDirection = {};

		swipeTypeToDirection[Swipe.Up] = Direction.Up;
		swipeTypeToDirection[Swipe.Down] = Direction.Down;
		swipeTypeToDirection[Swipe.Left] = Direction.Left;
		swipeTypeToDirection[Swipe.Right] = Direction.Right;

		function getDirectionBySwipeType(swipeType) {
			return swipeTypeToDirection[swipeType];
		}

		return getDirectionBySwipeType;
	}
);