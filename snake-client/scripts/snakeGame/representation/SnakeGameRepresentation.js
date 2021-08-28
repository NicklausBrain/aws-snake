define(
	'snakeGame/representation/SnakeGameRepresentation',
	['snakeGame/representation/setLocation',
	 'snakeGame/representation/GameObjectRepresentation'],
	function (setLocation, GameObjectRepresentation) {

		function SnakeGameRepresentation() { // TODO: refactor this class
			var screen = document.getElementById('gameScreen');//TODO: fix hardcode
			var representationObjects = {};
			var classFor = {
				SnakeHead: 'snakeHead',
				SnakeUnit: 'snakeUnit',
				Food: 'food'
			};

			function createRepresentation(gameObject) {
				//if (classFor[gameObject.constructor.name] == 'food')//DEBUG
				//{
				//	console.log(gameObject.getLocation());//DEBUG
				//}

				var gameObjectRepresentation = new GameObjectRepresentation(gameObject, classFor[gameObject.constructor.name]);
				representationObjects[gameObject.id] = gameObjectRepresentation;
				screen.appendChild(gameObjectRepresentation);
			};

			function deleteRepresentation(gameObject) {
				screen.removeChild(representationObjects[gameObject.id]);
				delete representationObjects[gameObject.id];
			};

			this.objectCreatedEventHandler = function (gameObject) {
				createRepresentation(gameObject);
				//createRepresentation[gameObject.constructor.name](gameObject);
			};

			this.objectDeletedEventHandler = function (gameObject) {
				deleteRepresentation(gameObject);
			};

			this.objectLocationChangedEventHandler = function (gameObject) {
				setLocation(representationObjects[gameObject.id], gameObject.getLocation());
			};

			//return new GameEventHandlers(objectCreatedEventHandler, objectDeletedEventHandler, objectLocationChangedEventHandler)
			this.debugState = function () {
				console.log(representationObjects);
			}
		}

		return SnakeGameRepresentation;
	}
);