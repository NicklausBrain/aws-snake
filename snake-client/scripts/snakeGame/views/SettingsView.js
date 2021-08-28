define(
	'snakeGame/views/SettingsView',
	[],
	function () {

		function SettingsView(quitButton) {
			var self = this;

			this.quitButtonClickHandler = null;

			quitButton.addEventListener('click', function () {
				self.quitButtonClickHandler();
			});

			this.activate = function () {

			};
		}

		return SettingsView;
	}
);