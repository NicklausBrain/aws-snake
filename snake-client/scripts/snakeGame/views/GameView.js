define(
	'snakeGame/views/GameView',
	[],
	function () {

		function GameView(
			gameScreen,
			pauseButton,
			resumeButton,
			restartButton,
			quitButton,
			scoreLabel) {
			var self = this;

			self.pauseButtonClickHandler = null;
			self.resumeButtonClickHandler = null;
			self.restartButtonClickHandler = null;
			self.quitButtonClickHandler = null;
			self.keyDownHandler = null;
			self.swipeHandler = null;
			//-----------
			self.activationHandler = function () { };
			//-----------

			self.setScore = function (scoreValue) { // localization required
				scoreLabel.textContent = 'Score: ' + scoreValue; // add string format
			};

			self.showGameOverDialog = function () {
				alert('Game Over!'); //TODO: Make something more clever
			};

			self.confirmGameRestart = function () {
				return confirm('Are you sure You want to restart the game?'); // localization required
			};

			self.confirmGameQuit = function () {
				return confirm('Are you sure You want to finish this game?'); // localization required
			};

			self.createRepresentation = function (gameObject) {

			};

			self.deleteRepresentation = function (gameObject) {

			};

			pauseButton.addEventListener('click', function () {
				pauseButton.style.visibility = "hidden";
				resumeButton.style.visibility = "visible";
				self.pauseButtonClickHandler();
			});
			resumeButton.addEventListener('click', function () {
				resumeButton.style.visibility = "hidden";
				pauseButton.style.visibility = "visible";
				self.resumeButtonClickHandler();
			});
			restartButton.addEventListener('click', function () {
				self.restartButtonClickHandler();
			});
			quitButton.addEventListener('click', function () {
				self.quitButtonClickHandler();
			});

			gameScreen.addEventListener('keydown', function (e) {
				self.keyDownHandler(e);
			});

			// Think how to improve this events
			gameScreen.addEventListener('swipeleft', function (e) {
				self.swipeHandler(e);
			});
			gameScreen.addEventListener('swiperight', function (e) {
				self.swipeHandler(e);
			});
			gameScreen.addEventListener('swipeup', function (e) {
				self.swipeHandler(e);
			});
			gameScreen.addEventListener('swipedown', function (e) {
				self.swipeHandler(e);
			});

			self.activate = function () {
				self.activationHandler();
			}
		}

		return GameView;
	}
);