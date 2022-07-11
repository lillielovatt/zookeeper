const express = require("express");
const { animals } = require("./data/animals.json");

const PORT = process.env.PORT || 3001;
const app = express();

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

app.get("/api/animals", (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get("/api/animals/:id", (req, res) => {
    const result = findById(req.params.id, animals);
    if(result){
        res.json(result);
    } else{
        res.send(404);
    }
});
//get requires 2 args - string that describes the route the client will have to fetch from,
// and CB function that executes every time route is accessed with GET request

//send() wih the res (response parameter) to send "Hello!" to client

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


// http://localhost:3001/api/animals