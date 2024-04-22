const db = require('../database/db');

async function createUser(data){
    return await db.createUser(data);
}
async function LoginUsuario(data){
    return await db.LoginUsuario(data);
}
async function LogoutUsuario(token){
    return await db.LogoutUsuario(token);
}
async function getUsers(){
    return await db.getUsers();
}
async function getUserByEmail(email){
    return await db.getUserByEmail(email);
}
async function getUserByUsername(username){
    return await db.getUserByUsername(username);
}
async function UpdateUserByEmail(email, data){
    return await db.UpdateUserByEmail(email, data);
}
async function UpdateUserByUsername(username, data){
    return await db.UpdateUserByUsername(username, data);
}
async function deleteUserByUsername(username){
    return await db.deleteUserByUsername(username);
}
async function getMe(token){
    return await db.getMe(token);
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
    getMe
}
