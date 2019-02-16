var socket = io();

socket.on('connect', function(){
	console.log('Connected to Server');

	//inside 'connect'
	/*socket.emit('createEmail',{
		to : 'abc@example.com',
		text : 'Petting Cats'
	});*/


	socket.emit('createMessage', {
		from : 'Tony',
		text : 'You dont Deserve the suit'
	});
});

socket.on('disconnect', function(){
	console.log('Disconnected from Server');
});

/*socket.on('newEmail', function(email){ //listener; needs an emit
	console.log('New Email', email);
});*/ 

//Message
socket.on('newMessage', function(Message){
	console.log('New Message', Message);
});
