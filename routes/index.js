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

/* Log Out User */
router.get('/log-out', main_controller.user_log_out);

/* Update User */
router.get('/update-user', main_controller.user_update_get);
router.post('/update-user', main_controller.user_update_post);

/* Admin Route */
router.get('/giveadminpls', main_controller.user_update_admin_get);
router.post('/giveadminpls', main_controller.user_update_admin_post);

/* Post Message */
router.get('/new-message', main_controller.message_create_get);
router.post('/new-message', main_controller.message_create_post);

/* Delete Message */
router.post('/delete-msg/:id', main_controller.message_delete);

module.exports = router;
