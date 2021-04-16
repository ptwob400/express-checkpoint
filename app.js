var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');

var app = express();

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));

app.get('/', function (req, res) {
    res.send("Welcome to the GMDB API!")
});

app.get('/movies', function (req, res, next) {
    const { title } = req.query;

    if (title === undefined) {
        res.send(movies);
    } else {
        res.send(movies.filter(movie => movie.title === title))
    }
});

app.get('/movies/:movieID', function (req, res, next) {
    const { movieID } = req.params

    res.send(movies.filter(movie => movie.id === +movieID))
});

app.post('/movies', function (req, res) {
    movies.push(req.body);
    res.send(req.body);
});

app.delete('/movies/:movieID', function (req, res) {
    const { movieID } = req.params
    var movies = movies.filter(movie => movie.id !== +movieID)
})
// app.get => /movies => will do whats below it

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            'error': {
                message: err.message,
                error: err
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'error': {
            message: err.message,
            error: {}
        }
    });
});

module.exports = app;

/*
Using Express, implement the correct API routes and Express functionality needed in the backend of GMDB. Using the repository we provide, please fulfill the user stories below.

As a client consuming application,
I want to be able to receive a list of movies from the database,
so that I can list them on my interface.
app.get(/movies , (res,req)){
    res.send(movies.json())
}

As a client consuming application,
I want to be able to search by title for movies from the database,
so that I can list them on my interface.

Intended end point:
/movies/title?=[Movie Title] - String match for movies titles
app.get(/movies/:title, (res, req))
req.query

// GET /search?q=tobi+ferret
console.dir(req.query.q)
// => "tobi ferret"



Movie object:

*/