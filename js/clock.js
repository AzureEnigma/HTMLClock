function getTime()
{
	var time = new Date();
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();
	//For the minutes and seconds, add 0 if less than 10
	if(m < 10) {
		m = "0" + m;
	}
	if(s < 10) {
		s = "0" + s;
	}
	document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
	var t = setTimeout(function(){ getTime() }, 1000);
}

function getLocation() {
	var coords;
	if("geolocation" in navigator && navigator.cookieEnabled) {
		console.log("Geolocator avaliable");
		console.log(navigator.cookieEnabled);
		
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}
		
		function success(pos) {
			console.log("got coords");
			coords = pos.coords;
			getTemp(coords);
		}
		
		
		function error(err) {
			console.warn('ERROR(' + err.code + '): ' + err.message);
			getTemp(coords);
		};
		
		navigator.geolocation.getCurrentPosition(success, error, success);
	}
	else {
		console.log("Geolocator not avaliable");
		getTemp(coords);
	}
}

function getCityName(latitude, longitude) {
	var geocoder;
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(latitude, longitude);
	
	function success(results) {
		console.log(results);
		$("#cityname").html(results[1]["formatted_address"]);
	}
	
	geocoder.geocode({'latLng':latlng}, success);
}

function determineTemperature(amount) {
	if(amount >= 90) {
		return "hot";
	}
	else if(amount >= 80) {
		return "warm";
	}
	else if(amount >= 70) {
		return "nice";
	}
	else if(amount >= 60) {
		return "chilly";
	}
	else if(amount < 60) {
		return "cold";
	}
}

function getTemp(coords) {
	var url;
	if(coords) {
		url = "https://api.forecast.io/forecast/bd4fe38b204a091c1570668611842663/" + coords.latitude + "," + coords.longitude + "?callback=?";
		console.log("coords in URL");
		getCityName(coords.latitude, coords.longitude);
	}
	else {
		url = "https://api.forecast.io/forecast/bd4fe38b204a091c1570668611842663/35.300399,-120.662362?callback=?";
		console.log("got nothing");
		getCityName(35.300399, -120.662362);
	}
	var success = function(response) {
		$("#forecastLabel").html(response["daily"]["summary"]);
		var icon = "img/" + response["daily"]["icon"] + ".png";
		$("#forecastIcon").attr("src", icon);
		var temperature = determineTemperature(response["daily"]["data"][0]["temperatureMax"]);
		$("body").addClass(temperature);
	}
	
	$.getJSON(url,success);
}

function onStart() {
	getTime();
	getLocation();
}

onStart();