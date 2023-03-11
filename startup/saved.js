const songs = JSON.parse(localStorage.getItem('songs')) ?? [];
const itemEls = {};
const savedSongListEl = document.querySelector('#displayList');

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

		savedItem.appendChild(savedSong);
		savedItem.appendChild(deleteButton);

		itemEls[song.id] = savedItem;
		savedSongListEl.appendChild(savedItem);
	}
}

function openSong(event) {
	const songToSave = JSON.stringify(songMap.get(event.target.id));
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

displaySongs();
