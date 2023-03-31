const express = require('express');
const app = express();
const DB = require('./database.js');
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookies());

const apiRouter = express.Router();
app.use('/api', apiRouter);

const usersOnline = ['Adam', 'John', 'Drew'];

apiRouter.post('/auth/create', async (req, res) => {
	if (await DB.getUser(req.body.username)) {
		res.status(409).send({ msg: 'Username already taken' });
	} else {
		const user = await DB.createUser(req.body.username, req.body.password);

		setAuthCookie(res, user.token);

		res.send({
			id: user._id,
		});
	}
});

apiRouter.post('/auth/login', async (req, res) => {
	const user = await DB.getUser(req.body.username);
	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			setAuthCookie(res, user.token);
			res.send({ id: user._id });
			return;
		}
	}
	res.status(401).send({ msg: 'Incorrect username or password' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
	console.log('logging out');
	res.clearCookie(authCookieName);
	res.status(204).end();
});

apiRouter.get('/user/:username', async (req, res) => {
	const user = await DB.getUser(req.params.username);
	if (user) {
		const token = req?.cookies.token;
		res.send({
			username: user.username,
			authenticated: token === user.token,
		});
		return;
	}
	res.status(404).send({ msg: 'Unknown' });
});

// var secureApiRouter = express.Router();
// apiRouter.use(secureApiRouter);

// secureApiRouter.use(async (req, res, next) => {
// 	const authToken = req.cookies[authCookieName];
// 	const user = await DB.getUserByToken(authToken);
// 	if (user) {
// 		next();
// 	} else {
// 		res.status(401).send({ msg: 'Unauthorized' });
// 	}
// });

apiRouter.get('/loadSongs/:username', async (req, res) => {
	const username = req.params.username;
	console.log(username);
	data = await DB.getSongs(username);
	res.json(data);
});

apiRouter.get('/loadUsers', (_req, res) => {
	res.json(usersOnline);
});

apiRouter.post('/putSongs', async (req, res) => {
	const songs = req.body.songs;
	const username = req.body.username;

	await DB.replaceSongs(songs, username);
	res.json(songs);
});

app.use((_req, res) => {
	res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
	res.cookie(authCookieName, authToken, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
	});
}

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
