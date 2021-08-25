const BASE_URL = 'https://official-joke-api.appspot.com/random_ten';

let JOKEDATA = [];

document.addEventListener("DOMContentLoaded", () => {
    getJokes();

    const ratings = document.getElementById("ratings");

    ratings.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputRating = document.getElementById('input-rating').value;
        JOKEDATA[0].rating = inputRating;
    
        console.log(JOKEDATA[0].rating);
        ratings.reset();

        const ratingAvg = document.getElementById('ratings-total');
        ratingAvg.innerText = `Rating Average:${inputRating}`;

        //add code to average a joke rating and show the average in the DOM

    })

//eventlistener for next button which will have cb function, push new joke to DOM.

//button should cycle through the objects in our JOKEDATA global array. once it reaches the end, it starts on index 0 again.


})

//function that will add joke to the DOM; grab setup div and punchline div; eventlistner function that when clicked, will unhide punchline div
function addJoke(obj){
    //debugger;
    const jokeSetup = document.getElementById('setup');
    const punchline = document.getElementById('hidden-punchline');
    //debugger;
    jokeSetup.innerText = obj.setup;
    punchline.innerText = obj.punchline;
    const punchBttn = document.getElementById('punchBttn');
    
    //eventlistener for the rating that when submitted, Waiting to do this later(send PATCH to json)
    punchBttn.addEventListener('click', (e) => {
        const hiddenElement = document.getElementById("hidden-punchline");
        if(hiddenElement.hasAttribute ('hidden')) {
        hiddenElement.removeAttribute('hidden');
        } else {
        hiddenElement.setAttribute('hidden', true);
        }
        // fyi <tag or id>.removeAttribute('hidden');
        // to add <tag or id>.setAttribute('hidden', true)
    })
}

function getJokes() {
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => {
        data.forEach(jokeObj => {  
            JOKEDATA.push(jokeObj);
        }); 
    addJoke(JOKEDATA[0]);
    });
}


// ----------STRETCH GOALS SECION----------

//  2) add a new joke to our JOKEDATA array

//  3) See all jokes that are rated, which we can rate them again


//  code below is not needed, but can be worked on later
//  Julie would like it to work, but again, it's not needed
// --------------------------------------------------------------------

//addListner function that upon DOMContentLoaded will fetch data; in this function, we will copy over data from API to json
// working on adding postJokes  .forEach(jokeObj => JOKEDATA.push(jokeObj)))
// const LOCAL_URL = 'http://localhost:3000/jokes';
//function postJokes(jokeObj) {
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