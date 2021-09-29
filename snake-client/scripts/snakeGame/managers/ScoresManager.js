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
						var recordsToDisplay = records
							.sort(function(r1, r2) {
								return r2.score - r1.score; })
							.slice(0, 10)
							.map(function(r) {
								return {
									score: r.score,
									date: r.date.toLocaleDateString() + ' ' + r.date.toLocaleTimeString().slice(0, 5),
									ipAddress: r.ipAddress
								};
							});
						
						return recordsToDisplay;
					})
					.catch(function () {
						return localStorage.getItem(recordsKey);
					});
			}
		};

		return scoresManager;
	}
);