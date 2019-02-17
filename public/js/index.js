var socket = io();

socket.on('connect', function(){
	console.log('Connected to Server');
});

socket.on('disconnect', function(){
	console.log('Disconnected from Server');
});

//Message
socket.on('newMessage', function(Message){//listener; needs an emit
	console.log('New Message', Message);
	var li = jQuery('<li></li>');
	li.text(`${Message.from} : ${Message.text}`);

	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My Current location</a>');
	//target is non dynamic	
	//creates new tab instead of redirecting
	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	var messageTextbox= jQuery('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val() //message is input field
	}, function(){
		messageTextbox.val('')//Cleared after sending
	});
});

var locationButton = jQuery('#send-location');
//jQuery('#send-location').on
locationButton.on('click', function(){
	if(!navigator.geolocation){
		return alert('Geo-Location not supported by your Browser!');
	}

	locationButton.attr('disabled', 'disabled').text('Sending Location...');

	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage', {
			latitude : position.coords.latitude,
			longitude : position.coords.longitude
		});
	}, function(){
		locationButton.removeAttr('disabled').text('Send Location');
		alert('Unable to Fetch Location');
	});
});



