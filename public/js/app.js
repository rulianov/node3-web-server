console.log('client side js is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//      response.json().then((data) => {
//          console.log(data)
//      })
// })


// fetch('http://localhost:3000/weather?address=1OK').then((response) => {
//      response.json().then((data) => {
//         if(data.error) {
//             console.log('Error:', data.error)
//         } else {
//             console.log(data)
//         }
//      })
// })


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = `'Error:' ${data.error}`
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forcastData
            }
        })
    })


})
