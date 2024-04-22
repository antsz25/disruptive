const jwtVerify = require('../utils/jwt.util');
const verifyUser = (req,res,next) =>{
    const token = req.headers.authorization.split(' ')[1];
    jwtVerify(token).then((user)=>{
        if(user.role === 'admin' || user.role === 'creator'){
            next();
        }
        else{
            return res.status(401).send(JSON.stringify({error: 'Unauthorized'}));
        }
    })
}
const verifyContent = (req,res,next) =>{//luego
    
    next();
}

module.exports ={
    verifyUser
}