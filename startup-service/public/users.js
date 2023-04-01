const signInMessage = document.getElementById('signInMsg');
const usersListEl = document.createElement('ul');
usersListEl.id = 'displayList';
usersListEl.classList.add('users-list');
const usersEl = document.querySelector('div.users');
const signInButtonEl = document.querySelector('#signInBtn');
count = 0;

let usersOnline = [];
let authenticated = false;

async function getUsers() {
	usersEl.appendChild(usersListEl);

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

async function signInOut() {
	if (authenticated) {
		//sign out
		authenticated = false;
		await fetch('/api/auth/logout', {
			method: 'DELETE',
		});
		signInButtonEl.textContent = 'Sign In';
		usersListEl.remove();
		signInMessage.textContent = 'Sign in to view other online users';
		usersEl.appendChild(signInMessage);
	} else {
		sessionStorage.setItem('songToDisplay', null);
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
				getUsers();
			} else {
				signInMessage.innerHTML =
					'<a href="login.html" class="login-link">Sign in</a> to view other online users';
			}
		} else {
			signInMessage.textContent = 'Sign in to view other online users';
		}
	}
}

function getUsername() {
	return localStorage.getItem('username');
}

sessionStorage.setItem('prev-page', 'users.html');
determineIfAuthenticated();
