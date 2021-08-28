define(
	'snakeGame/common/Location',
	[],
	function () {

		function Location(x, y) {
			var self = this;
			this.x = x;
			this.y = y;
			this.copy = function () {
				return new Location(self.x, self.y);
			};
			this.toString = function () {
				return self.x + ':' + self.y;
			};
		};

		return Location;
	}
);