const db = require('../database/db');

async function createUser(data){
    return await db.createUser(data);
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
async function deleteUserByEmail(email){
    return await db.deleteUserByEmail(email);
}
async function deleteUserByUsername(username){
    return await db.deleteUserByUsername(username);
}

module.exports = {
    createUser,
    getUsers,
    getUserByEmail,
    getUserByUsername,
    UpdateUserByEmail,
    UpdateUserByUsername,
    deleteUserByEmail,
    deleteUserByUsername
}
