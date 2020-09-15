console.log('Client-side JavaScript file is loaded')

// fetch('http://api.weatherstack.com/current?access_key=a3c2b3c09b88788f749508fbb59196f5&query=&units=m')
// .then(response => response.json())
// .then(data => console.log(data.location, data.forecast))
// .catch(error => console.error(error))

const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchText.value
    messageOne.textContent = 'Fetching...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address='+ location)
    .then(response => response.json())
    .then(data => {
    if (data.error)  {
    messageOne.textContent = data.error
    messageTwo.textContent = ''
    } else {
    messageOne.textContent = data.location
    messageTwo.textContent = data.forecast
    }  
    })
})
