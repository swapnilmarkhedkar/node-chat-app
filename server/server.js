const path = require('path');
const http = require('http');
const express= require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app=express();
var server = http.createServer((app));
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
	console.log('New User Connected');

	/*socket.emit('newEmail', { //object
		from : 'swapnil@example.com',
		text : 'Supppp',
		createdAt: 123	
	});

	socket.on('createEmail', (newEmail)=>{
		console.log('createEmail',newEmail);
	});*/

	//Chat App
	socket.emit('newMessage', {
		from: 'Peter',
		text : 'Its Pizza Time',
		createdAt : 123
	});

	socket.on('createMessage', (newMessage)=>{
		console.log('createMessage',newMessage);
	});

	socket.on('disconnect', ()=>{
		console.log('User Disconnected from Server');
	});
}); 

server.listen(port, ()=>{
	console.log(`Server is Up and Running on ${port}`);
});