const jwt = require('jsonwebtoken');
require('dotenv').config();

async function CreateToken(payload){
    const tokenActive = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'});
    const tokenRefresh = jwt.sign(payload, process.env.SECRET, {expiresIn: '24h'});
    return ({tokenActive, tokenRefresh});
}
async function RefreshToken(token){
    try{
        const payload = jwt.verify(token, process.env.SECRET);
        if(payload){
            if(payload.exp <= Math.floor(Date.now()/ 1000)){
                return null;
            }
            const newPayload = {user: payload.user, role: payload.role};
            return jwt.sign(newPayload, process.env.SECRET, {expiresIn: '1h'});
        }
    }catch(err){
        console.log(err.message);
        return null;
    }
}
async function CheckToken(token){
    try{
        return jwt.verify(token, process.env.SECRET);
    }catch(err){
        return err.message;
    }
}

module.exports = {
    CreateToken,
    CheckToken,
    RefreshToken
}
