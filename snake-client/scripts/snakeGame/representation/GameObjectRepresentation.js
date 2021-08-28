define(
	'snakeGame/representation/GameObjectRepresentation',
	['snakeGame/representation/setLocation'],
	function (setLocation) {

		function GameObjectRepresentation(gameObject, className) {
			var objectRepresentation = document.createElement('div');
			objectRepresentation.classList.add(className);

			setLocation(objectRepresentation, gameObject.getLocation());

			//gameObject.locationChangedEvent.addHandler(function (gameObject) {
			//	setLocation(objectRepresentation, gameObject.getLocation());
			//});
			return objectRepresentation;
		}

		return GameObjectRepresentation;
	}
);