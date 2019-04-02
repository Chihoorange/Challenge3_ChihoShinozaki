function getAPIdata(location) {
	getWeather(location)
	getNews(location)
	// getLatLng(location)
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

	var pictureObject = document.getElementById('weatherSymbol');
	var newPicture = 'images/clear.png';

	if (response[0].main == 'Clouds') {
		newPicture = 'images/cloudy.png';
	} else if (response[0].main == 'Rain') {
		newPicture = 'images/rain.png';
	} else if (response[0].main == 'Thunder') {
		newPicture = 'images/thunder.png';
	} else if (response[0].main == 'Foggy') {
		newPicture = 'images/foggy.png';
	} else if (response[0].main == 'Mist') {
		newPicture = 'images/mist.png'
	}

	pictureObject.src = newPicture;
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

function onNewsFail(error){
	var newsResult = document.getElementById('newYorkTimes');
	newsResult.innerHTML = 'No related news';
}

// //---geo info---
// function getLatLng(location){
// 	var request = 'http://www.mapquestapi.com/geocoding/v1/address?key=BPXh2WXihHFYqEo4S1EnMcVa2OL4qjJ1&location='+ location +'';
	
// 	fetch(request)
// 	.then(function(response) {
// 		if(!response.ok) throw Error(response.statusText);
// 		return response.json();
// 	})
	
// 	.then(function(response) {
// 		onLatLngSucces(response.results[0].locations[0].latLng);
// 		console.log(response);
// 	})
	
// 	// catch error
// 	.catch(function (error) {
// 		console.error('Request failed', error);
// 	});
// }

// function onLatLngSucces(latLng){
// 	getWindSpeed(latLng.lat, latLng.lng);
// 	// console.log(latLng);
// }


// //---apply the latlng to Wind Speed---//
// function getWindSpeed(lat, lng) {
// var request = "https://api.stormglass.io/point?lat=" + lat + "&lng=" + lng + "&params=waveHeight,windSpeed";

// fetch(request, {
//   headers: {
//     'Authorization': 'a76f40f8-53f8-11e9-869f-0242ac130004-a76f41e8-53f8-11e9-869f-0242ac130004'
//   }
// })
// 	.then(function(response) {
// 		if(!response.ok) throw Error(response.statusText);
// 		return response.json();
// 	})
	
// 	.then(function(response) {
// 		onWindSpeedSuccess(response);
// 		console.log(response);
// 	})
	
// 	// catch error
// 	.catch(function (error) {
// 		console.error('Request failed', error);
// 	});
// }

// function onWindSpeedSuccess(response) {
// 	var windSpeedResult = document.getElementById('windSpeed');
// 	windSpeedResult.innerHTML = Math.floor(response.hours[0].windSpeed[1].value)*1.94;
// }
