const BASE_URL = 'https://official-joke-api.appspot.com/random_ten';
const LOCAL_URL = 'http://localhost:3000/';

let JOKEDATA = [];
let i = 0;

document.addEventListener("DOMContentLoaded", () => {

    const punchline = document.getElementById("hidden-punchline");

    getJokes();

    const ratings = document.getElementById("ratings");

    ratings.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputRating = document.getElementById('input-rating').value;
        JOKEDATA[i].rating = inputRating;
    
        console.log(JOKEDATA[i].rating);
        ratings.reset();

        const ratingAvg = document.getElementById('ratings-total');
        ratingAvg.innerText = `Rating Average: ${inputRating}`;

        postJokes(JOKEDATA[0])

        //add code to average a joke rating and show the average in the DOM
    })

    //eventlistener for next button which will have cb function, push new joke to DOM.

const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', function() {
       
        
        if (i < JOKEDATA.length) {
            i++;
            addJoke(JOKEDATA[i])
        } else {
            i = 0;
            getJokes()
        }
        //debugger;

    });
    const punchBttn = document.getElementById('punchBttn');
    
    //eventlistener for the rating that when submitted, Waiting to do this later(send PATCH to json)
    punchBttn.addEventListener('click', (e) => {
        //debugger;
        if(punchline.hasAttribute ('hidden')) {
        punchline.removeAttribute('hidden');
        } else {
        punchline.setAttribute('hidden', true);
        } 
        // fyi <tag or id>.removeAttribute('hidden');
        // to add <tag or id>.setAttribute('hidden', true)
    })


const submitJokeBttn = document.querySelector("#submit")

submitJokeBttn.addEventListener('click', submitJoke)


})


//function that will add joke to the DOM; grab setup div and punchline div; eventlistner function that when clicked, will unhide punchline div
function addJoke(obj){
    //debugger;


    const jokeSetup = document.getElementById('setup');
    const punchline = document.getElementById('hidden-punchline');
    punchline.setAttribute('hidden', true);

    //debugger;
    jokeSetup.innerText = obj.setup;
    punchline.innerText = obj.punchline;
    
}


//button should cycle through the objects in our JOKEDATA global array. once it reaches the end, it starts on index 0 again.


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

function postJokes(jokeObj) {
    console.log(jokeObj);
    fetch(LOCAL_URL + 'jokes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jokeObj)
    })
    .then(response => response.json())
    .then(joke => console.log(joke))
}

// ----------STRETCH GOALS SECION----------

//  2) add a new joke to our JOKEDATA array

function submitJoke (e) {
    e.preventDefault();
    debugger;

    let setup = document.querySelector('#setup-input').value
    let punchline = document.querySelector('#punchline-input').value

    if (setup && punchline) {
        
        let newJoke = {
            setup: setup,
            punchline: punchline
        };

        postJoke(newJoke)
    }
}


function postJoke (newJoke) {
    debugger;

    const configJoke = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJoke)
    };

    fetch(LOCAL_URL + 'newJokes', configJoke).then(resp => resp.json())
    .then(newJokeData => console.log(newJokeData))
}





//  3) See all jokes that are rated, which we can rate them again


//  code below is not needed, but can be worked on later
//  Julie would like it to work, but again, it's not needed
// --------------------------------------------------------------------

//addListner function that upon DOMContentLoaded will fetch data; in this function, we will copy over data from API to json
// working on adding postJokes  .forEach(jokeObj => JOKEDATA.push(jokeObj)))

