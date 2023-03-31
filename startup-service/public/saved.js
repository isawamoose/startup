let songs = {};
const itemEls = {};
const signInMessage = document.getElementById('signInMsg');
const signInButtonEl = document.querySelector('#signInBtn');
const savedSongListEl = document.createElement('ul');
savedSongListEl.id = 'displayList';
const songsEl = document.querySelector('div.songs');

let authenticated = false;

async function getSongs() {
	try {
		const resp = await fetch(`/api/loadSongs/${getUsername()}`);
		const data = await resp.json();
		songs = data;
	} catch (err) {
		console.log(err);
	}
	displaySongs();
}

function displaySongs() {
	songsEl.appendChild(savedSongListEl);

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
		spaceHolder.innerText = 'X';

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
	localStorage.setItem('songToDisplay', songToSave);
	window.location.href = 'index.html';
}

async function deleteSong(event) {
	// Array indexing adjusts when you remove an element
	const id = event.target.id.replace(/^\D+/g, '');

	const songToDisplay = JSON.parse(localStorage.getItem('songToDisplay'));

	if (songToDisplay && songToDisplay.title === songs[id].title) {
		localStorage.setItem('songToDisplay', null);
	}

	delete songs[id];

	await fetch('/api/putSongs', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(songs),
	}).catch((err) => console.log(err));

	itemEls[id].remove();
}

async function signInOut() {
	if (authenticated) {
		//sign out
		authenticated = false;
		await fetch('/api/auth/logout', {
			method: 'DELETE',
		});
		signInButtonEl.textContent = 'Sign In';
		savedSongListEl.remove();
		signInMessage.textContent = 'Sign in to view saved songs';
		songsEl.appendChild(signInMessage);
	} else {
		sessionStorage.setItem('prev-page', 'saved.html');
		window.location.href = 'login.html';
	}
}

async function determineIfAuthenticated() {
	const username = getUsername();
	if (username) {
		console.log(username);
		const response = await fetch(`/api/user/${username}`);
		if (response.status === 200) {
			const body = await response.json();
			if (body.authenticated) {
				authenticated = true;
				signInButtonEl.textContent = 'Sign Out';
				signInMessage.remove();
				getSongs();
			} else {
				signInMessage.textContent = 'Sign in to view saved songs';
			}
		} else {
			signInMessage.textContent = 'Sign in to view saved songs';
		}
	}
}

function getUsername() {
	return localStorage.getItem('username');
}

determineIfAuthenticated();
