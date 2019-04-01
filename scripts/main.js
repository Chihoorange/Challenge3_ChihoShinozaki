function getAPIdata(location) {
	getWeather(location)
	getNews(location)
	getLatLng(location)
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
		console.error('Request failed', error);
	});
}

function onWeatherSucces(response) {
	var weatherResult = document.getElementById('Weather');
	weatherResult.innerHTML = response[0].main
}

//---News---//
function getNews(location) {
	var today = new Date();
	var month = (today.getMonth() + 1);
	var day = (today.getDay());
	var year = (today.getFullYear());

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    var todayText = year + month + day

	var request = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + location + '&api-key=c3U2yqxBzsuFJYQ4xE0txbaxVyEgk0Ti&begin_date=' + todayText + '&end_date=' + todayText;

	fetch(request)
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		console.log(response);
		onNewsSucces(response.response.docs);
	})
	
	// catch error
	.catch(function (error) {
		console.error('Request failed', error);
	});
}

function onNewsSucces(response) {
	var newsResult = document.getElementById('newYorkTimes');
	newsResult.innerHTML = response[0].headline.main;

	var newsUrl = response[0].web_url;
	document.getElementById('newYorkTimes').onclick = function (){
		location.href = newsUrl;

	}
	
}

//---geo info---
function getLatLng(location){
	var request = 'http://www.mapquestapi.com/geocoding/v1/address?key=BPXh2WXihHFYqEo4S1EnMcVa2OL4qjJ1&location='+ location +'';
	fetch(request)
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		console.log(response);
		onLatLngSucces(response.results[0].locations[0].latLng);
	})
	
	// catch error
	.catch(function (error) {
		console.error('Request failed', error);
	});
}

function onLatLngSucces(response){
	var latLngResult = console.log(locations[0].location.latLng);

}

/*ここから！
1. set array to get 'latLng' from https://developer.mapquest.com/documentation/geocoding-api/address/get/
2. create function that you can get windSpeed/visibility from https://dashboard.stormglass.io/
*/

