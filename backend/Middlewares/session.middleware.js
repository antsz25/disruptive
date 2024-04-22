const jwtVerify = require('../utils/jwt.util');
const verifySession = async (req, res, next) => {
    try{
        let token = req.headers.authorization;
        if(!token){
            return res.status(401).send('Unauthorized');
        }
        if(!token.startsWith('Bearer')){
            return res.status(401).send('Unauthorized');
        }

        token = token.split(' ')[1];
        const result = await jwtVerify.CheckToken(token);
        if(result){
            if(result.exp <= Math.floor(Date.now()/ 1000) || result.exp === undefined){
                return res.status(401).send('Token expired');
            }
            next();
        }else{
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        return res.status(401).send(err.message);
    }
}
const verifyCookieSession = async (req, res, next) => {
    try{
        let token = req.cookies.token;
        if(!token){
            return res.status(401).send('Unauthorized');
        }
        const result = await jwtVerify.CheckToken(token);
        if(result){
            if(result.exp <= Math.floor(Date.now()/ 1000) || result.exp === undefined){
                return res.status(401).send('Token expired');
            }
            next();
        }else{
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        return res.status(401).send(err.message);
    }
}
module.exports = {
    verifySession,
    verifyCookieSession
}