// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const notes = require("./db.json");
const { notStrictEqual } = require("assert");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 6969;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/login.html"));
});

app.get("/signup", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/signup.html"));
});

app.delete("/api/notes/:key", function(req, res) {
  var key = req.params.key;
  const file = path.join(__dirname, "db.json");
  fs.readFile(file, 'utf8', function readFileCallback(err, data){
    if (err){
      throw err;
    }
    else
    {
      var obj = JSON.parse(data);
      obj = obj.filter(item => item.id !== key);
      obj = JSON.stringify(obj);
      fs.writeFile(file, obj, (err)=>{
        if (err) throw err;
        return res.json(obj);
      });
    }
  });
});

app.get("/api/notes", function(req, res) {
  const file = path.join(__dirname, "db.json");
  var obj;
  fs.readFile(file, 'utf8', function readFileCallback(err, data){
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

app.get("/api/notes/:key", function(req, res) {
  var note = req.params;
  var noteId = req.parems.id;
  let obj = notes.find(obj => obj.id == noteId);
  const file = path.join(__dirname, "db.json");
  fs.readFile(file, 'utf8', function readFileCallback(err, data){
    if (err) throw err;
    else
    {
      obj = JSON.parse(data); //now it an object
      return res.end(obj);
    }
  });
});

app.post("/api/notes", function(req, res) {
  var note = req.body;
  const file = path.join(__dirname, "db.json");
  fs.readFile(file, 'utf8', function readFileCallback(err, data){
    if (err){
      throw err;
    }
    else
    {
      var stringId = generateId();
      note.id = stringId;
      var obj = JSON.parse(data);
      obj.push(note);
      obj = JSON.stringify(obj);
      fs.writeFile(file, obj, (err)=>{
        if (err) throw err;
        return res.json(stringId);
      });
    }
  });
});

function generateId()
{
  let stringId = "";
  for (let i = 0; i < 26; i++)
  {
    var string = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789+-";
    var int = Math.round(Math.random()*63)+1;
    stringId += string.charAt(int);
  }
    if(findObjectByKey(stringId))
    {
      return generateId();
    }
    else
    {
      return stringId;
    }
}

function findObjectByKey(value) {
  const file = path.join(__dirname, "db.json");
  fs.readFileSync(file, 'utf8', function (note$){
    var array = JSON.parse(note$)
    for (var i = 0; i < array.length; i++) {
      if (array[i]["id"] === value) {
          return true;
      }
    }
  });
  return false;
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});