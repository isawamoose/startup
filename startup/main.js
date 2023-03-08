const inputEl = document.querySelector('#lineInput');
inputEl.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
	if (event.key == 'Enter') {
		insertLineOfLyrics(inputEl.value);
	}
}

class Song {
	title;
	lyrics = [];
}

const song = new Song();

function insertLineOfLyrics(text) {
	if (text) {
		const newLine = document.createElement('div');
		newLine.textContent = text;
		newLine.classList.add('line');
		newLine.style.textAlign = 'center';
		inputEl.value = '';

		const songDisplay = document.getElementById('song');
		songDisplay.appendChild(newLine);

		song.lyrics.push(text);
	}
}

const songs = JSON.parse(localStorage.getItem('songs'));

function saveSong(song) {
	songs.add(song);
	localStorage.setItem('songs', JSON.stringify(songs));
}
