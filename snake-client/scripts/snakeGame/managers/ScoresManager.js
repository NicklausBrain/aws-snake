define(
	'snakeGame/managers/ScoresManager',
	['snakeGame/common/LocalStorage', 'snakeGame/common/RemoteStorage'],
	function (localStorage, remoteStorage) {
		var maxRecordsCount = 12; // mb to settings
		var recordsKey = 'playerRecords';
		var records = localStorage.getItem(recordsKey) || [];

		var scoresManager = {
			trySaveNewRecord: function (score) {
				remoteStorage.setScoreAsync(score)
					.then(function () { return true; })
					.catch(function (_) {
						if (records.length < maxRecordsCount || records.last().score < score) {
							var record = {
								score: score,
								date: new Date().toLocaleString()
							};

							records.push(record);
							records.sort(function (a, b) { return b.score - a.score; });

							if (records.length > maxRecordsCount) {
								records.pop();
							}

							localStorage.setItem(recordsKey, records);

							return true;
						}

						return false;
					})
			},
			getRecords: function () {
				return remoteStorage
					.getScoresAsync()
					.then(function (records) {
						return records.map(function (r) {
							var date = new Date(parseInt(r.timestamp.N));
							return {
								score: r.score.N,
								date: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
								ipAddress: r.ipAddress.S
							};});
					})
					.catch(function () {
						return localStorage.getItem(recordsKey);
					});
			}
		};

		return scoresManager;
	}
);