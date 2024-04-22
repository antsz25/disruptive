const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const _url = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_NAME}.7rlga4b.mongodb.net/?retryWrites=true&w=majority&appName=${DATABASE_NAME}`;
const connection = new MongoClient(_url);
const dbcon = connection.db(DATABASE_NAME, {useUnifiedTopology: true});
//UserLogic Functions
async function createUser(data){
    const result = await dbcon.collection('users').insertOne(data);
    return result;
}
async function LogoutUsuario(token){
    const result = await dbcon.collection('sessions').deleteOne({token});
    return result;
}
async function LoginUsuario(data){
    const result = await dbcon.collection('sessions').insertOne(data);
    return result;
}
async function getUsers(){
    const result = await dbcon.collection('users').find().toArray();
    return result;
}
async function getUserByEmail(email){
    const result = await dbcon.collection('users').findOne({email: email});
    return result;
}
async function getUserByUsername(username){
    const result = await dbcon.collection('users').findOne({username: username});
    return result;
}
async function UpdateUserByEmail(email, data){
    const result = await dbcon.collection('users').updateOne({email},{ $set: data });
    return result;
}
async function UpdateUserByUsername(username, data){
    const result = await dbcon.collection('users').updateOne({username}, { $set: data });
    return result;
}
async function deleteUserByUsername(username){
    const result = await dbcon.collection('users').deleteOne({username});
    return result;
}
async function getMe(token){
    const result = await getUserByUsername(token);
    return result;
}
//ContentLogic Functions
async function createContent(data){
    const result = await dbcon.collection('content').insertOne(data);
    return result;
}
async function getContents(){
    const result = await dbcon.collection('content').find().sort({createdAt: -1}).toArray();
    return result;
}
async function getContentById(id){
    const result = await dbcon.collection('content').findOne({_id: ObjectId(id)});
    return result;
}
async function getContentsByTopic(topic){
    const result = await dbcon.collection('content').find({topic: topic}).sort({createdAt: -1}).toArray();
    return result;
}
async function getContentsByUsername(username){
    const result = await dbcon.collection('content').find({author: username}).sort({createdAt: -1}).toArray();
    return result;
}
async function updateContentById(id, data){
    const result = await dbcon.collection('content').updateOne({_id: ObjectId(id)},{ $set: data });
    return result;
}
async function deleteContentById(id){
    const result = await dbcon.collection('content').deleteOne({_id: ObjectId(id)});
    return result;
}
//Topic Logic Functions
async function createTopic(data){
    const result = await dbcon.collection('topics').insertOne(data);
    return result;
}
async function deleteTopic(name){
    const result = await dbcon.collection('topics').deleteOne({name});
    return result;
}
async function getTopics(){
    const result = await dbcon.collection('topics').find().toArray();
    return result;
}
async function getTopicByName(name){
    const result = await dbcon.collection('topics').findOne({
        name: name
    });
    return result;
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
    createContent,
    getContents,
    getContentById,
    getContentsByTopic,
    getContentsByUsername,
    updateContentById,
    deleteContentById,
    createTopic,
    deleteTopic,
    getTopics,
    getTopicByName
}
