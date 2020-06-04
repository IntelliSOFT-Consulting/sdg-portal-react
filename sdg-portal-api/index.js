let express = require("express");
let moongose = require('mongoose');
let cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

let app = express();



app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(cookieParser());

const path = require("path");
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(cors());



let apiRoutes = require('./app/routes/file.routes.js');

moongose.Promise = global.Promise;

moongose.connect('mongodb://localhost:27017/api', {useNewUrlParser:true, useUnifiedTopology: true});
let db = moongose.connection;

if(!db){
    console.log("Connection error");
}else{
    console.log("Connection successful")
}

app.use('/api', apiRoutes);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.get('/api/files', withAuth, function(req, res){
   res.sendStatus(200);
});

app.get('/api/user/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
   });
