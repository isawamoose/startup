const inputEl = document.querySelector('#lineInput');
const titleEl = document.querySelector('#title');
const saveButton = document.querySelector('#saveBtn');
const songDisplay = document.getElementById('song');
const loginButton = document.querySelector('#loginBtn');
const loginName = document.querySelector('#login-name');
const login = document.querySelector('#login');

inputEl.addEventListener('keydown', handleKeydown);

class Song {
	id;
	title;
	lyrics = {};
}

let song = new Song();
let songs = {};

function handleKeydown(event) {
	if (event.key == 'Enter') {
		insertLineOfLyrics(inputEl.value);
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

		if (saveButton.innerText !== 'Save') {
			saveButton.innerText = 'Save';
			saveButton.classList.replace('btn-dark', 'btn-secondary');
		}

		sessionStorage.setItem('songToDisplay', song);
	}
}

function addLineToDOM(text, id) {
	const newLine = document.createElement('div');
	newLine.textContent = text;
	newLine.classList.add('line');
	newLine.id = id;
	newLine.style.textAlign = 'center';
	newLine.addEventListener('click', removeLyricLine);

	songDisplay.appendChild(newLine);
	inputEl.value = '';
}

function removeLyricLine(event) {
	const id = event.target.id;
	delete song.lyrics[id];
	event.target.remove();

	if (saveButton.innerText !== 'Save') {
		saveButton.innerText = 'Save';
		saveButton.classList.replace('btn-dark', 'btn-secondary');
	}
}

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
			body: JSON.stringify(songs),
		});
		const data = await resp.json();
		songs = data;
	} catch (err) {
		console.log(err);
	}

	sessionStorage.setItem('songToDisplay', song);
}

function saveSong() {
	setTimeout(() => {
		saveToStorage();
		saveButton.innerText = 'Saved';
		saveButton.classList.replace('btn-secondary', 'btn-dark');
	}, 500);
	saveButton.innerText = 'Saving';
}

function newSong() {
	if (song.lyrics.length) {
		saveToStorage();
	}
	song = new Song();
	titleEl.value = 'Untitled';
	saveButton.innerText = 'Save';
	saveButton.classList.replace('btn-dark', 'btn-secondary');

	// reset
	while (songDisplay.children.length) {
		for (const child of songDisplay.children) {
			child.remove();
		}
	}

	sessionStorage.setItem('songToDisplay', null);
}

function displaySong() {
	const songToDisplay =
		JSON.parse(sessionStorage.getItem('songToDisplay')) ?? null;
	if (songToDisplay) {
		song = songToDisplay;
		titleEl.value = song.title;
		for (const line of Object.entries(song.lyrics)) {
			addLineToDOM(line[1], line[0]);
		}
	}
}

function loginUser(name) {
	let username;

	if (name) {
		username = name;
	} else if (loginName.value) {
		username = loginName.value;
	}
	if (username) {
		sessionStorage.setItem('username', username);
		loginName.remove();
		loginButton.remove();

		const nameDisplay = document.createElement('div');
		nameDisplay.innerText = username;
		nameDisplay.classList.add('text-light');
		nameDisplay.id = 'nameDisplay';
		login.appendChild(nameDisplay);

		loginButton.innerText = 'Logout';
		loginButton.onclick = logoutUser;
		login.appendChild(loginButton);
	}
}

function displayUserAlreadyLoggedIn() {
	const username = sessionStorage.getItem('username');
	if (username) {
		loginUser(username);
	}
}

function logoutUser() {
	sessionStorage.removeItem('username');
	const nameDisplay = document.querySelector('#nameDisplay');
	nameDisplay.remove();
	loginButton.remove();

	loginName.value = '';
	login.appendChild(loginName);
	loginButton.innerText = 'Login';
	loginButton.onclick = loginUser;
	login.appendChild(loginButton);
}

async function getSongs() {
	await fetch('/api/loadSongs')
		.then((resp) => resp.json())
		.then((data) => (songs = data))
		.catch((err) => console.log(err));
}

function openSignInPage() {
	window.location.href = 'login.html';
}

getSongs();
displaySong();
displayUserAlreadyLoggedIn();
