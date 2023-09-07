const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());

const {
  registerUser,
  loginUser,
  getCurrentUser,
  // updateUserProfile,
  getUserFavorites,
  addFavorite,
  removeFavorite,
} = require('./Handlers/userHandlers'); 


app
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  // User-related endpoints
  .post('/register', registerUser) // User registration
  .post('/login', loginUser) // User login
  .get('/profile', getCurrentUser) // Get user profile (protected
  // .put('/update-profile', updateUserProfile) // Update user profile
  .get('/favorites', getUserFavorites) // Get user's favorite cocktails
  .post('/favorites', addFavorite) // Add a cocktail to favorites
  .delete('/favorites/:cocktailId', removeFavorite) // Remove a cocktail from favorites

  // Start Server
  const PORT = 3000;
  app.listen(PORT, () => console.info(`Listening on port ${PORT}`));