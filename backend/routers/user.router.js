const router = require('express').Router();
const controller = require('../controllers/user.controller');
const multer = require('multer');
const upload = multer();

//POST REQUESTS
router.post('/create', upload.none(), controller.createUser);

//GET REQUESTS
router.get('/', controller.getUsers);
router.get('/:email', controller.getUserByEmail);
router.get('/:username', controller.getUserByUsername);

//PUT REQUESTS
router.put('/:email', upload.none(), controller.UpdateUserByEmail);
router.put('/:username', upload.none(), controller.UpdateUserByUsername);

//DELETE REQUESTS
router.delete('/:email', controller.deleteUserByEmail);
router.delete('/:username', controller.deleteUserByUsername);

module.exports = router;