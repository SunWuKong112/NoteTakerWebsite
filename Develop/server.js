// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

const { notStrictEqual } = require("assert");

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
  var files = fs.readFile(__dirname + "db/db.json")
  return res.json(files);
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
  var notes = JSON.stringify(fs.readFile(__dirname + "db/db.json"));
  notes.push(note);
  fs.writeFile(__dirname + "db/db.json", JSON.stringfy(notes));
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

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});