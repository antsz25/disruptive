const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const _url = process.env.DATABASE_URL;
const _dbName = process.env.DATABASE_NAME;

const connection = new MongoClient(_url);
const dbcon = connection.db(_dbName, {useUnifiedTopology: true});

//UserLogic Functions
async function createUser(data){
    const result = await dbcon.collection('users').insertOne(data);
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
async function deleteUserByEmail(email){
    const result = await dbcon.collection('users').deleteOne({email});
    return result;
}
async function deleteUserByUsername(username){
    const result = await dbcon.collection('users').deleteOne({username});
    return result;
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
