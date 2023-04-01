const backArrowEl = document.getElementById('backArrow');
const quoteEl = document.getElementById('quote');

async function getRandomQuote() {
	await fetch('https://api.quotable.io/random?maxLength=50')
		.then((resp) => resp.json())
		.then((data) => {
			quoteEl.textContent = data.content;
		})
		.catch(console.log('Failed to retrieve random quote'));
}

function loginUser() {
	loginOrCreate('/api/auth/login');
}

async function createUser() {
	loginOrCreate('/api/auth/create');
}

async function loginOrCreate(endpoint) {
	const errorMsgEl = document.getElementById('signInErrorMessage');
	const usernameEl = document.getElementById('usernameInput');
	const passwordEl = document.getElementById('passwordInput');
	const username = usernameEl?.value;
	const password = passwordEl?.value;

	errorMsgEl.textContent = '';

	if (username && password) {
		const response = await fetch(endpoint, {
			method: 'post',
			body: JSON.stringify({
				username: username,
				password: password,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		const body = await response.json();

		if (response?.status === 200) {
			localStorage.setItem('username', username);
			const prevPage = sessionStorage.getItem('prev-page');
			window.location.href = prevPage;
		} else {
			if (response?.status === 409) {
				usernameEl.value = '';
				usernameEl.focus();
			}
			errorMsgEl.textContent = body.msg;
		}
	} else {
		errorMsgEl.textContent = 'Please fill out all fields';

		if (!username) {
			usernameEl.focus();
		} else if (!password) {
			passwordEl.focus();
		}
	}
}

function getPrevPage() {
	return sessionStorage.getItem('prev-page') ?? 'index.html';
}

backArrowEl.href = getPrevPage();
getRandomQuote();
