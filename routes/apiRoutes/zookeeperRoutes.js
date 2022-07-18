const router = require("express").Router();
const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers.json");

router.get("/zookeepers", (req, res) => {
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get("/zookeepers/:id", (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post("/zookeepers", (req, res) => {
    // set id based on what the next index of the array will be (works only because we do not intend to remove data in this mod)
    req.body.id = zookeepers.length.toString();
    // add animal to json file and animals array in this function

    if (!validateZookeeper(req.body)) {
        res.status(400).send("The zookeeper is not properly formatted.");
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
    // req.body is where our incoming content will be

    // In order for our server to accept incoming data the way we need it to, 
    // we need to tell our Express.js app to intercept our POST request before it gets to the callback function. 
    // At that point, the data will be run through a couple of functions 
    // to take the raw data transferred over HTTP and convert it to a JSON object.
});

module.exports=router;