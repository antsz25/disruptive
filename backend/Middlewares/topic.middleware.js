const jwtVerify = require('../utils/jwt.util');

const verifyAdmin = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwtVerify.CheckToken(token);
    if (decoded.role === 'admin') {
        next();
    } else {
        res.status(403).json({message: 'Forbidden'});
    }
}
module.exports = {
    verifyAdmin
}