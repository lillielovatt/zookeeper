const fs = require("fs");
const path = require("path");

function filterByQuery(query, zookeepers) {
    let filteredResults = zookeepers;
    if (query.age) {
        // Since our form data will be coming in as strings, and our JSON is storing
        // age as a number, we must convert the query string to a number to
        // perform a comparison:
        filteredResults = filteredResults.filter(zookeeper => zookeeper.age === Number(query.age));
    }
    if (query.favoriteAnimal) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.favoriteAnimal === query.favoriteAnimal);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.name === query.name);
    }
    return filteredResults;
}

function findById(id, zookeepers) {
    const result = zookeepers.filter(zookeeper => zookeeper.id === id)[0]; //there should be only 1 result for this, so take 1st instance in array. 
    //Why not just take the whole array then? BECAUSE it will return an array that has 1 object, as opposed to just returning the object, which is best.
    return result;
}

function validateZookeeper(zookeeper) {
    if (!zookeeper.name || typeof zookeeper.name !== "string") {
        return false;
    }
    if (!zookeeper.age || typeof zookeeper.age !== "number") {
        return false;
    }
    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string") {
        return false;
    }
    return true;
}

function createNewZookeeper(body, zookeepers) {
    const zookeeper = body;
    zookeepers.push(zookeeper);

    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        JSON.stringify({ zookeepers }, null, 2)
    );

    return zookeeper;
}

module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
}