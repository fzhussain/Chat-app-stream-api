const express = require('express');
const cors = require('cors');
require('dotenv').config();

// const authRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors());
app.use(express.json());  // allows us to communicate with frontend and backend
app.use(express.urlencoded({ extended: true }))

app.use('/', (req, res) => {
    res.send('Hello There!');
});

app.use('/auth', require("./routes/auth"));

app.listen(PORT, () => console.log(`Server running on port-${PORT}`));

/*
NOTE->
1. bcrypt - Bcrypt is a popular and trusted method for salt and hashing passwords
2. crypto - Crypto is a module in Node. js which deals with an algorithm that performs data encryption and decryption. This is used for security purpose like user authentication where storing the password in Database in the encrypted form.
3. dotenv - DotEnv is a lightweight npm package that automatically loads environment variables from a .env file into the process .env object.
4. express - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
5. nodemon - It reloads the application whenever we change the code
6. twilio - for sending sms
7. cors -
CORS stands for Cross-Origin Resource Sharing. It allows us to relax the security applied to an API. This is done by bypassing the Access-Control-Allow-Origin headers, which specify which origins can access the API.
In other words, CORS is a browser security feature that restricts cross-origin HTTP requests with other servers and specifies which domains access your resources.
*/

/*
What is Middleware? It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.

When talking about express.json() and express.urlencoded() think specifically about POST requests (i.e. the .post request object) and PUT Requests (i.e. the .put request object)

You DO NOT NEED express.json() and express.urlencoded() for GET Requests or DELETE Requests.

You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.

a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());

b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
*/