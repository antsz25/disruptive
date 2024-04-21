const service = require('../services/user.service');
const schema = require('../models/user.model');

const createUser = async (req, res) => {
    try{
    let {error, value} = schema.validate(req.body);
    if(error){
        return res.status(400).send(error);
    }    
    if(await service.getUserByUsername(value.username)){
        return res.status(400).send('Username already exists');
    }
    if(await service.getUserByEmail(value.email)){
        return res.status(400).send('Email already exists');
    }
    let result = await service.createUser(value);
    return res.status(201).send(result);
    }catch(err){
        return res.status(500).send(err);
    }
}
const getUsers = async (req, res) => {
    try{
        let result = await service.getUsers();
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err);
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
        return res.status(500).send(err);
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
        return res.status(500).send(err);
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
        return res.status(500).send(err);
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
        return res.status(500).send(err);
    }
}
const deleteUserByEmail = async (req,res) =>{
    try{
        const result = await service.deleteUserByEmail(req.params.email);
        if(result.deletedCount === 0){
            return res.status(404).send('User not found');
        }
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err);
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
        return res.status(500).send(err);
    }
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