function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


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

function redirect_init() {
	var URL = document.URL;
	console.log(URL);
	if(URL.indexOf('access_token=') > -1) {
		var cookie = URL.split('access_token=')[1].split('&')[0];
		setCookie('access_token_imgur', cookie, 1);
	}
	else {
		console.log("Access Cookie Not Found!");
	}
	window.close();
}

redirect_init();