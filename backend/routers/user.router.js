const router = require('express').Router();
const controller = require('../controllers/user.controller');
const middlewareSessions = require('../Middlewares/session.middleware');
const multer = require('multer');
const upload = multer();

//POST REQUESTS
router.post('/create', upload.none(), controller.createUser);
router.post('/login', upload.none(), controller.LoginUsuario);
router.post('/token', middlewareSessions.verifyCookieSession, controller.refreshToken);
//GET REQUESTS
router.get('/', middlewareSessions.verifySession, controller.getUsers);
router.get('/me', middlewareSessions.verifySession, controller.getMe);
router.get('/email/:email', middlewareSessions.verifySession,controller.getUserByEmail);
router.get('/user/:username', middlewareSessions.verifySession,controller.getUserByUsername);

//PUT REQUESTS
router.put('/email/:email', middlewareSessions.verifySession, controller.UpdateUserByEmail);
router.put('/user/:username', middlewareSessions.verifySession, controller.UpdateUserByUsername);
//DELETE REQUESTS
router.delete('/logout', upload.none(), middlewareSessions.verifySession, controller.LogoutUsuario);
router.delete('/:username', upload.none(),middlewareSessions.verifySession, controller.deleteUserByUsername);

module.exports = router;