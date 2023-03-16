const songs = JSON.parse(localStorage.getItem('songs')) ?? [];
const itemEls = {};
const savedSongListEl = document.querySelector('#displayList');
const loginButton = document.querySelector('#loginBtn');
const loginName = document.querySelector('#login-name');
const login = document.querySelector('#login');

function displaySongs() {
	for (const song of Object.values(songs)) {
		const savedItem = document.createElement('div');
		savedItem.classList.add('saved-item');

		const savedSong = document.createElement('li');
		savedSong.classList.add('saved-song');
		savedSong.innerText = song.title;
		savedSong.id = 'song-' + song.id;
		savedSong.addEventListener('click', openSong);

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete', 'text-light');
		deleteButton.innerText = 'X';
		deleteButton.id = 'delete-' + song.id;
		deleteButton.addEventListener('click', deleteSong);

		const spaceHolder = document.createElement('button');
		spaceHolder.classList.add('space-holder');

		savedItem.appendChild(savedSong);
		savedItem.appendChild(deleteButton);
		savedItem.appendChild(spaceHolder);

		itemEls[song.id] = savedItem;
		savedSongListEl.appendChild(savedItem);
	}
}

function openSong(event) {
	const id = event.target.id.replace(/^\D+/g, '');
	const songToSave = JSON.stringify(songs[id]);
	sessionStorage.setItem('songToDisplay', songToSave);
	window.location.href = 'index.html';
}

function deleteSong(event) {
	// Array indexing adjusts when you remove an element
	console.log('click');
	const id = event.target.id.replace(/^\D+/g, '');
	delete songs[id];
	console.log(songs);
	localStorage.setItem('songs', JSON.stringify(songs));

	itemEls[id].remove();
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

displaySongs();
displayUserAlreadyLoggedIn();
