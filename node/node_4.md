# Node.JS - ExpressJS & MongoDB

## 1. Installation and Configuration of a Express JS Project
```js
const app = express();

// CORS
app.use(cors);

// redirect to https
app.use(redirectMiddleware);

if (config.env.nodeEnv !== 'test') {
  app.use(logger(config.loggerFormat));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// auth
app.use(passport.initialize());
localStrategy(passport);
jwtStrategy(passport);

// API routes
app.use('/api', router(passport));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || 'Something went wrong :(';

  const data = { status, message };
  if (err.errors) {
    data.errors = err.errors;
  }

  if (err instanceof models.Sequelize.ForeignKeyConstraintError) {
    return res.status(400).send({ status: 400, message: err.original.detail });
  }

  return res.status(status).send(data);
});

module.exports = app;
```

## 2. Routing
```js
// router.js file:
module.exports = (passport) => {
  const router = Router();
  router.use('/ping', routes.ping());
  router.use('/auth', routes.auth(passport));
  router.use('/user', authJWT(passport), routes.user());
  router.use('/docs', routes.docs());
  // ...
  return router;
};
// ping.js file:
module.exports = () => {
  const router = Router();
  router.get('/', (req, res, next) => {
    res.send('pong');
  });
  return router;
};
```

## 3. Middleware
```js
module.exports = (req, res, next) => {
  // some logic...
  next();
};
```

## 4. DB communication with MongoDB (mongoose)
## 5. HTML Templates: Jade / Hogan/ Handlebars
## 6. User Authentication in Express JS
## 7. Sessions and Cookies
## 8. Session Stores
