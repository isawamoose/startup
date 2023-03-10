const inputEl = document.querySelector('#lineInput');
const titleEl = document.querySelector('#title');
const saveButton = document.querySelector('#saveBtn');
const songDisplay = document.getElementById('song');
const songs = JSON.parse(localStorage.getItem('songs')) ?? [];
const loginButton = document.querySelector('#loginBtn');
const loginName = document.querySelector('#login-name');
const login = document.querySelector('#login');

inputEl.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
	if (event.key == 'Enter') {
		insertLineOfLyrics(inputEl.value);
	}
}

class Song {
	title;
	lyrics = [];
	numLines = 0;
}

let song = new Song();

function insertLineOfLyrics(text) {
	if (text) {
		addLineToDOM(text);
		song.numLines++;
		song.lyrics.push(text);
		if (saveButton.innerText !== 'Save') {
			saveButton.innerText = 'Save';
			saveButton.classList.replace('btn-dark', 'btn-secondary');
		}
	}
}

function addLineToDOM(text) {
	const newLine = document.createElement('div');
	newLine.textContent = text;
	newLine.classList.add('line');
	newLine.style.textAlign = 'center';
	inputEl.value = '';

	songDisplay.appendChild(newLine);
}

function saveToStorage() {
	song.title = titleEl.value;

	let alreadyExists = false;
	for (let i = 0; i < songs.length; ++i) {
		if (songs[i] && songs[i].title === song.title) {
			songs[i] = song;
			alreadyExists = true;
		}
	}
	if (!alreadyExists) songs.push(song);
	localStorage.setItem('songs', JSON.stringify(songs));
	sessionStorage.setItem('songToDisplay', song);
	saveButton.innerText = 'Saved';
	saveButton.classList.replace('btn-secondary', 'btn-dark');
}

function saveSong() {
	setTimeout(() => {
		saveToStorage();
	}, 500);
	saveButton.innerText = 'Saving';
}

// if not saved, prompt for save?
function newSong() {
	saveToStorage();
	song = new Song();
	titleEl.value = 'Untitled';
	saveButton.innerText = 'Save';
	saveButton.classList.replace('btn-dark', 'btn-secondary');

	// reset
	while (songDisplay.children.length) {
		for (const child of songDisplay.children) {
			console.log(child);
			child.remove();
		}
	}
}

function displaySong() {
	// const songToDisplay =
	// 	JSON.parse(sessionStorage.getItem('songToDisplay')) ?? null;
	// if (songToDisplay) {
	// 	song = songToDisplay;
	// 	titleEl.value = song.title;
	// 	for (const line of song.lyrics) {
	// 		addLineToDOM(line);
	// 	}
	// }
}

function loginUser(name) {
	console.log(2);
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

displaySong();
displayUserAlreadyLoggedIn();
