function getAPIdata(location) {
	getWeather(location)
	getAirQuality(location)
}


//---weather---//
function getWeather(location) {
	// construct request  !Note! you can't insert space between words so use '%20' instead! 
	var request = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=1e74be40e221476c531af434c759b20d';

// get weather forecast
	fetch(request)
// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {

		// render weatherCondition
		console.log(response.weather);
		onWeatherSucces(response.weather);
	})
	
	// catch error
	.catch(function (error) {
		// onAPIError();
		console.error('Request failed', error);
	});
}

function onWeatherSucces(response) {
	var weatherResult = document.getElementById('Weather');
	weatherResult.innerHTML = response[0].main
}

//---air quality---//
function getAirQuality(location) {
	var request = 'api.airvisual.com/v2/countries?key={{YOUR_API_KEY}}'
}
