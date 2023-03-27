const { MongoClient } = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
	throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('songwriter').collection('songs');

function replaceSongs(_songs, _username) {
	const data = { username: _username, songs: _songs };
	const filter = { username: _username };
	userCollection.replaceOne(filter, data, { upsert: true });
}

async function getSongs(_username) {
	query = { username: _username };
	console.log(query);
	const cursor = userCollection.find(query);
	const data = await cursor.toArray();

	return data.length ? data[0].songs : {};
}

module.exports = { replaceSongs, getSongs };
