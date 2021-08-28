define(
	'snakeGame/views/MenuView',
	[],
	function () {

		function MenuView(
			playButton,
			settingsButton,
			scoresButton) {
			var self = this;

			this.playButtonClickHandler = null;
			this.settingsButtonClickHandler = null;
			this.scoresButtonClickHandler = null;

			playButton.addEventListener('click', function () {
				self.playButtonClickHandler();
			});
			settingsButton.addEventListener('click', function () {
				self.settingsButtonClickHandler();
			});
			scoresButton.addEventListener('click', function () {
				self.scoresButtonClickHandler();
			});

			//Object.defineProperties(this, {
			//	playButtonClickHandler: {
			//		set: function () {
			//			scoreLabel.textContent = 'Score: ' + (score += 10);// add string format
			//		}
			//	}
			//});

			this.activate = function () {

			};
		}

		return MenuView;
	}
);