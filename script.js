let key = '57c77246fcd7c7faf1a9a0465bc0bbde'
let city = 'Ставрополь'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=ru`
let inputCity = document.querySelector('#inputCity')
let iconLabel = document.querySelector('#icon')
let descLabel = document.querySelector('#descLabel')
let tempLabel = document.querySelector('#tempLabel')
let feelsLikeLabel = document.querySelector('#feelsLikeLabel')
let windLabel = document.querySelector('#windLabel')

inputCity.value = ''
inputCity.addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        if(inputCity.value == ''){
            alert('Hапиши название города. Быстро!')
        }
        else{
            getData()
        }
    }
})

function getData(){
    city = inputCity.value
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=ru`
    fetch(url)
        .then(data=>{
            console.log(data)
            if(data.ok){
                data.json()
                    .then(data=>{
                        let temp = data['main']['temp']
                        let feelsLike = data['main']['feels_like']
                        let description = data['weather'][0]['description']
                        let wind = data['wind']['speed']
                        let icon = data['weather'][0]['icon']
                        getDataWeather(temp,feelsLike,description,wind,icon)
                    })
            }
        })
}
    
function getDataWeather(temp, feelsLike, description, wind, icon){
    console.log(temp, feelsLike, description, wind, icon)
    tempLabel.innerHTML = 'Температура: ' + temp + '&deg;'
    feelsLikeLabel.innerHTML = 'Ощущается как: ' + feelsLike + '&deg;'
    windLabel.textContent = 'Скорость ветра: ' + wind + 'м/с'
    let newDesc =  description[0].toUpperCase() + description.slice(1)
    descLabel.textContent = newDesc
    iconLabel.src = `http://openweathermap.org/img/wn/${icon}@4x.png`
}