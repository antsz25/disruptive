const db = require('../database/db');

async function createTopic(data){
    return await db.createTopic(data);
}
async function deleteTopic(data){
    return await db.deleteTopic(data);
}
async function getTopics(){
    return await db.getTopics();
}
async function getTopicByName(name){
    return await db.getTopicByName(name);
}
module.exports = {
    createTopic,
    deleteTopic,
    getTopics,
    getTopicByName
}