const form = document.querySelector('form')
const input = document.querySelector('input')
const loading = document.getElementById('p1')
const message = document.getElementById('p2')
fetch('http://ip-api.com/json').then((response) => {
    response.json().then((data) => {
        console.log(data)
        loading.textContent = 'Loading'
        const latitude = data.lat
        const longitude = data.lon
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&appid=98c34c2b7c860284d48bc82dd69819f3&limit=1&units=metric'
        fetch(url).then((response) => {
            response.json().then(({ main }) => {
                loading.textContent = data.city + ', ' + data.regionName
                message.textContent = main.temp
                console.log(main);
            })

        })
    })
})
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = input.value
    console.log(location)
    loading.textContent = 'Loading...'
    message.textContent = ''
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYXBpdGVzdGluZyIsImEiOiJja2MxaHNkOG0waXEwMnJsZmRqeng3aWprIn0.tB8EL1K_Y0YaaPglFkdAfA').then((response) => {

        response.json().then(({ features }) => {

            if (features === undefined) {
                return loading.textContent = 'Unable to find location, Try another search'
            }
            const place_name = features[0].place_name
            const longitude = features[0].center[0]
            const latitude = features[0].center[1]
            console.log(place_name)
            const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&appid=98c34c2b7c860284d48bc82dd69819f3&limit=1&units=metric'
            fetch(url).then((response) => {
                response.json().then(({ main }) => {
                    loading.textContent = place_name
                    message.textContent = main.temp + String.fromCharCode(176) + 'C'
                    console.log(main);
                })
            })
        })
    })
})