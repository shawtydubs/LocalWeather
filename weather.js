$(document).ready(function() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  }

  function getWeather(position) { 
    var cityUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude;
    
    $.getJSON(cityUrl, function(cityJson) {
      var city = cityJson['results'][0]['address_components'][3]['short_name'];
      var state = cityJson['results'][0]['address_components'][5]['short_name'];
      $('#city').html(city + ', ' + state);
    });
    
    var weatherApi = '35d3803ee59cdbde0662e18be5eb9900';
    var weatherUrl = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&APPID=' + weatherApi;
    
    $.getJSON(weatherUrl, function(weatherJson) {
      tempF = Math.round(weatherJson['main']['temp'] * (9/5) - 459.67);
      tempC = Math.round(weatherJson['main']['temp'] - 273.15);
      $('#temperature').html(tempF + ' °F');
      
      var iconSrc = 'http://openweathermap.org/img/w/' + weatherJson['weather'][0]['icon'] + '.png'
      $('#icon').html('<img src="' + iconSrc + '">');
      
      var weather = weatherJson['weather'][0]['description'];
      $('#weather').html(weather);
    });
  }

  function convertTemp() {
    if ($('#temperature').text().match(/F/)) {
      $('#temperature').html(tempC + ' °C');
    } else {
      $('#temperature').html(tempF + ' °F');
    }
  }
});
