define(
	'snakeGame/managers/GameObjectsManager',
	[],
	function () {

		function GameObjectsManager(gameEventHandlers) {
			var objectsByLocationDict = {
				add: function (gameObject) {
					var location = gameObject.getLocation();
					if (objectsByLocationDict[location] == undefined) {
						objectsByLocationDict[location] = {};
					}
					objectsByLocationDict[location][gameObject.getId()] = gameObject;
				}
			};
			var objectByIdDict = {};

			function addGameObject(gameObject) {
				objectsByLocationDict.add(gameObject);
				objectByIdDict[gameObject.getId()] = gameObject;
			};

			this.createGameObject = function (constructor, location) {
				var gameObject = new constructor(location, gameEventHandlers.objectLocationChangedEventHandler);
				addGameObject(gameObject);
				gameEventHandlers.objectCreatedEventHandler(gameObject);
				return gameObject;
			};

			this.deleteGameObject = function (gameObject) {
				// duplicate
				delete objectsByLocationDict[gameObject.getLocation()][gameObject.getId()];
				delete objectByIdDict[gameObject.getId()];
				gameEventHandlers.objectDeletedEventHandler(gameObject);
			};

			this.deleteAllGameObjects = function () {
				for (var gameObjectLocation in objectsByLocationDict) {
					if (typeof objectsByLocationDict[gameObjectLocation] === 'function')
						continue;
					for (var gameObjectId in objectsByLocationDict[gameObjectLocation]) {
						gameEventHandlers.objectDeletedEventHandler(objectsByLocationDict[gameObjectLocation][gameObjectId]);
						delete objectsByLocationDict[gameObjectLocation][gameObjectId];
						delete objectByIdDict[gameObjectId];
					}
				}
			};

			this.setLocation = function (gameObject, newX, newY) {
				delete objectsByLocationDict[gameObject.getLocation()][gameObject.getId()];
				gameObject.setLocation(newX, newY);
				objectsByLocationDict.add(gameObject);//???
				gameEventHandlers.objectLocationChangedEventHandler(gameObject);
			};

			this.getObjectsAt = function (location) {
				return objectsByLocationDict[location] != undefined
					? Object.values(objectsByLocationDict[location])
					: [];
			};
		}

		return GameObjectsManager;
	}
);