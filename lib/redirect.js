function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function redirect_init() {
	var URL = document.URL;
	if(URL.contains('access_token=')) {
		var cookie = URL.split('access_token=')[1].split('&')[0];
		alert(cookie);
	}
	else {
		console.alert("Access Cookite Not Found!");
	}
}

redirect_init();