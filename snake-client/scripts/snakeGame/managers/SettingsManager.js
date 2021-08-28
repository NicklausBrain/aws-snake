define(
	'snakeGame/managers/SettingsManager',
	['snakeGame/common/LocalStorage',
	 'snakeGame/GameSettings'],
	function (localStorage, GameSettings) {
		var gameSettingsKey = 'gameSettings';

		var settingsManager = {
			saveSettings: function (settings) {
				localStorage.setItem(gameSettingsKey, settings);
			},
			getSettings: function () {
				var settings = localStorage.getItem(gameSettingsKey) || {};
				return new GameSettings(settings.gameSpeed);
			}
		};

		return settingsManager;
	}
);