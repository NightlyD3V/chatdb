//HEROKU
const PORT = process.env.PORT || 8080
//CONECTED CLIENTS
let clients = [];
let history = [];
//EXPRESS SERVER
const app = require('express')();
// const expressServer = express();
//CREATE HTTP SERVER
const server = require('http').Server(app);
//CREATE SOCKET.IO SERVER
const io = require('socket.io')(server);
server.listen(PORT, () => {
    console.log(`***Socket server is running on ${PORT}***`)
})

app.get('/', (req, res) => {
    res.send(`<h1>Socket.io Server</h1>`)
})

//WEBSOCKET SERVER
// const server = http.createServer((req, res) => {
//     console.log('we have recieved a request');
// })
//DEFAULT HTTP SERVER
// expressServer.listen(5000, () => {
//     console.log('Express server is running on 5000');
// })
// expressServer.get('/', (req, res) => {
//     res.send('<h1>Welcome to the server!</h1>')
// });
//SOCKET.IO SERVER
io.on('connect', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        socket.removeAllListeners('send message');
        socket.removeAllListeners('disconnect');
        io.removeAllListeners('connection');
        console.log('user disconnected')
    })
    socket.on('client connected', () => {
        io.emit('client connected', io.engine.clientsCount)
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
        console.log(`Message received: ${msg}`);
    })
});
// //WEBSOCKET IMPORT
// const WebSocketServer = require('websocket').server;
// let connection = null;
// //WEBSOCKET SERVER 8080
// server.listen(8080, () => {
//     console.log('websocket server is running on 8080');
// });
// //MAKE NEW WEBSOCKET
// const websocket = new WebSocketServer({
//     "httpServer": server
// });
// websocket.on('request', (request) => {
//     connection = request.accept(null, request.origin);
//     //Log connected users 
//     clients.push(connection);
//     //console.log(clients);
//     connection.on('open', () => {
//         console.log('Connection opened!');
//         clients.map((client) => {
//            history.map((messages) => {
//                client.send(messages.text);
//            });
//         });
//     });
//     connection.on('close', () => console.log('Connection closed!'));
//     connection.on('message', message => {
//         console.log(`Received message ${message.utf8Data}`);
//         //Create msg object and store on history
//         let obj = {
//             time: (new Date()).getTime(),
//             text: message.utf8Data
//         }
//         history.push(obj);
//         history = history.slice(-100);
//         //console.log("history", history);
//         //Send message to users
//         let json = JSON.stringify({ type:'message', data: obj });
//         clients.map((clients) => {
//             clients.send(json);
//         });
//     });
// });

// wsServer = new WebSocketServer({
//     httpServer: server,
//     autoAcceptConnections: false
// });

// function originIsAllowed(origin) {
//     return true;
// }

// wsServer.on('request', (request) => {
//     if(!originIsAllowed(request.origin)) {
//         request.reject();
//         console.log(`${new Date()} + Connextion from orgin + ${request.origin}`);
//         return; 
//     }

//     const connection = request.accept('echo-protocol', request.origin);
//     console.log(`${new Date()} Connection accepted!`)
//     connection.on('message', (message) => {
//         if (message.type === 'utf8') {
//             console.log(`Received Message: ${message.utf8Data}`);
//             connection.sendUTF(message.utf8Data);
//         }
//         else if (message.type === 'binary') {
//             console.log(`Recieved Binary Message of ${message.binaryData.length} bytes`);_
//             connection.sendUTF(message.utf8Data);
//         }
//     });
//     connection.on('close', (reasonCode, description) => {
//         console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected!`);
//     })
// });