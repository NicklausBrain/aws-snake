define(
	'snakeGame/views/ScoresView',
	[],
	function () {

		function ScoresView(
			scoresScreen,
			quitButton) {
			var self = this;
			var nextRecordOffset = 4;

			this.quitButtonClickHandler = null;

			quitButton.addEventListener('click', function () {
				self.quitButtonClickHandler();
			});

			function htmlToElement(html) {
				var template = document.createElement('template');
				template.innerHTML = html;
				return template.content.firstChild;
			}

			this.renderRecord = function (record) {
				var recordHtml =
					'<div id="scoresButton" class="scoreItem" style="top:' + nextRecordOffset + 'rem">' +
						'<div>' + record.score + ': ' + record.date + '</div>' +
					'</div>';
				
				nextRecordOffset += 2;

				scoresScreen.appendChild(htmlToElement(recordHtml));
			};

			this.activate = function () {

			};
		}

		return ScoresView;
	}
);