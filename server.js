const express = require("express");
const fs = require("fs");
const path = require("path"); // provides utilities for working with file and directory paths
const { animals } = require("./data/animals.json");

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));
// The way it works is that we provide a file path to a location in our application 
// (in this case, the public folder) and instruct the server to make these files static resources.
//  This means that all of our front-end code can now be accessed without having a specific server endpoint created for it!

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //    save the animalsArray as filteredResults here
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        // save personalityTraits as a dedicated array
        // if it is string, push it in a new array and save
        if (typeof query.personalityTraits === "string") {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // loop thru each trait in personality traits array
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal => {
                return animal.personalityTraits.indexOf(trait) !== -1 //means that it has to exist, because the index of something that isn't in array is -1
            });
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animals.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0]; //there should be only 1 result for this, so take 1st instance in array. 
    //Why not just take the whole array then? BECAUSE it will return an array that has 1 object, as opposed to just returning the object, which is best.
    return result;
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get('/animals', (req,res)=>{
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers',(req,res)=>{
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//can't have 2 gets with the same ROUTE
app.get("/api/animals", (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get("/api/animals/:id", (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//get requires 2 args - string that describes the route the client will have to fetch from,
// and CB function that executes every time route is accessed with GET request

//send() wih the res (response parameter) to send "Hello!" to client

app.post("/api/animals", (req, res) => {
    // set id based on what the next index of the array will be (works only because we do not intend to remove data in this mod)
    req.body.id = animals.length.toString();
    // add animal to json file and animals array in this function

    if (!validateAnimal(req.body)) {
        res.status(400).send("The animal is not properly formatted.");
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
    // req.body is where our incoming content will be

    // In order for our server to accept incoming data the way we need it to, 
    // we need to tell our Express.js app to intercept our POST request before it gets to the callback function. 
    // At that point, the data will be run through a couple of functions 
    // to take the raw data transferred over HTTP and convert it to a JSON object.
});

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== "string") {
        return false;
    }
    if (!animal.species || typeof animal.species !== "string") {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== "string") {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

function createNewAnimal(body, animalsArray) {
    // function's main code HERE
    const animal = body;
    animalsArray.push(animal);

    fs.writeFileSync(
        path.join(__dirname, "./data/animals.json"),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    // return finished code to post route for response
    return animal;
}

// Even though adding app.listen() at the end is common practice, it is not required because it is just another method on app.
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// http://localhost:3001/api/animals
//https://evening-headland-92865.herokuapp.com/api/animals

// {
// 	"name": "Larry",
//   "species": "Lemur",
//   "diet": "omnivore",
//   "personalityTraits": ["hungry"]
// }

// we need to make sure that every time we test something on the front end 
// that it is served from http://localhost:3001, or https://<your-heroku-app-name>.herokuapp.com when it's in production.