const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// with require(), the index.js file will be the default file read if no other file is provided

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));
// The way it works is that we provide a file path to a location in our application 
// (in this case, the public folder) and instruct the server to make these files static resources.

//use apiRoutes for all incoming requests, POST or GET
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//get requires 2 args - string that describes the route the client will have to fetch from,
// and CB function that executes every time route is accessed with GET request

// Even though adding app.listen() at the end is common practice, it is not required because it is just another method on app.
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// http://localhost:3001/api/animals
//https://evening-headland-92865.herokuapp.com/api/animals
// we need to make sure that every time we test something on the front end 
// that it is served from http://localhost:3001, or https://<your-heroku-app-name>.herokuapp.com when it's in production.