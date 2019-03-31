function getAPIdata(location) {
	getWeather(location)
	getNews(location)
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

//---News---//
function getNews(location) {
	var request = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + location + '&api-key=c3U2yqxBzsuFJYQ4xE0txbaxVyEgk0Ti';

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
		// onAPIError();
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
