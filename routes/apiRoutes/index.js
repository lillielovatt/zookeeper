// we're going to add middleware so that our app knows about the routes in animalRoutes.js

const router = require("express").Router();
const animalRoutes = require("../apiRoutes/animalRoutes");
const zookeeperRoutes = require("../apiRoutes/zookeeperRoutes");

router.use(animalRoutes); 
router.use(zookeeperRoutes); 

//use the module exported from animalRoutes.js
//this way, we use apiRoutes/index.js as a central hub for all routing functions we want to add to application
//may seem like overkill but as app grows, will be efficient.
//We've added this code so that later, when we add additional routes, they can all be exported from the same file.

module.exports=router;