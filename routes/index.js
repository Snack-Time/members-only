const express = require('express');
const router = express.Router();

const main_controller = require('../controllers/mainController');

/* GET home page. */
router.get('/', main_controller.index);

/* Create User */
router.get('/sign-up', main_controller.user_create_get);
router.post('/sign-up', main_controller.user_create_post);

/* Log In User */
router.get('/log-in', main_controller.user_log_in_get);
router.post('/log-in', main_controller.user_log_in_post);

/* Update User */
router.get('/update-user', main_controller.user_update_get);
router.post('/update-user', main_controller.user_update_post);

/* Post Message */
router.get('/new-message', main_controller.message_create_get);
router.post('/new-message', main_controller.message_create_post);

module.exports = router;
