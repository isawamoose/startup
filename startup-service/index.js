const express = require('express');
const app = express();
const DB = require('./database.js');

const username = 'stephen';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));
app.use(express.json());

const apiRouter = express.Router();
app.use('/api', apiRouter);

let songs = {};
const usersOnline = ['Adam', 'John', 'Drew'];

apiRouter.get('/loadUsers', (_req, res) => {
	res.json(usersOnline);
});

apiRouter.post('/putSongs', async (req, res) => {
	const songs_ = req.body;
	songs = songs_;

	await DB.replaceSongs(songs, username);
	res.json(songs);
});

apiRouter.post('/auth/create', async (req, res) => {
	if (await getUser(req.body.username)) {
		res.status(409).send({ msg: 'Username already taken.' });
	} else {
		const pwdHash = await bcrypt.hash(req.body.password, 10);
		const user = {
			username: req.body.username,
			password: pwdHash,
			token: uuid.v4(),
		};
		collection.insertOne(user); // insert into mongodb

		setAuthCookie(res, user.token);
		res.send({ id: user._id });
	}
});

apiRouter.get('/loadSongs', async (_req, res) => {
	data = await DB.getSongs(username);
	console.log('data: ', data);
	res.json(data);
	// res.json(songs);
});

app.use((_req, res) => {
	res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
