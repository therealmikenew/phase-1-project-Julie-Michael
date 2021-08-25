const BASE_URL = 'https://official-joke-api.appspot.com/random_ten';
const LOCAL_URL = 'http://localhost:3000/jokes';
let JOKEDATA = [];

document.addEventListener("DOMContentLoaded", () => {
    getJokes();
    //addJoke();
    //postJokes(JOKEDATA);
    const ratings = document.getElementById("ratings")

    ratings.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputRating = document.getElementById('input-rating').value
        JOKEDATA[0].rating = inputRating
    
        console.log(JOKEDATA[0].rating)
        ratings.reset();

        const ratingAvg = document.getElementById('ratings-total')
        ratingAvg.innerText = `Rating Average:${inputRating}`

        //debugger;


})
})


function getJokes() {
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => {
        data.forEach(jokeObj => {  
            JOKEDATA.push(jokeObj)
        }); 
    addJoke(JOKEDATA[0]) 
    });
}
// working on adding postJokes  .forEach(jokeObj => JOKEDATA.push(jokeObj)))
// function postJokes(jokeObj) {
//     console.log(jokeObj);
//     fetch(LOCAL_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(jokeObj)
//     })
//     .then(response => response.json())
//     .then(joke => addJoke(jokeObj))
// }

//addListner function that upon DOMContentLoaded will fetch data; in this function, we will copy over data from API to json


//function that will add joke to the DOM; grab setup div and punchline div; eventlistner function that when clicked, will unhide punchline div
function addJoke(obj){
    //debugger;
    const jokeSetup = document.getElementById('setup');
    const punchline = document.getElementById('hidden-punchline');
    //debugger;
    jokeSetup.innerText = obj.setup;
    punchline.innerText = obj.punchline;
    const punchBttn = document.getElementById('punchBttn');

    punchBttn.addEventListener('click', (e) => {
        const hiddenElement = document.getElementById("hidden-punchline");
        if(hiddenElement.hasAttribute ('hidden')) {
        hiddenElement.removeAttribute('hidden');
        } else {
        hiddenElement.setAttribute('hidden', true)
        }
    
    })

// fyi <tag or id>.removeAttribute('hidden');
// to add <tag or id>.setAttribute('hidden', true)
}


//eventlistener for the rating that when submitted, send PATCH to json

//eventlistener for next button which will have cb function, push new joke to DOM

