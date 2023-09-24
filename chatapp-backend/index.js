require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const PORT = process.env.PORT;

const connectDB = require('./database/db.config');
const AuthRoute = require('./routes/auth');
const FriendRouter = require('./routes/friend');
const UsersRouter = require('./routes/searchUsers');
const RequestRouter = require('./routes/request');
const ChatRouter = require('./routes/chat');
const MessageRouter = require('./routes/message');

app.use(express.json());
app.use(cors());

app.use('/auth', AuthRoute);
app.use('/friend', FriendRouter);
app.use('/search', UsersRouter);
app.use('/request', RequestRouter);
app.use('/chat', ChatRouter);
app.use('/message', MessageRouter);

app.get('/', (req,res) => {
    res.send('<h1>Welcome to ChatApp</h1>');
})

const server = http.createServer(app);
// const io = socketIo(server);

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     io.emit('message', 'Hello clients');

//     socket.on('message', (data) => {
//         console.log('Received message from client');
//     })


//     socket.on('disconnect', () => {
//         console.log('A user disconnected!');
//     })
// })

const runServer = async () => {
    await connectDB();
    server.listen(PORT, () => {
        console.log("SERVER RUNNING ON PORT:",PORT);
        console.log("ACCESS DOMAIN AT: http://localhost:",PORT,"/\n");
    });    
}

runServer();