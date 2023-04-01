const inputEl = document.querySelector('#lineInput');
const titleEl = document.querySelector('#title');
const saveButtonEl = document.querySelector('#saveBtn');
const songDisplayEl = document.getElementById('song');
const signInButtonEl = document.querySelector('#signInBtn');
const lyricEls = {};

let authenticated = false;

class Song {
	id;
	title;
	lyrics = {};
}

let song = new Song();
let songs = {};

inputEl.addEventListener('keydown', handleKeydown);
function handleKeydown(event) {
	if (event.key == 'Enter') {
		insertLineOfLyrics(inputEl.value);
	}
}

document.addEventListener('click', saveTitle);
function saveTitle(event) {
	if (event.target != titleEl) {
		song.title = titleEl.value;
	}
}

function insertLineOfLyrics(text) {
	if (text) {
		// Get next id
		const lyricsKeys = Object.keys(song.lyrics);
		const id = lyricsKeys[lyricsKeys.length - 1]
			? Number(lyricsKeys[lyricsKeys.length - 1]) + 1
			: 1;
		song.lyrics[id] = text;

		addLineToDOM(text, id);

		if (saveButtonEl.innerText === 'Saved') {
			saveButtonEl.innerText = 'Save';
			saveButtonEl.classList.replace('btn-dark', 'btn-secondary');
		}
		console.log(song);
		localStorage.setItem('songToDisplay', JSON.stringify(song));
	}
}

function addLineToDOM(text, id) {
	const newLine = document.createElement('div');
	newLine.textContent = text;
	newLine.classList.add('line');
	newLine.id = id;
	newLine.style.textAlign = 'center';
	newLine.addEventListener('click', removeLyricLine);
	// newLine.addEventListener('click', editLyricLine);

	songDisplayEl.appendChild(newLine);
	lyricEls[id] = newLine;
	inputEl.value = '';
}

function removeLyricLine(event) {
	const id = event.target.id;
	delete song.lyrics[id];
	lyricEls[id].remove();

	if (saveButtonEl.innerText !== 'Save') {
		saveButtonEl.innerText = 'Save';
		saveButtonEl.classList.replace('btn-dark', 'btn-secondary');
	}
}

// function editLyricLine(event) {
// 	const id = event.target.id;
// 	inputEl.value = song.lyrics[id];
// }

async function saveToStorage() {
	song.title = titleEl.value;

	// Get next id
	const songKeys = Object.keys(songs);
	song.id = songKeys[songKeys.length - 1]
		? Number(songKeys[songKeys.length - 1]) + 1
		: 1;

	for (const s of Object.values(songs)) {
		if (s.title === song.title) {
			song.id = s.id;
		}
	}

	songs[song.id] = song;
	try {
		const resp = await fetch('/api/putSongs', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				username: getUsername(),
				songs: songs,
			}),
		});
		const data = await resp.json();
		songs = data;
	} catch (err) {
		console.log(err);
	}

	localStorage.setItem('songToDisplay', song);
}

function saveSong() {
	if (titleEl.value === '') {
		titleEl.focus();
	} else {
		setTimeout(() => {
			saveToStorage();
			saveButtonEl.innerText = 'Saved';
			saveButtonEl.classList.replace('btn-secondary', 'btn-dark');
		}, 500);
		saveButtonEl.innerText = 'Saving';
	}
}

function newSong() {
	if (authenticated && song.lyrics.length) {
		saveToStorage();
		saveButtonEl.innerText = 'Save';
	}

	song = new Song();

	clearSongDisplay();
}

function clearSongDisplay() {
	titleEl.value = '';
	saveButtonEl.classList.replace('btn-dark', 'btn-secondary');
	while (songDisplayEl.children.length) {
		for (const child of songDisplayEl.children) {
			child.remove();
		}
	}
	localStorage.setItem('songToDisplay', null);
}

function displaySong() {
	const songToDisplay =
		JSON.parse(localStorage.getItem('songToDisplay')) ?? null;
	if (songToDisplay) {
		song = songToDisplay;
		titleEl.value = song.title;
		for (const line of Object.entries(song.lyrics)) {
			addLineToDOM(line[1], line[0]);
		}
	}
}

function getUsername() {
	return localStorage.getItem('username');
}

async function getSongs() {
	await fetch(`/api/loadSongs/${getUsername()}`)
		.then((resp) => resp.json())
		.then((data) => (songs = data))
		.catch((err) => console.log(err));
}

async function signInOut() {
	if (authenticated) {
		//sign out
		authenticated = false;
		await fetch('/api/auth/logout', {
			method: 'DELETE',
		});

		saveButtonEl.textContent = 'Sign in to save';
		saveButtonEl.setAttribute('disabled', true);

		clearSongDisplay();

		signInButtonEl.textContent = 'Sign In';
	} else {
		sessionStorage.setItem('prev-page', 'index.html');
		window.location.href = 'login.html';
	}
}

async function determineIfAuthenticated() {
	const username = localStorage.getItem('username');
	if (username) {
		const response = await fetch(`/api/user/${username}`);
		if (response.status === 200) {
			const body = await response.json();
			if (body.authenticated) {
				authenticated = true;
				console.log('authenticated: ', username);
				saveButtonEl.textContent = 'Save';
				saveButtonEl.removeAttribute('disabled');
				signInButtonEl.textContent = 'Sign Out';
				getSongs();
			}
		}
	}
}

determineIfAuthenticated();
displaySong();
inputEl.focus();
