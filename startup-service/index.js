const express = require('express');

const app = express();

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

apiRouter.post('/putSongs', (req, res) => {
	const songs_ = req.body;
	songs = songs_;
	console.log(songs);
	res.json(songs);
});

apiRouter.get('/loadSongs', (_req, res) => {
	res.json(songs);
});

app.use((_req, res) => {
	res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
