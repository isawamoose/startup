const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
	throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const songsCollection = client.db('songwriter').collection('songs');
const usersCollection = client.db('songwriter').collection('users');

function replaceSongs(_songs, _username) {
	const data = { username: _username, songs: _songs };
	const filter = { username: _username };
	songsCollection.replaceOne(filter, data, { upsert: true });
}

async function getSongs(username) {
	query = { username: username };
	const cursor = songsCollection.find(query);
	const data = await cursor.toArray();

	return data.length ? data[0].songs : {};
}

function getUser(username) {
	return usersCollection.findOne({ username: username });
}

async function createUser(username, password) {
	// Hash the password before we insert it into the database
	const passwordHash = await bcrypt.hash(password, 10);

	const user = {
		username: username,
		password: passwordHash,
		token: uuid.v4(),
	};
	await usersCollection.insertOne(user);

	return user;
}

function getUserByToken(token) {
	return userCollection.findOne({ token: token });
}

module.exports = {
	replaceSongs,
	getSongs,
	getUser,
	createUser,
	getUserByToken,
};
