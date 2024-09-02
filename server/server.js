import { createServer } from 'http';
import url from 'url';
import { WebSocketServer,WebSocket } from 'ws';

const server = createServer();
const wss = new WebSocketServer({server});
wss.on("connection",(ws,req)=>{
    const location = url.parse(req.url,true);
    const userId = location.query.userId;
    const timestamp = new Date().toLocaleString('en-US',{hour12:false});
    wss.clients.forEach(client=>{
        if(client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                message:`${userId} has connected to chat app`,
                userId:'Admin',
                timestamp
            }));
        }
    });
    ws.on("message",(messageStr)=>{
        const messageDetails = JSON.parse(messageStr);
        const {userId,message} = messageDetails;
        const timestamp = new Date().toLocaleString('en-US',{hour12:false});
        wss.clients.forEach(client=>{
            if(client!==ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    message,
                    userId,
                    timestamp
                }));
            }
        });


    });
    ws.on("close",(wss)=>{
        console.log('connection is closed');
    });
})


const io = new Server(server, { cors: { origin: 'http://localhost:5173' } });
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    io.emit('message',{message:`${userId} joined the chat`,userId:'Admin',timestamp:new Date().toLocaleString('en-US',{hour12:false})});
    socket.on('message', (msg) => {
        console.log('on message',msg);
        const {message,user} = msg;
        const currDateInUserFormat = new Date().toLocaleString('en-US',{hour12:false});
        io.emit('message',{message,user,timestamp:currDateInUserFormat});
    });

});

server.listen(8001,()=>{
    console.log('Server started on port 8001');
});