var userName = "";

function signinCallback(authResult) {
  console.log("clicked");
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
	console.log(authResult);
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}


function mySignInCallback(userId) {

}

function getAllAlarms()
{
	console.log("start");
	Parse.initialize("J45ercO0uGT1gHwEUizxbrnxp6OGu6lzuoQYs5Ly", "gu7g4d8XbIP02Hm7CPxaAKNOZCrjPNLJ1QFIagj2");
	var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) { 
				console.log(i);
                insertAlarm(results[i].attributes.time, results[i].attributes.alarmName, results[i].id);
            }
			checkAlarms(0);
        }
	});
}

function checkAlarmTimes() {
	var d = new Date();
	var times;
	$('.time').each(
	  function() {
		hours = parseInt($(this).text().substring(0,2));
		minutes = parseInt($(this).text().substring(3,5));
		if($(this).text().substring(6,8) == "pm") {
			hours = hours + 12;
		}
		if(hours == d.getHours() && minutes == d.getMinutes() && d.getSeconds() == 0) {
			var div = $(this).closest('.flexable');
			var alarmName = $(div).find('.name').text();
			alert("Alarm " + alarmName + " has gone off!");
		}
	  }
	);
}

function showAlarmPopup()
{
	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");
}

function hideAlarmPopup()
{
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
}

function checkAlarms(inserting)
{
	var alarms;
	$('#alarms').each(
	  function() {
		alarms = (($(this).find('.name')).length);
	  }
	);
	console.log(inserting + ' ' + alarms);
	if(alarms == 0 && inserting == 1) {
		$('#alarms').html('');
	}
	else if (alarms == 0){
		$('#alarms').html('No Alarms Set!');
	}
}

function insertAlarm(time, alarmName, id)
{
	var div = $("<div id='alarm'></div>");
	div.addClass("flexable");
	var div1 = $("<div></div>");
	div1.addClass("name");
	div1.html(alarmName);
	div.append(div1);
	var div2 = $("<div></div>");
	div2.addClass("time");
	div2.html(time);
	div.append(div2);
	var button = $('<input type="button" id="' + id + '" class="deleteButton" value="Delete" onclick="removeAlarm(this)"></input>')
	div.append(button);
	$("#alarms").append(div);
}

function addAlarm()
{
	Parse.initialize("J45ercO0uGT1gHwEUizxbrnxp6OGu6lzuoQYs5Ly", "gu7g4d8XbIP02Hm7CPxaAKNOZCrjPNLJ1QFIagj2");
	hours = $("#hours option:selected").text();
	mins = $("#mins option:selected").text();
	ampm = $("#ampm option:selected").text();
	alarmName = $("#alarmName").val();
	time = hours + ":" + mins + " " + ampm;
	var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"time": time,"alarmName": alarmName}, {
      success: function(object) {
		checkAlarms(1);
		var id = object.id;
        insertAlarm(time, alarmName, id);
		hideAlarmPopup();
      }
    });
}

function removeAlarm(button)
{
	Parse.initialize("J45ercO0uGT1gHwEUizxbrnxp6OGu6lzuoQYs5Ly", "gu7g4d8XbIP02Hm7CPxaAKNOZCrjPNLJ1QFIagj2");
	var div = $(button).closest('.flexable');
	var alarmName = div.find('.name').text();
	var alarmTime = div.find('.time').text();
	var id = button.id;
	console.log(id);
	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	query.equalTo("objectId", id);
	query.find({
	success: function(results) {
		// The object was retrieved successfully.
		for(var i = 0; i < results.length; i++)
		{
			var object = results[i];
			object.destroy({});
		}
		div.remove();
		checkAlarms(0);
	},
	error: function(object, error) {
		// The object was not retrieved successfully.
		// error is a Parse.Error with an error code and description.
		console.log(object);
		console.log("error!");
		console.log(error);
	}
	});
}

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
	checkAlarmTimes();
	var t = setTimeout(function(){ getTime() }, 1000);
}

function getLocation() {
	var coords;
	if("geolocation" in navigator && navigator.cookieEnabled) {
		console.log("Geolocator avaliable");
		console.log(navigator.cookieEnabled);
		
		var options = {
			enableHighAccuracy: true,
			timeout: 3000,
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
		
		navigator.geolocation.getCurrentPosition(success, error, options);
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
	
	var options = {
		timeout: 3000,
		maximumAge: 0
	}
	
	function success(results) {
		console.log(results);
		$("#cityname").html(results[1]["formatted_address"]);
	}
	
	function error(error) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
		$("#cityname").html("Unable to locate city!");
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
		console.log(typeof(GeocodeRequest));
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
	var error = function (error) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
		$("#forecastLabel").html("Unable to gather weather data!");
		$("#forecastIcon").attr("src", "img/frown.png");
	}
	
	$.getJSON(url,success,error);
}

function onStart() {
	console.log("yolo");
	getAllAlarms();
	getTime();
	getLocation();
}

onStart();