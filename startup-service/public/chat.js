const signInButtonEl = document.querySelector('#signInBtn');
const messageEl = document.createElement('h2');
const chatContainerEl = document.querySelector('div.chatContainer');
const chatMessageListEl = document.createElement('div');
chatMessageListEl.classList.add('chat');
// chatMessageListEl.classList.add('item-list');
const chatInputEl = document.createElement('input');
chatInputEl.classList.add('form-control');
chatInputEl.id = 'chatInput';
chatInputEl.placeholder = 'Write a message...';

let authenticated = false;
let socket;

function displaySignedOutMessage() {
	messageEl.innerHTML =
		'<a href="login.html" class="green-link">Sign in</a> to discuss song ideas';
	chatContainerEl.appendChild(messageEl);
}

function configureWebSocket() {
	const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
	socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
	socket.onopen = () => {
		chatContainerEl.appendChild(chatMessageListEl);
		chatContainerEl.appendChild(chatInputEl);
		chatInputEl.addEventListener('keydown', (event) => {
			if (event.key == 'Enter' && chatInputEl.value) {
				sendChatMessage(chatInputEl.value);
			}
		});
	};
	socket.onmessage = async (event) => {
		const msg = JSON.parse(await event.data.text());
		console.log('message: ', msg);
		displayChatMessage(msg);
	};
}

function displayChatMessage(msg) {
	const newLine = document.createElement('div');
	newLine.textContent = `${msg.username}: ${msg.text}`;
	newLine.classList.add('message');
	chatMessageListEl.appendChild(newLine);
}

async function sendChatMessage(messageText) {
	try {
		const resp = await fetch('api/chat/message', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				username: getUsername(),
				text: messageText,
			}),
		});
		const data = await resp.json();

		socket.send(data);
		displayChatMessage({ username: 'me', text: data.text });
	} catch (err) {
		console.log(err);
	}

	chatInputEl.value = '';
}

async function getLastMessages() {
	let messages;
	await fetch('api/chat/10')
		.then((resp) => resp.json())
		.then((data) => {
			messages = data;
		})
		.catch(console.log('Failed to retrieve last 10 messages'));
	for (const message of messages) {
		displayChatMessage(message);
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
				messageEl.remove();
				getLastMessages();
				configureWebSocket();
			} else {
				displaySignedOutMessage();
			}
		} else {
			displaySignedOutMessage();
		}
	}
}

async function signInOut() {
	if (authenticated) {
		//sign out
		authenticated = false;
		await fetch('/api/auth/logout', {
			method: 'DELETE',
		});
		signInButtonEl.textContent = 'Sign In';
		chatMessageListEl.remove();
		chatInputEl.remove();
		displaySignedOutMessage();
	} else {
		window.location.href = 'login.html';
	}
}

function getUsername() {
	return localStorage.getItem('username');
}

sessionStorage.setItem('prev-page', 'chat.html');
determineIfAuthenticated();
