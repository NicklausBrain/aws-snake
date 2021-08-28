define(
	'snakeGame/views/ViewLoader',
	[],
	function () {

		function ViewLoader() {
			function loadFileContent(fileUrl) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', fileUrl, false);
				xhr.send();
				return xhr.responseText;
			}

			this.load = function (fileUrl) {
				var body = document.getElementsByTagName('body')[0];

				if (body.firstElementChild) {
					// TODO: 'remove' function is not supported in IE
					// TODO: use 'removeChild' for all browsers or implement 'remove' function for IE
					if (body.firstElementChild.remove) {
						body.firstElementChild.remove();
					} else {
						body.removeChild(body.firstElementChild);
					}
				}

				body.innerHTML = loadFileContent(fileUrl);
			};
		}

		return new ViewLoader();
	}
);