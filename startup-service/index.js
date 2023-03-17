const express = require('express');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('songs', (req, res) => {
	res.send(songs);
});

app.use((_req, res) => {
	res.sendFile('index.html', { root: 'public' });
});
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

let songs = {};
