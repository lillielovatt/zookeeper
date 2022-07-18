const fs = require("fs");
const path = require("path");

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
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
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
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
    const animal = body;
    animalsArray.push(animal);

    fs.writeFileSync(
        path.join(__dirname, "../data/animals.json"),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    // return finished code to post route for response
    return animal;
}

module.exports={
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
}