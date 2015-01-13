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

getTime();