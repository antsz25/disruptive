const db = require('../database/db');

async function createContent(data){
    return await db.createContent(data);
}
async function getContents(){
    return await db.getContents();
}
async function getContentsByTopic(topic){
    return await db.getContentsByTopic(topic);
}
async function getContentsByUsername(username){
    return await db.getContentsByUsername(username);
}
async function getContentById(id){
    return await db.getContentById(id);
}
async function updateContentById(id, data){
    return await db.updateContentById(id, data);
}
async function deleteContentById(id){
    return await db.deleteContentById(id);
}
module.exports = {
    createContent,
    getContents,
    getContentById,
    getContentsByTopic,
    getContentsByUsername,
    updateContentById,
    deleteContentById
}