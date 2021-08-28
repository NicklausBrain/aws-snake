define(
	'snakeGame/views/ViewActivator',
	['snakeGame/views/ViewLoader',
	 'snakeGame/views/MenuView',
	 'snakeGame/views/GameView',
	 'snakeGame/views/ScoresView',
	 'snakeGame/views/SettingsView',
	 'snakeGame/presenters/MenuPresenter',
	 'snakeGame/presenters/GamePresenter',
	 'snakeGame/presenters/ScoresPresenter',
	 'snakeGame/presenters/SettingsPresenter',
	 'snakeGame/representation/SnakeGameRepresentation'],
	function (
		viewLoader,
		MenuView,
		GameView,
		ScoresView,
		SettingsView,
		MenuPresenter,
		GamePresenter,
		ScoresPresenter,
		SettingsPresenter,
		SnakeGameRepresentation) {

		function ViewActivator() {

			this.activateMenuView = function () {
				viewLoader.load('./views/menuView.html');

				var menuView = new MenuView(
					document.getElementById('playButton'),
					document.getElementById('settingsButton'),
					document.getElementById('scoresButton')
				);

				var menuPresenter = new MenuPresenter(menuView, this);

				menuView.activate();
			};

			this.activateGameView = function () {
				viewLoader.load('./views/gameView.html');

				var gameView = new GameView(
					window,
					document.getElementById('pauseButton'),
					document.getElementById('resumeButton'),
					document.getElementById('restartButton'),
					document.getElementById('quitButton'),
					document.getElementById('scoreLabel')
				);

				var gameEventHandlers = new SnakeGameRepresentation();

				var gamePresenter = new GamePresenter(gameView, gameEventHandlers, this);

				gameView.activate();
			}

			this.activateScoresView = function () {
				viewLoader.load('./views/scoresView.html');

				var scoresView = new ScoresView(
					document.getElementById('scoresScreen'),
					document.getElementById('quitButton')
				);

				var scoresPresenter = new ScoresPresenter(scoresView, this);

				scoresView.activate();
			}

			this.activateSettingsView = function () {
				viewLoader.load('./views/settingsView.html');

				var settingsView = new SettingsView(
					document.getElementById('quitButton')
				);

				var settingsPresenter = new SettingsPresenter(settingsView, this);

				settingsView.activate();
			}
		}

		return ViewActivator;
	}
);