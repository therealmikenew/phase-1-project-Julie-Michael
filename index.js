const BASE_URL = 'https://elephant-api.herokuapp.com/elephants';

function postCheck() {
    fetch(BASE_URL, {
        method: "GET",
        mode: 'no-cors',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
        // body: JSON.stringify
        })
    .then((response) => {response.json()})
    .then(data => console.log(data))
}