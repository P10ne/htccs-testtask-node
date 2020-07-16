const moviesRouter = require('./routes/MoviesRouter');
const commentsRouter = require('./routes/CommentsRouter');
const usersRouter = require('./routes/UsersRouter');
const authRouter = require('./routes/AuthRoutes');
const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const app = express();
const {sendJSONrespone, sendErrorResponse} = require('./utils/utils');

const port = 4000;
const dir = '/api';

app.use('/uploads', express.static(`${__dirname}/uploads`));
app.use('/images', express.static(`${__dirname}/images`));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(`${dir}/movies`, moviesRouter);
app.use(`${dir}/comments`, commentsRouter);
app.use(`${dir}/auth`, authRouter);
app.use(`${dir}/users`, usersRouter);


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

