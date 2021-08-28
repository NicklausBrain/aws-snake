define(
	'snakeGame/common/LocalStorage',
	[],
	function () {

		var LocalStorage = {
			getItem: function (key) {
				return JSON.parse(window.localStorage.getItem(key));
			},
			setItem: function (key, data) {
				window.localStorage.setItem(key, JSON.stringify(data));
			}
		};

		return LocalStorage;
	}
);