const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http')
const socket = require('socket.io');
const bodyParser = require('body-parser');
const SocketHandler = require('./server/SocketHandler');
const User = require('./server/User.js');

const port = 8080
const app = express();
const server = http.createServer(app)
const io = new socket.Server();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));

io.attach(server);
socketHandler = new SocketHandler(io);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './client/views/game.html'));
    // res.sendFile(path.join(__dirname, './client/views/registration.html'));
});

app.get('/game', function (req, res) {
    res.sendFile(path.join(__dirname, './client/views/game.html'));
});

app.post('/register', async (req, res) => {
    try {
        let newUser = new User(req.body);
        await newUser.SaveUser();
        res.send('User created successfully');
    } catch (error) {
        res.send(error.message);
    }
});

app.post('/login', async (req, res) => {
    user = await User.Login(req.body.login, req.body.password);

    if (user) {
        this.user = user;
        res.send("Login successfully");
        return;
    }

    res.send("error");
});

server.listen(port, () => {
    console.log('Express is listening on http://localhost:' + port)
})

