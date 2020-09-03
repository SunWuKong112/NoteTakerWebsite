// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const { notStrictEqual } = require("assert");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 6969;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// =============================================================
const notes = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/notes.html"));
});

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "/login.html"));
});

app.get("/signup", function(req, res) {
  res.sendFile(path.join(__dirname, "/signup.html"));
});

app.delete("/api/notes/:key", function(req, res) {
  var obj = findObjectByKey(key);
  var index = notes.indexOf(obj);
  notes.splice(index, 1);
  res.end();
});

app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

app.get("/api/notes/:key", function(req, res) {
  var note = req.params;
  var noteId = req.parems.id;
  let obj = notes.find(obj => obj.id == noteId);
  console.log(note);

  return res.end(obj);
});

app.post("/api/notes", function(req, res) {
  var note = req.body;
  note.id = generateId();
  
  notes.push(note);
  return res.json(note.id);
});

function generateId()
{
  let stringId = "";
  for (let i = 0; i < 26; i++)
  {
    var string = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789+/"
    var int = Math.round(Math.random()*63)+1;
    stringId += string.charAt(int);
  }
  if(!findObjectByKey(notes, stringId))
  {
    return stringId
  }
  else
  {
    generateId();
  }
}

function findObjectByKey(array, value) {
  for (var i = 0; i < array.length; i++) {
      if (array[i]["id"] === value) {
          return array[i];
      }
  }
  return null;
}


app.post("/api/notes/", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var note = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

  var ID = generateId();
  note.id = ID;

  console.log(note);

  characters.push(note);

  res.json(note);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});