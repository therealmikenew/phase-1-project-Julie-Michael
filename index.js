const BASE_URL = 'https://official-joke-api.appspot.com/random_ten';
const LOCAL_URL = 'http://localhost:3000/';

let JOKEDATA = [];
let RATEDJOKES = [];
let CURRENTJOKE = 0;

// clean up code, set all functions to be ouside of DOMContent Loaded, but have them invoke there.

document.addEventListener("DOMContentLoaded", () => {
    const punchline = document.getElementById("hidden-punchline");
    const ratingSection = document.getElementById("ratings");
    const nextBtn = document.getElementById('nextBtn');
    const submitJokeBttn = document.querySelector(".submit-form")

//add code to average a joke rating and show the average in the DOM    
    ratingSection.addEventListener('submit', rateJoke)

//eventlistener for next button which will have cb function, push new joke to DOM.
//button should cycle through the objects in our JOKEDATA global array. once it reaches the end, it starts on index 0 again.
    
    nextBtn.addEventListener('click', nextJoke);

//eventlistener for the rating that when submitted, Waiting to do this later(send PATCH to json)    
    const punchBttn = document.getElementById('punchBttn');
    punchBttn.addEventListener('click', (e) => {
        if(punchline.hasAttribute ('hidden')) {
        punchline.removeAttribute('hidden');
        } else {
        punchline.setAttribute('hidden', true);
        } 
    })

    submitJokeBttn.addEventListener('click', submitJoke)

    getJokes();
    getRatedJokes();
})

function rateJoke (e) {
    e.preventDefault();
    getAvgRating(JOKEDATA[CURRENTJOKE], ratingSection);
    ratingSection.reset();
}

function nextJoke () {
    if (CURRENTJOKE < JOKEDATA.length - 1) {
        CURRENTJOKE++;
    } else {
        CURRENTJOKE = 0;
    }
    addJoke(JOKEDATA[CURRENTJOKE]);
}

//function that will add joke to the DOM; grab setup div and punchline div; eventlistner function that when clicked, will unhide punchline div
function addJoke(obj){
    const jokeSetup = document.getElementById('setup');
    const punchline = document.getElementById('hidden-punchline');
    punchline.setAttribute('hidden', true);
    jokeSetup.innerText = obj.setup;
    punchline.innerText = obj.punchline;
}

// sends back the average rating, if it was rated. if not, send our their rating
// TODO: fix up HTML wording
function getAvgRating(joke, ratingSection){
    const inputRating = document.getElementById('input-rating').value;
    const showRating = document.getElementById('ratings-total');
        if (joke.rating) {
            const rateArr = [...joke.rating, inputRating];
            const rateTotal = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
            const rateAvg = Math.round((rateArr.reduce(rateTotal))/(rateArr.length));  
            patchJokes(rateArr);
            showRating.textContent = `Rating average for this joke: ${rateAvg}`;
            table = document.getElementById('table');
            table.remove();
            getRatedJokes();   
        } else {
            const jokeObj = {...joke, rating: inputRating}
            postJokes(jokeObj);
            showRating.textContent = `Thank you for rating: ${inputRating}`;
        }
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

function getRatedJokes() { 
    RATEDJOKES = [];
    fetch(LOCAL_URL + `jokes`)
    .then(response => response.json())
    .then(data => {
        data.forEach(jokeObj => {  
            RATEDJOKES.push(jokeObj);
        }); 
        renderRatedJokes();
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
        console.error('PATCH ERROR: ', error);
        //console.log("can you see me")
        //patchJokes(jokeObj);
    })
}


// incase you want to play with this. using to bring jokes into main section to re-rate
function patchJokes(rating){
    console.log(rating);
    fetch(LOCAL_URL + `jokes/${JOKEDATA[CURRENTJOKE].id}`, {
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
    console.log("working?")
    let setup = document.querySelector('#setup-input').value
    let punchline = document.querySelector('#punchline-input').value
    if (setup && punchline) {      
        let newJoke = {
            setup: setup,
            punchline: punchline
        };
        postNewJokes(newJoke)
    }
    
    
   
}


function postNewJokes (newJoke) {
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

//  3) See all jokes that are rated, which we can rate them again

function renderRatedJokes(){
    const ratedJokeSection = document.getElementById('rated-jokes');
    const ratedSection = document.createElement('table');
    const rateTable = document.createElement('tbody'); 
    const arrLength = RATEDJOKES.length;
     for (objIndex = 0; objIndex <= arrLength; objIndex++) {
        const row = document.createElement('tr');    
        for (const key in RATEDJOKES[objIndex]) {
            let cell = document.createElement('td');
            if(key === 'id'){continue} 
            else if(key === 'type'){
                const newBtn = document.createElement('button');
                newBtn.textContent = `see rating`;
                newBtn.setAttribute('id', objIndex)
                cell.appendChild(newBtn);
                row.appendChild(cell); 
                newBtn.addEventListener('click', (e) => {
                     e.preventDefault();
                     let button = e.target.id;
                     addJoke(RATEDJOKES[button]);
                     CURRENTJOKE = JOKEDATA.length;
                     JOKEDATA.push(RATEDJOKES[button]);
                })
            } else if (key === 'rating') {
                if (RATEDJOKES[objIndex][key].length > 1) {
                    const rateTotal = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
                    const rateAvg = Math.round((RATEDJOKES[objIndex][key].reduce(rateTotal))/(RATEDJOKES[objIndex][key].length));  
                    let cellText = document.createTextNode(rateAvg);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                } else { 
                    let cellText = document.createTextNode(RATEDJOKES[objIndex][key]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
            } else {
                let cellText = document.createTextNode(RATEDJOKES[objIndex][key]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }
    rateTable.appendChild(row);    
    ratedSection.appendChild(rateTable);
    ratedJokeSection.appendChild(ratedSection);
    ratedSection.setAttribute('border', '1');
    ratedSection.setAttribute('id', 'table');
    }
}

function renderNewJokes(){
    // to do
}