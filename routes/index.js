const express = require('express');
const router = express.Router();

const main_controller = require('../controllers/mainController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Create User */
router.get('/sign-up', main_controller.user_create_get);

module.exports = router;
