const songs = JSON.parse(localStorage.getItem('songs')) ?? [];
const itemElArray = [];
const savedSongListEl = document.querySelector('#displayList');
count = 0;
// const songMap = new Map();

function displaySongs() {
	songs.forEach((song) => {
		const savedItem = document.createElement('div');
		savedItem.classList.add('saved-item');

		const savedSong = document.createElement('li');
		savedSong.classList.add('saved-song');
		savedSong.innerText = song.title;
		savedSong.id = 'song-' + count;
		savedSong.addEventListener('click', openSong);

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete', 'text-light');
		deleteButton.innerText = 'X';
		deleteButton.id = 'delete-' + count;
		deleteButton.addEventListener('click', deleteSong);

		savedItem.appendChild(savedSong);
		savedItem.appendChild(deleteButton);

		// songMap.set(count, song);
		// console.log(songMap);
		count++;
		itemElArray.push(savedItem);
		savedSongListEl.appendChild(savedItem);
	});
}

function openSong(event) {
	const songToSave = JSON.stringify(songMap.get(event.target.id));
	sessionStorage.setItem('songToDisplay', songToSave);
	window.location.href = 'index.html';
}

function deleteSong(event) {
	// Array indexing adjusts when you remove an element
	console.log('click');
	const idNum = event.target.id.replace(/^\D+/g, '');
	// delete songs[idNum];
	localStorage.setItem('songs', JSON.stringify(songs));

	itemElArray[idNum].remove();
}

displaySongs();
