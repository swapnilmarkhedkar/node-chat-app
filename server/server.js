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

	//Intro Message
	socket.emit('newMessage',{
		from: 'Admin',
		text : 'Welcome to Chat App',
		createdAt : new Date().getTime()
	});

	socket.broadcast.emit('newMessage',{
		from: 'Admin',
		text : 'New User Joined',
		createdAt : new Date().getTime()

	})

	//Chat App
	socket.on('createMessage', (newMessage)=>{
		console.log('createMessage',newMessage);

		io.emit('newMessage', {
			from : newMessage.from,
			text : newMessage.text,
			createdAt : new Date().getTime()
		});

		//broadcast to everyone but myself

		// socket.broadcast.emit('newMessage', {
		// 	from : newMessage.from,
		// 	text : newMessage.text,
		// 	createdAt : new Date().getTime()
		// });

		
	});

	socket.on('disconnect', ()=>{
		console.log('User Disconnected from Server');
	});
}); 

server.listen(port, ()=>{
	console.log(`Server is Up and Running on ${port}`);
});