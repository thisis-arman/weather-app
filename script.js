
console.log('from script file')


document.getElementById('weather-btn').addEventListener('click',function(){
    const input_field = document.getElementById("weather-field");
    const location = input_field.value
    console.log(location);
    console.log("weather")

    // Define the URL from which you want to fetch data
const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=3pCvq79Ak9lVZ7PwHZeVT5MxTkGXTYgh`;

// Use the fetch function to make an HTTP GET request
fetch(url)
  .then(response => {
    // Check if the response status code indicates success (usually in the range of 200-299)
    if (!response.ok) {
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


})

const displayData =forecast=>{
    const {location,timelines} = forecast
    console.log(timelines)
    const eachDay = timelines.daily.map((day)=>day)
    console.log(eachDay)
    const town = document.getElementById('city_name');
    const humidity = document.getElementById('humidity');
    const temperature = document.getElementById('temperature');
    town.innerHTML=location.name;
    humidity.innerHTML=timelines.daily.values.humidityAvg;
    temperature.innerHTML=timelines.daily.values.temperatureAvg;
    // console.log(city);

}



/* const location= dhaka;

const data  = fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=3pCvq79Ak9lVZ7PwHZeVT5MxTkGXTYgh`)
.then() */