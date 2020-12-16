
console.log('Client side javascript file is loaded ya 3ars!')

const weatherForm = document.querySelector('form');
const inputField = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = inputField.value;
    const url = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = "Loadin' and fetchin'.";

    fetch(url).then((response) => {

        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
                //console.log(data.error)
            }
            else{
                const responseMsg = data.forecast + ' in ' + data.location + '.';
                messageOne.textContent = responseMsg;
            }
        })
    })
})
