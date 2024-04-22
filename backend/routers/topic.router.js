const router = require('express').Router();
const controller = require('../controllers/topic.controller');
const multer = require('multer');
const topicMiddleware = require('../Middlewares/topic.middleware');
const sessionMiddleware = require('../Middlewares/session.middleware');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'thumbnails/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({storage: storage});
//POST
router.post('/topic',topicMiddleware.verifyAdmin, upload.single('thumbnail'), controller.createTopic);
//GET
router.get('/',sessionMiddleware.verifySession, controller.getTopics);
//DELETE
router.delete('/topic/:name',upload.none(),topicMiddleware.verifyAdmin, controller.deleteTopic);

module.exports = router;
