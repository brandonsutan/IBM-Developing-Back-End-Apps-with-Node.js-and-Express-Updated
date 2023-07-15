const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

// Middleware
app.use(express.json());

app.use(
  '/customer',
  session({ secret: 'fingerprint_customer', resave: true, saveUninitialized: true })
);

app.use('/customer/auth/*', function auth(req, res, next) {
  // Write the authentication mechanism here
  if (req.session.authorization) {
    // Get the authorization object stored in the session
    const token = req.session.authorization['accessToken']; // Retrieve the token from the authorization object
    jwt.verify(token, 'access', (err, user) => {
      // Use JWT to verify token
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: 'User not authenticated' });
      }
    });
  } else {
    return res.status(403).json({ message: 'User not logged in' });
  }
});

// Routes
app.use('/customer', customer_routes);
app.use('/', genl_routes);

const PORT = 3001;

app.listen(PORT, () => console.log('Server is running on port', PORT));

