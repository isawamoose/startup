const usersListEl = document.querySelector('#displayList');
const loginButton = document.querySelector('#loginBtn');
const loginName = document.querySelector('#login-name');
const login = document.querySelector('#login');
count = 0;

let usersOnline = [];

async function getUsers() {
	console.log('Getting users');
	await fetch('/api/loadUsers')
		.then((resp) => resp.json())
		.then((data) => (usersOnline = data))
		.catch((err) => console.log(err));
	usersOnline.forEach((user) => {
		const onlineUser = document.createElement('li');
		onlineUser.classList.add('online-user');
		onlineUser.innerText = user;
		onlineUser.id = 'user' + count;

		count++;
		usersListEl.appendChild(onlineUser);
	});
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

displayUserAlreadyLoggedIn();
getUsers();
