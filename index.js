const BASE_URL = 'https://official-joke-api.appspot.com/random_ten';
const LOCAL_URL = 'http://localhost:3000/';
let JOKEDATA = [];

function getJokes() {
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => data.forEach(jokeObj => JOKEDATA.push(jokeObj)))
}
// working on adding postJokes .forEach(jokeObj => postJokes(jokeObj))
function postJokes(jokeObj) {
    console.log(jokeObj);
    debugger;
    fetch(LOCAL_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jokeObj)
    })
    .then(response => response.json())
    .then(joke => console.log(joke))
}

//addListner function that upon DOMContentLoaded will fetch data; in this function, we will copy over data from API to json
document.addEventListener("DOMContentLoaded", () => {
    getJokes();
    // postJokes(JOKEDATA);
})

//function that will add joke to the DOM; grab setup div and punchline div; eventlistner function that when clicked, will unhide punchline div
function addJoke(){
    const setup = document.getElementById('setup');
    const punchline = document.getElementById('hidden-punchline');
    debugger;
    setup.innerText = JOKEDATA[0].setup;
    punchline.innerText = JOKEDATA[0].punchline;
    const punchBttn = document.getElementById('punchBttn');


}

//eventlistener for the rating that when submitted, send PATCH to json

//eventlistener for next button which will have cb function, push new joke to DOM