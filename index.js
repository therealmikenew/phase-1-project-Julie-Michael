const BASE_URL = 'https://official-joke-api.appspot.com/random_ten';
const LOCAL_URL = 'http://localhost:3000/';

let JOKEDATA = [];
let RATEDJOKES = [];
let NEWJOKES = [];
let CURRENTJOKE = 0;

// clean up code, set all functions to be ouside of DOMContent Loaded, but have them invoke there.

document.addEventListener("DOMContentLoaded", () => {
    const punchline = document.getElementById("hidden-punchline");
    const ratingSection = document.getElementById("ratings");
    const nextBtn = document.getElementById('nextBtn');
    const submitJokeBttn = document.getElementById("submit-form");

//add code to average a joke rating and show the average in the DOM    
    ratingSection.addEventListener('submit', (e) => {
        e.preventDefault();
        getAvgRating(JOKEDATA[CURRENTJOKE]);
        ratingSection.reset();
    })

//eventlistener for next button which will have cb function, push new joke to DOM.
//button should cycle through the objects in our JOKEDATA global array. once it reaches the end, it starts on index 0 again.
    
    nextBtn.addEventListener('click', () => {
        showRatingSection();
        nextJoke();
        updateTables();
    })

//eventlistener for the rating that when submitted, Waiting to do this later(send PATCH to json)    
    const punchBttn = document.getElementById('punchBttn');
    punchBttn.addEventListener('click', (e) => {
        if(punchline.hasAttribute ('hidden')) {
        punchline.removeAttribute('hidden');
        } else {
        punchline.setAttribute('hidden', true);
        } 
    })

    submitJokeBttn.addEventListener('submit', (e) => {
        e.preventDefault();
        submitJoke();
        submitJokeBttn.reset();
    })
    
    getJokes();
    getRatedJokes();
    getNewJokes();
})

function nextJoke () {
    if (CURRENTJOKE < JOKEDATA.length - 1) {
        CURRENTJOKE++;
    } else {
        CURRENTJOKE = 0;
    }
    addJoke(JOKEDATA[CURRENTJOKE]);
}

function showRatingSection () {
    const ratingTotal = document.getElementById('ratings-total');
    if (JOKEDATA[CURRENTJOKE].ratings){
        getAvgRating(JOKEDATA[CURRENTJOKE])
    } else {ratingTotal.textContent = "Add your rating below!"}
}

function updateTables () {
    const ratedTable = document.getElementById('rated-table');
    const newTable = document.getElementById('new-table');
    ratedTable.remove();
    newTable.remove();
    getRatedJokes();   
    getNewJokes();
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
function getAvgRating(joke){
    const inputRating = document.getElementById('input-rating').value;
    const showRating = document.getElementById('ratings-total');
        if (joke.rating) {
            debugger;
            const rateArr = [...joke.rating, inputRating];
            const rateTotal = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
            const rateAvg = Math.round((rateArr.reduce(rateTotal))/(rateArr.length));  
            if (joke.type){
                patchJokes(rateArr);
            } else {patchNewJokes(rateArr)}
            showRating.textContent = `Rating average: ${rateAvg}`;
            updateTables();  
        } else {
            if (joke.type){
                const jokeObj = {...joke, rating: inputRating}
                postJokes(jokeObj);
            } else {
                const rateArr = [inputRating];
                patchNewJokes(rateArr);}
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

function getNewJokes() {
    NEWJOKES = [];
    fetch(LOCAL_URL + 'newJokes')
    .then(response => response.json())
    .then(data => {
        data.forEach(jokeObj => {
            NEWJOKES.push(jokeObj);
        });
        renderNewJokes();
    })
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
        //patchJokes(jokeObj);
    })
}

// incase you want to play with this. using to bring jokes into main section to re-rate
function patchJokes(rating){
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

function patchNewJokes (rating) {
    fetch(LOCAL_URL + `newJokes/${JOKEDATA[CURRENTJOKE].id}`, {
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
    // debugger;
    let setup = document.querySelector('#setup-input').value
    let punchline = document.querySelector('#punchline-input').value
    if (setup && punchline) {      
        let newJoke = {
            setup: setup,
            punchline: punchline
        };
        postNewJokes(newJoke)
    } else {
        alert("Please fill out both fields!")
    
   
}}

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
    .catch(error => console.error('New Joke Posting Error: ', error))
}

//  3) See all jokes that are rated, which we can rate them again

function renderNewJokes(){
    const newJokeSection = document.getElementById('tables');
    const newSection = document.getElementById('new-jokes');
    const newTable = document.getElementById('new-body'); 
    const arrLength = NEWJOKES.length;
     for (newIndex = 0; newIndex < arrLength; newIndex++) {
        const row = document.createElement('tr');    
        for (column = 0; column < 3; column++) {
            let cell = document.createElement('td');
            if(column === 0){
                const newBtn = document.createElement('button');
                newBtn.textContent = `see rating`;
                newBtn.setAttribute('id', newIndex)
                cell.appendChild(newBtn);
                row.appendChild(cell); 
                newBtn.addEventListener('click', (e) => {
                     e.preventDefault();
                     let button = e.target.id;
                     showRatingSection ();
                     addJoke(NEWJOKES[button]);
                     CURRENTJOKE = JOKEDATA.length;
                     JOKEDATA.push(NEWJOKES[button]);
                })
            } else if (column === 1) {
                let cellText = document.createTextNode(NEWJOKES[newIndex].setup);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (column === 2) {
                if (NEWJOKES[newIndex].rating) {                
                    if (NEWJOKES[newIndex].rating.length > 1) {
                        const rateTotal = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
                        const rateAvg = Math.round((NEWJOKES[newIndex].rating.reduce(rateTotal))/(NEWJOKES[newIndex].rating.length));  
                        let cellText = document.createTextNode(rateAvg);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    } else  { 
                        let cellText = document.createTextNode(NEWJOKES[newIndex].rating);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }
                } else {
                    let cellText = document.createTextNode('Not Rated');
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
            } else {continue} 
        }
    newTable.appendChild(row);    
    newSection.appendChild(newTable);
    newJokeSection.appendChild(newSection);
    newSection.setAttribute('border', '1');
    newSection.setAttribute('id', 'new-table');
    }
}

function renderRatedJokes(){
    const ratedJokeSection = document.getElementById('tables');
    const ratedSection = document.getElementById('rated-jokes');
    const rateTable = document.getElementById('rated-body'); 
    const arrLength = (RATEDJOKES.length)-1;
     for (objIndex = 0; objIndex < arrLength; objIndex++) {
        const row = document.createElement('tr');    
        for (const key in RATEDJOKES[objIndex]) {
            let cell = document.createElement('td');
            if(key === 'type'){
                const newBtn = document.createElement('button');
                newBtn.textContent = `see rating`;
                newBtn.setAttribute('id', objIndex)
                cell.appendChild(newBtn);
                row.appendChild(cell); 
                newBtn.addEventListener('click', (e) => {
                     e.preventDefault();
                     let button = e.target.id;
                     showRatingSection ();
                     addJoke(RATEDJOKES[button]);
                     CURRENTJOKE = JOKEDATA.length;
                     JOKEDATA.push(RATEDJOKES[button]);
                })
            } else if (key === 'rating') {
                const arr = RATEDJOKES[objIndex][key]
                if (arr.length > 1) {
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
            } else if (key === 'setup') {
                let cellText = document.createTextNode(RATEDJOKES[objIndex][key]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else {continue} 
        }
    rateTable.appendChild(row);    
    ratedSection.appendChild(rateTable);
    ratedJokeSection.appendChild(ratedSection);
    ratedSection.setAttribute('border', '1');
    ratedSection.setAttribute('id', 'rated-table');
    }
    
}