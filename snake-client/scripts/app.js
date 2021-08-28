/// <reference path="common.js" />

require(
	['snakeGame/representation/SnakeGameRepresentation',
	 'snakeGame/GameSettings',
	 'snakeGame/SnakeGame',
	 'snakeGame/controls/createSwipeEvents',
	 'snakeGame/views/ViewActivator'],
	function (
		SnakeGameRepresentation,
		GameSettings,
		SnakeGame,
		createSwipeEvents,
		ViewActivator) {

		createSwipeEvents(window.document);

		var viewActivator = new ViewActivator();

		viewActivator.activateMenuView();

		/*------------------*/
		/*

		Menu screen/view
		-> Play button
		-> Settings button / or quit
		-> Scores button
		Game screen/view
		-> pauseButton
		-> resumeButton
		-> restartButton
		-> score {get set}
		-> game over message
		Settings screen/view

		----------------------------------------

		MenuPresenter(menuView, setActiveView)

		GamePresenter(gameView, setActiveView)
		
		MenuController

		*/
		/*-----------------*/
	}
);