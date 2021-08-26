const BASE_URL = 'https://official-joke-api.appspot.com/random_ten';
const LOCAL_URL = 'http://localhost:3000/';

let JOKEDATA = [];
let i = 0;

// clean up code, set all functions to be ouside of DOMContent Loaded, but have them invoke there.

document.addEventListener("DOMContentLoaded", () => {

    const punchline = document.getElementById("hidden-punchline");

    getJokes();

    const ratingSection = document.getElementById("ratings");

    ratingSection.addEventListener('submit', (e) => {
        e.preventDefault();
        getAvgRating(JOKEDATA[i].rating, ratingSection);
        // debugger;
        //add code to average a joke rating and show the average in the DOM
    })

    //eventlistener for next button which will have cb function, push new joke to DOM.

    const nextBtn = document.getElementById('nextBtn');

    nextBtn.addEventListener('click', function() {
       //button should cycle through the objects in our JOKEDATA global array. once it reaches the end, it starts on index 0 again.
        
        console.log(i);
        if (i < JOKEDATA.length) {
            i++;
            console.log(i);
            addJoke(JOKEDATA[i]);
        } else {
            i = 0;
            getJokes();
        }
        debugger;//THERE IS A BUG, SEE IF YOU CAN FIND IT

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

// sends back the average rating, if it was rated. if not, send our their rating
// fix up HTML wording
function getAvgRating(joke, ratingSection){
    const inputRating = document.getElementById('input-rating').value;
    const showRating = document.getElementById('ratings-total');
        if (JOKEDATA[i].rating) {
            // debugger;
            const rateArr = [...JOKEDATA[i].rating, inputRating];
            const rateTotal = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
            const rateAvg = (rateArr.reduce(rateTotal))/(rateArr.length);  
            console.log(rateArr);
            patchJokes(rateArr);
            showRating.textContent = `Rating average: ${rateAvg}`;
            
            // debugger;
        } else {
            const jokeObj = {...JOKEDATA[i], rating: inputRating}
            postJokes(jokeObj);
            //debugger;
            showRating.textContent = `Thank you for rating: ${inputRating}`;
        }
        // debugger;
        ratingSection.reset();
}

// ---------CODE BELOW FOR GET, POST, PATCH, DELETE, ETC...--------------------------------------//

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
    // debugger;
    fetch(LOCAL_URL + 'jokes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jokeObj)
    })
    .then(response => response.json())
    .then(joke => console.log(joke))
    .catch(error => {
        console.error('Joke already exists. sending to a PATCH. ERROR: ', error);
        console.log("can you see me")
        patchJokes(jokeObj);
    })
}
// postJoke looks too much like postJokes. can we change it to postNewJokes
function postJoke (newJoke) {
    // debugger;

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

// incase you want to play with this. using to bring jokes into main section to re-rate
function patchJokes(rating){
    console.log(rating);
    //const rating = jokeObj.rating
    debugger;
    fetch(LOCAL_URL + `jokes/${JOKEDATA[i].id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({rating})
    })
    .catch(error => {console.error('PATCH ERROR: ', error)}
    )
}
// ----------STRETCH GOALS SECION----------

//  2) add a new joke to our JOKEDATA array

function submitJoke (e) {
    e.preventDefault();
    // debugger;

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






//  3) See all jokes that are rated, which we can rate them again
// working on it