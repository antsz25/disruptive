const service = require('../services/user.service');
const schema = require('../models/user.model');
const bcrypt = require('../utils/bcrypt.util');
const jwtCreator = require('../utils/jwt.util');

const createUser = async (req, res) => {
    try{
    let {error, value} = schema.validate(req.body);
    if(error){
        return res.status(400).send(error.message);
    }    
    if(await service.getUserByUsername(value.username)){
        return res.status(400).send('Username already exists');
    }
    if(await service.getUserByEmail(value.email)){
        return res.status(400).send('Email already exists');
    }
    value.password = await bcrypt.hashPassword(value.password);
    let result = await service.createUser(value);
    return res.status(201).send('User created');
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const LoginUsuario = async (req, res) => {
    try{
        async function CheckForUser(req){ // Check for user by email or username
            let result = await service.getUserByEmail(req.body.data);
            if(result){
                return result;
            }
            result = await service.getUserByUsername(req.body.data);
            if(result){
                return result;
            }
            return null;
        }
        let user = await CheckForUser(req); // Retrieve user from database
        if(!user){
            return res.status(404).send('User not found');
        }
        if(!await bcrypt.CheckHash(req.body.password, user.password)){
            return res.status(404).send('User not found');
        }
        const token = await jwtCreator.CreateToken({user: user.username, role: user.role});
        res.set({
            'Authorization': `Bearer: ${token.tokenActive}`,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Set-Cookie': `token=${token.tokenRefresh}; HttpOnly; Max-Age=${24*60*60*1000}; SameSite=Lax;`
        });
        await service.LoginUsuario({token: token.tokenRefresh});
        return res.status(200).send(user.role);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const LogoutUsuario = async (req, res) => {
    try{
        const result = await service.LogoutUsuario(req.cookies.token);
        if(result.deletedCount === 0){
            return res.status(404).send('Session not found');
        }
        res.clearCookie('token', {path:'/users'});
        return res.status(200).send('Session deleted');
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const getMe = async (req, res) => {
    try{
        let token = req.headers.authorization.split(' ')[1];
        const user = await jwtCreator.CheckToken(token);
        const result = await service.getMe(user.user);
        if(!result){
            return res.status(404).send('User not found');
        }
        result.password = undefined;
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const refreshToken = async (req, res) => {
    try{
        let refresh = req.cookies.token;
        let newToken = await jwtCreator.RefreshToken(refresh);
        if(!newToken){
            return res.status(401).send('Unauthorized');
        }
        return res.status(200).send(JSON.stringify({token: newToken}));
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const getUsers = async (req, res) => {
    try{
        let result = await service.getUsers();
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const getUserByEmail = async (req, res) => {
    try{
        let result = await service.getUserByEmail(req.params.email);
        if(!result){
            return res.status(404).send('User not found');
        }
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const getUserByUsername = async (req, res) => {
    try{
        let result = await service.getUserByUsername(req.params.username);
        if(!result){
            return res.status(404).send('User not found');
        }
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const UpdateUserByEmail = async (req,res) =>{
    try{
        const result = await service.UpdateUserByEmail(req.params.email, req.body);
        if(result.modifiedCount === 0){
            return res.status(404).send('User not found');
        }
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const UpdateUserByUsername = async (req,res) =>{
    try{
        const result = await service.UpdateUserByUsername(req.params.username, req.body);
        if(result.modifiedCount === 0){
            return res.status(404).send('User not found');
        }
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
const deleteUserByUsername = async (req,res) =>{
    try{
        const result = await service.deleteUserByUsername(req.params.username);
        if(result.deletedCount === 0){
            return res.status(404).send('User not found');
        }
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

module.exports = {
    createUser,
    LoginUsuario,
    getUsers,
    getUserByEmail,
    getUserByUsername,
    UpdateUserByEmail,
    UpdateUserByUsername,
    deleteUserByUsername,
    LogoutUsuario,
    getMe,
    refreshToken
}