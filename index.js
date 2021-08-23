const BASE_URL = 'https://elephant-api.herokuapp.com/elephants';

function postCheck() {
    fetch('https://elephant-api.herokuapp.com/elephants/random').then((response) => {response.json()}).then(data => console.log(data))
}