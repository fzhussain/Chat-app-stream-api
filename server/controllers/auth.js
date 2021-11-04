const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();


const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;


const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;
        const userId = crypto.randomBytes(16).toString('hex');  // random string of 16 hexadecimal digits

        const serverClient = connect(api_key, api_secret, app_id);  // server client is used to create a new user token(new user credentials)

        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt(level of encryption)
        const token = serverClient.createToken(userId);

        res.send(200).json(token, fullName, username, userId, hashedPassword, phoneNumber);  // 200 means OK. The request has succeeded.
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
        // 500 Internal Server Error server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
    }
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;  // req.body - passes the data from the frontend to the backend 
        const serverClient = connect(api_key, api_secret, app_id);  // server client is used to create a new user token(new user credentials)
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });  // we check from the database to see whether the user exists or not

        if (!users.length) return res.status(400).json({ message: 'User not found!' });
        // 400 Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error 

        // If user exists
        const success = bcrypt.compare(password, users[0].hashedPassword);
        const token = serverClient.createUserToken(users[0].id);

        if (success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
        } else {
            res.status(500).json({ message: 'Incorrect Password!' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

module.exports = { signup, login };