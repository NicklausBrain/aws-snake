define(
	'snakeGame/controls/createSwipeEvents',
	['snakeGame/controls/Swipe'],
	function (Swipe) {

		function createSwipeEvents(element) { // TODO: refactor this function
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

						if (Math.max(xr, yr) > 20) { // TODO: magic number
							customEvent(e, (xr > yr
								? (x < 0 ? Swipe.Left : Swipe.Right)
								: (y < 0 ? Swipe.Up : Swipe.Down)));
						}
					};
					nm = true;
				},
				touchcancel: function (e) { nm = false }
			};

			for (var a in touch) {
				element.addEventListener(a, touch[a], false);
			}
		}

		return createSwipeEvents;
	}
);