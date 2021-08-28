define(
	'snakeGame/representation/setLocation',
	[],
	function () {

		function setLocation(element, location) {
			var multiplier = 1;
			element.style.top = location.y * multiplier + 'rem';
			element.style.left = location.x * multiplier + 'rem';
		};

		return setLocation;
	}
);