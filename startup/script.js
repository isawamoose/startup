let inputEl;
const maxLines = 10;
let numLines = 0;

document.addEventListener('DOMContentLoaded', function () {
	// Code here waits to run until the DOM is loaded.
	inputEl = document.querySelector('#lineInput');
	inputEl.addEventListener('keydown', handleKeydown);
});

function handleKeydown(event) {
	if (event.key == 'Enter') {
		insertLineOfLyrics(inputEl.value);
	}
}

function insertLineOfLyrics(text) {
	if (text && numLines <= maxLines) {
		const newLine = document.createElement('div');
		newLine.textContent = text;
		newLine.classList.add('line');

		const songDisplay = document.getElementById('song');
		songDisplay.appendChild(newLine);
		numLines++;
	}
}
