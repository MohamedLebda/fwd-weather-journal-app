// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const myLocalPort = 3000;
app.listen(myLocalPort, () =>
  console.log(`server started on port ${myLocalPort}`)
);
// set up post route
app.post("/weather", weather);
function weather(req, res) {
  Object.assign(projectData, req.body);
  console.log(projectData);
}
// set up get route
app.get("/all", (req, res) => res.send(projectData));
