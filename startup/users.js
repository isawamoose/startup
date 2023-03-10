// Online users will come from web sockets
const usersOnline = ['Adam', 'John', 'Drew'];
const usersListEl = document.querySelector('#displayList');
count = 0;

usersOnline.forEach((user) => {
	const onlineUser = document.createElement('li');
	onlineUser.classList.add('online-user');
	onlineUser.innerText = user;
	onlineUser.id = 'user' + count;

	count++;
	usersListEl.appendChild(onlineUser);
});
