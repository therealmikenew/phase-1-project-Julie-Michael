const BASE_URL = 'https://official-joke-api.appspot.com/random_ten';
const LOCAL_URL = 'http://localhost:3000/jokes';

let JOKEDATA = [];
let i = 0;

document.addEventListener("DOMContentLoaded", () => {

    const punchline = document.getElementById("hidden-punchline");

    getJokes();

    const ratings = document.getElementById("ratings");

    ratings.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputRating = document.getElementById('input-rating').value;
        JOKEDATA[0].rating = inputRating;
    
        console.log(JOKEDATA[0].rating);
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
        debugger;

    });
    const punchBttn = document.getElementById('punchBttn');
    
    //eventlistener for the rating that when submitted, Waiting to do this later(send PATCH to json)
    punchBttn.addEventListener('click', (e) => {
        debugger;
        if(punchline.hasAttribute ('hidden')) {
        punchline.removeAttribute('hidden');
        } else {
        punchline.setAttribute('hidden', true);
        } 
        // fyi <tag or id>.removeAttribute('hidden');
        // to add <tag or id>.setAttribute('hidden', true)
    })


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

// ----------STRETCH GOALS SECION----------

//  2) add a new joke to our JOKEDATA array

//  3) See all jokes that are rated, which we can rate them again


//  code below is not needed, but can be worked on later
//  Julie would like it to work, but again, it's not needed
// --------------------------------------------------------------------

//addListner function that upon DOMContentLoaded will fetch data; in this function, we will copy over data from API to json
// working on adding postJokes  .forEach(jokeObj => JOKEDATA.push(jokeObj)))

