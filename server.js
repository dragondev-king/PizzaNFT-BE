
const express = require("express");
require("dotenv").config();
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

const { callRequestToMoralis } = require("./app/utils/helpers")
var corsOptions = {
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

app.use(cors());

//body parser
app.use(express.json())

//app.use((req, res, next) => {
//  if(req.method == 'PUT'){
//    console.log(req.body, 'BODY')
//    console.log(req.data, 'DATA')
//    console.log(req.files, 'REQ FILES')
//  }
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//  if(req.method == 'OPTIONS') {
//    res.send(200);
//  } else {
//  next();
//  }
//})
// parse requests of content-type - application/json
//app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

app.use(express.static('public')); 

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to pizza-nft application." });
});

require("./app/routes/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  callRequestToMoralis()
});
