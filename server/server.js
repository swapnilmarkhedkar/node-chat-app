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

//io.emit connects to every single connection
//socket.emit connects to only single connection
io.on('connection', (socket)=>{
	console.log('New User Connected');

	//Chat App

	socket.on('createMessage', (newMessage)=>{
		console.log('createMessage',newMessage);

		io.emit('newMessage', {
			from : newMessage.from,
			text : newMessage.text,
			createdAt : new Date().getTime()
		});
	});

	socket.on('disconnect', ()=>{
		console.log('User Disconnected from Server');
	});
}); 

server.listen(port, ()=>{
	console.log(`Server is Up and Running on ${port}`);
});