require("./config/config");
var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var SQLiteStore = require("connect-sqlite3")(session);
var morgan = require("morgan");
var helmet = require("helmet");

//Session
const cookieKey = process.env.COOKIE_SESSION_KEY;
const cookieName = process.env.COOKIE_SESSION_NAME;
const cookieExpires = process.env.COOKIE_EXPIRATION_MS;

// Routers
var indexRouter = require("./routes/index");

var app = express();

app.use(
  cors({
    credentials: true,
    origin: "https://heia-sms.vercel.app",
  })
);

app.use(express.json());
//app.use(express.static(path.join(__dirname, "public")));
app.enable("trust proxy");

// Passport
app.use(passport.initialize());
app.use(passport.session());
//app.use(passport.authenticate('session'));

// Cookie Parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(
  session({
    secret: cookieKey,
    name: cookieName,
    resave: false,
    saveUninitialized: false,
    Cookie: {
      path: "/",
      secure: true,
      expires: Date.now() + parseInt(cookieExpires),
      maxAge: parseInt(cookieExpires, 10),
      sameSite: "none",
    },
  })
);

// Helmet (no-cache)
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Routes
app.use("/", indexRouter);

//Error Handler
app.use(function (req, res, next) {
  res.status(404).json({ msg: "Unable to find the requested resource!" });
});

const port = process.env.PORT || 7242;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);

module.exports = app;
