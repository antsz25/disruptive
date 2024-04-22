const router = require('express').Router();
const controller = require('../controllers/content.controller');
const multer = require('multer');
const contentMiddleware = require('../Middlewares/content.middleware');
const sessionMiddleware = require('../Middlewares/session.middleware');
// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({storage: storage});
//POST
router.post('/content', sessionMiddleware.verifySession, contentMiddleware.verifyUser,upload.single('file'), controller.createContent);
//GET
router.get('/', sessionMiddleware.verifySession, controller.getContents);
router.get('/me', sessionMiddleware.verifySession, controller.getContentsByUsername);
//PUT

//DELETE

module.exports = router;
