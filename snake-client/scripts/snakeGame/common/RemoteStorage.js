define(
	'snakeGame/common/RemoteStorage',
	[],
	function () {
		var apiUrl = '/api/scores';
		var RemoteStorage = {

			getScoresAsync: function () {
				return fetch(apiUrl)
					.then(function (r) { return r.json(); });
			},
			setScoreAsync: function (score) {
				return fetch(apiUrl + '/' + score, { method: 'POST' });
			}
		};

		return RemoteStorage;
	}
);