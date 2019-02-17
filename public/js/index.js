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

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val() //message is input field
	}, function(){

	});
});

var locationButton = jQuery('#send-location');
//jQuery('#send-location').on
locationButton.on('click', function(){
	if(!navigator.geolocation){
		return alert('Geo-Location not supported by your Browser!');
	}

	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage', {
			latitude : position.coords.latitude,
			longitude : position.coords.longitude
		});
	}, function(){
		alert('Unable to Fetch Location');
	});
});



