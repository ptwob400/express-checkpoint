var express = require('express');
var router = express.Router();

const movies = [
  {
  "id": 1,
  "title": "Midnight In Paris",
  "runtime": 96,
  "release_year": 2011,
  "director": "Woody Allen",
  },
  {
  "id": 2,
  "title": "Titanic",
  "runtime": 210,
  "release_year": 1997,
  "director": "James Cameron",
  },
  {
  "id": 3,
  "title": "From Paris With Love",
  "runtime": 94,
  "release_year": 2010,
  "director": "Pierre Morel",
  }
]

/* GET movies listing. */
router.get('/movies', function(req, res, next) {
  res.send("hello world");
});

module.exports = router;
