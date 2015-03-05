var client_id;
var type;
var callback_function;

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
} 

function access() {
	alert(getCookie('access_token_imgur'));
}

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