var socket = io();

socket.on('connect', function(){
	console.log('Connected to Server');
});

socket.on('disconnect', function(){
	console.log('Disconnected from Server');
});

/*socket.on('newEmail', function(email){ //listener; needs an emit
	console.log('New Email', email);
});*/ 

//Message
socket.on('newMessage', function(Message){//listener; needs an emit
	console.log('New Message', Message);
});
