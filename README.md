# Phase 1 project - Do You Like This Joke?


### Goals

Our phase 1 project had the following goals:
- Incorporate good use of HTML, CSS, and JS, and fetch data via a public API
- To be a single page application
- Include at least 3 events (ie, DOMContentLoaded, click)
- To be interactive
- Uses good coding practices

Using the API
API: `https://official-joke-api.appspot.com/random_ten` 
Run `json-server --watch db.json`, which will produce the following 2 endpoints: `http://localhost:3000/jokes` and `http://localhost:3000/newJokes`

### Do You Like This Joke?
The application draws from an API that generates 10 random jokes. Upon arrival on the site, the user is presented with the "setup" for the joke. The user presses a button to reveal the "punchline" to the joke. Then the user can give a rating (1 to 10) to the joke and then submit the rating. The user can also submit a joke (setup and punchline), which will be stored as a new array of jokes and will be cycled through and will be generated as a new joke to be rated.



