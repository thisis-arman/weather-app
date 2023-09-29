
console.log('from script file')
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
   reverseGeocode(latitude, longitude)
    
    

  }, function(error) {
    
    console.error("Error getting location:", error);
  });
}

function reverseGeocode(latitude, longitude) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const locationName = data.display_name;
      fetchAPI(locationName);
    })
    .catch(error => {
      console.error("Error fetching location data:", error);
    });
}

document.getElementById('weather-btn').addEventListener('click',function(){
    const input_field = document.getElementById("weather-field");
    const location = input_field.value
    fetchAPI(location);
    console.log("weather")

  

})

const fetchAPI =(location)=>{
      // Define the URL from which you want to fetch data
const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=3pCvq79Ak9lVZ7PwHZeVT5MxTkGXTYgh`;

// Use the fetch function to make an HTTP GET request
fetch(url)
  .then(response => {
    // Check if the response status code indicates success (usually in the range of 200-299)
    if (!response.ok) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML= 'Something went wrong . Make sure you entered a valid location'
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Use the fetched data
    displayData(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });

    
}

const displayData =forecast=>{
    const {location,timelines} = forecast
    console.log(timelines)
    const eachDay = timelines.daily.map((day)=>day.values)
    console.log(eachDay)
    const values = eachDay.map((value) => value)
    console.log(values)
    const town = document.getElementById('city_name');
    const humidity = document.getElementById('humidity');
    const temperature = document.getElementById('temperature');
    const onlyCityName = location.name.split(',')
    console.log(onlyCityName)
    town.innerHTML=onlyCityName[0];
    humidity.innerHTML=values[0].humidityAvg;
    temperature.innerHTML=values[0].temperatureAvg;
    // console.log(city);

}



/* const location= dhaka;

const data  = fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=3pCvq79Ak9lVZ7PwHZeVT5MxTkGXTYgh`)
.then() */