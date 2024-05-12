const express = require('express');
const router = express.Router();

const main_controller = require('../controllers/mainController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

/* Create User */
router.get('/sign-up', main_controller.user_create_get);
router.post('/sign-up', main_controller.user_create_post);

/* Log In User */
router.get('/log-in', main_controller.user_log_in_get);
router.post('/log-in', main_controller.user_log_in_post);

/* Update User */
router.get('/update-user', main_controller.user_update_get);
router.post('/update-user', main_controller.user_update_post);

module.exports = router;
