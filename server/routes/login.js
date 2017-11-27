const router = require('express').Router()
const usersController = require('../controllers/usersController');
const FB = require('fb');
FB.options({version: 'v2.8'});

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.accesstoken);
  next()
}

/* GET home page. */
router.post('/', usersController.signin);
router.get('/fb', setAccessToken, (req, res) => {
  FB.api('/me', {
    message: req.body.status,
    fields: 'name,last_name,first_name, email'
  }, function(response) {
    console.log('PUNYA FB',response);
    usersController.createfb(response)
    .then((token) => {
      res.send(token)
    })
    .catch(err => res.status(500).send(err))
  })
});

module.exports = router
