// Dependency List
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require("./routes");
const passport = require('./config');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoDB = require('./config/db');
const SECRET = process.env.SESSION_SECRET || "secret";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
// Conditional Middleware
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
};
app.use(session({
    secret: SECRET,
    store: new MongoStore({ 
        mongooseConnection: mongoDB 
    }),
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(routes);

app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
});