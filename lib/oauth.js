var client_id;
var type;
var callback_function;


function login() {
	window.open("https://api.imgur.com/oauth2/authorize?" + "client_id=" + client_id + "&response_type=" + type);
}

function init(json) {
	client_id = json['client_id'];
	type = json['type'];
	callback_function = json['callback_function'];
}