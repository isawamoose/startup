const inputEl = document.querySelector('#lineInput');
inputEl.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
	if (event.key == 'Enter') {
		insertLineOfLyrics(inputEl.value);
	}
}

function insertLineOfLyrics(text) {
	if (text) {
		const newLine = document.createElement('div');
		newLine.textContent = text;
		newLine.classList.add('line');
		newLine.style.textAlign = 'center';
		inputEl.value = '';

		const songDisplay = document.getElementById('song');
		songDisplay.appendChild(newLine);
		numLines++;
	}
}

// Each name should be a link that opens up some interactive window
const usersOnline = ['Adam', 'John', 'Drew'];

function displayUsersOnline() {
	const nameList = document.querySelector('#nameList');
	for (const name of usersOnline) {
		const nameEl = document.createElement('li');
		// tbc...
	}
}

// Each song will have two arrays (lyrics and chords) and the full songs will be stored, not just the titles.
const songs = ['Leftover Pizza', 'John is a great guy', 'Home on the Strange'];
