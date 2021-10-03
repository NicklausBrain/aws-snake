define(
	'snakeGame/common/RemoteStorage',
	[],
	function () {
		var apiUrl = '/api/scores';
		var RemoteStorage = {

			getScoresAsync: function () {
				return fetch(apiUrl)
					.then(function (r) { return r.json(); })
					.then(function (records) {
						return records.map(function (r) {
							var date = new Date(parseInt(r.timestamp.N));
							return {
								score: r.score.N,
								date: date,
								ipAddress: r.ipAddress.S
							};});
					});
			},
			setScoreAsync: function (score) {
				return fetch(apiUrl + '/' + score, { method: 'POST' });
			}
		};

		return RemoteStorage;
	}
);