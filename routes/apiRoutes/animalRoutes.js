const router = require("express").Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require("../../lib/animals");
const { animals } = require("../../data/animals.json");

router.get("/animals", (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get("/animals/:id", (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post("/animals", (req, res) => {
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

module.exports=router;