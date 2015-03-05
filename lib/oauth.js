var client_id;
var type;
var callback_function;

function window_callback_function(access_token) {
	
}

function login() {
	window.open("https://api.imgur.com/oauth2/authorize?" + "client_id=" + client_id + "&response_type=" + type);
}

function init(json) {
	client_id = json['client_id'];
	type = json['type'];
	callback_function = json['callback_function'];
}

init({'client_id':'123951a3074119a', 'type':'token', 'callback_function':window_callback_function});