define(
	'snakeGame/objects/GameObject',
	[],
	function () {

		function GameObject(location, locationChangedEventHandler) {
			var self = this;

			this.id = Math.random();// change it. Integer values may improve performance.

			this.setLocation = function (x, y) {
				location.x = x;
				location.y = y;
				if (locationChangedEventHandler) {// remove it (?)
					locationChangedEventHandler(self);
				}
				//locationChangedEvent.invoke(self);
			};
			this.getLocation = function () {
				return location;
			};
			this.getId = function () {
				return self.id;
			};
			//this.locationChangedEvent = locationChangedEvent;
		};

		return GameObject;
	}
);