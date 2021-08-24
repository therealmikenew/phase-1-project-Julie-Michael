const BASE_URL = 'https://official-joke-api.appspot.com/random_ten';

function getJokes() {
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => console.log(data))
}



//addListner function that upon DOMContentLoaded will fetch data; in this function, we will copy over data from API to json

//function that will add joke to the DOM; grab setup div and punchline div; eventlistner function that when clicked, will unhide punchline div

//eventlistener for the rating that when submitted, send PATCH to json

//eventlistener for next button which will have cb function, push new joke to DOM