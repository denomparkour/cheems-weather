const api_key = "26247d7e89e942e52097ea38c373bfc3"
const myLocation = document.getElementById('location-text')
const findButton = document.getElementById('find')
const info_card = document.getElementById('information-card')
const weather_image = document.getElementById('weather-image')

// Fetch data from api 
const data = async () => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${myLocation.value},IN&appid=${api_key}&units=metric`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

// Fetch info from data function
findButton.onclick = () => {
	finalResponse = data().then(response => {
		if (response.cod == '404') {
			info_card.innerHTML = `<h4>Either spelling mistake or city not found in India</h4>`
		} else {
			console.log(response)
			const wheather = response.weather[0].main;
			const array = ['clouds','Rain','sunny'];
			if(array.includes(wheather)){	
				weather_image.innerHTML = `<img id="weather-icon" src="./images/${wheather}.png">`
			}
			else{
				weather_image.innerHTML = `<img id="weather-icon" src="./images/general.png">`
			}
			info_card.innerHTML = `<h2 id="city-name"><u>${response.name}</u></h2>
			<p> Weather : <b>${response.weather[0].description}</b></p>
			<p> Temperature : <b>${response.main.temp}</b> °C</p>
			<p> Humidity :  <b>${response.main.humidity}%</b></p>
			<p> Wind Speed : <b>${response.wind.speed}</b> km/h</p>`
		}
	})
}

// Listen for Enter key
document.addEventListener('keydown', function (e) {
	if (e.key == 'Enter') {
		findButton.click()
	}
})