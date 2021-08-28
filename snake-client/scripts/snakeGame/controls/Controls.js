define(
	'snakeGame/controls/Controls',
	['snakeGame/common/Direction'],
	function (Direction) {

		var Controls = (function () {
			var self = this;
			self.snakeGame = undefined;
			//self.snakeRepresentation = undefined;

			var keyCodeToDirection = {
				38: Direction.Up,
				40: Direction.Down,
				37: Direction.Left,
				39: Direction.Right
			};

			var swipeTypeToDirection = {
				'swipeup': Direction.Up,
				'swipedown': Direction.Down,
				'swipeleft': Direction.Left,
				'swiperight': Direction.Right
			};

			function keyDownEventHandler(e) {
				var direction = keyCodeToDirection[e.keyCode];
				if (direction != undefined) {
					self.snakeGame.setSnakeDirection(direction);
				}
			};

			function swipeEventHandler(e) {
				console.log(e.type, e);
				var direction = swipeTypeToDirection[e.type];
				if (direction != undefined) {
					self.snakeGame.setSnakeDirection(direction);
				}
			};

			function pauseButtonClickEventHandler(e) {
				document.getElementById('pauseButton').style.visibility = "hidden";
				document.getElementById('resumeButton').style.visibility = "visible";
				self.snakeGame.pause();
			};

			function resumeButtonClickEventHandler(e) {
				document.getElementById('resumeButton').style.visibility = "hidden";
				document.getElementById('pauseButton').style.visibility = "visible";
				self.snakeGame.play();
			};

			function restartButtonClickEventHandler(e) {
				window.location.reload();
			};

			function createSwipeEvents(d) { // TODO: refactor this function
				var customEvent = function (e, n) {
					var a = document.createEvent("CustomEvent");
					a.initCustomEvent(n, true, true, e.target);
					e.target.dispatchEvent(a); a = null;
					return false;
				};
				var nm = true
				var sp = { x: 0, y: 0 };
				var ep = { x: 0, y: 0 };
				var touch = {
					touchstart: function (e) {
						sp = {
							x: e.touches[0].pageX,
							y: e.touches[0].pageY
						};
					},
					touchmove: function (e) {
						nm = false; ep = {
							x: e.touches[0].pageX,
							y: e.touches[0].pageY
						};
					},
					touchend: function (e) {
						if (nm) {
							customEvent(e, 'fc');
						} else {
							var x = ep.x - sp.x,
								xr = Math.abs(x),
								y = ep.y - sp.y,
								yr = Math.abs(y);

							if (Math.max(xr, yr) > 20) {
								customEvent(e, (xr > yr
									? (x < 0 ? 'swipeleft' : 'swiperight')
									: (y < 0 ? 'swipeup' : 'swipedown')));
							}
						};
						nm = true;
					},
					touchcancel: function (e) { nm = false }
				};

				for (var a in touch) {
					d.addEventListener(a, touch[a], false);
				}
			};

			createSwipeEvents(window.document);

			return {
				initialize: function (snakeGame) {
					//getSnakeDirection = snakeGame.getSnakeDirection;
					//setSnakeDirection = snakeGame.setSnakeDirection;
					//getSnakeHeadLocation = snakeRepresentation.getHead;
					self.snakeGame = snakeGame;
					//self.snakeRepresentation = snakeRepresentation;

					// events
					window.addEventListener('keydown', keyDownEventHandler);
					//window.addEventListener('mousedown', clickEventHandler); //??

					//window.addEventListener('fc', h, false);// 0-50ms vs 500ms with normal click
					window.addEventListener('swipeleft', swipeEventHandler, false);
					window.addEventListener('swiperight', swipeEventHandler, false);
					window.addEventListener('swipeup', swipeEventHandler, false);
					window.addEventListener('swipedown', swipeEventHandler, false);

					document.getElementById('pauseButton').addEventListener('click', pauseButtonClickEventHandler);
					document.getElementById('resumeButton').addEventListener('click', resumeButtonClickEventHandler);
					document.getElementById('restartButton').addEventListener('click', restartButtonClickEventHandler);
				}
			};
		}());

		return Controls;
	}
);