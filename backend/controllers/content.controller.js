const service = require('../services/content.service');
const schema = require('../models/content.model');
const jwtVerify = require('../utils/jwt.util');
const createContent = async (req, res) => {
    try{
        let {error, value} = schema.validate(req.body);
        if(error){
            return res.status(400).send(JSON.stringify({error: error.message}));
        }
        let result = await service.createContent(value);
        return res.status(201).send(JSON.stringify(result));
    } catch (error) {
        return res.status(500).send(JSON.stringify({error: error.message}));
    }
}
const getContents = async (req, res) => {
    try{
        let result = await service.getContents();
        return res.status(200).send(JSON.stringify(result));
    }catch(err){
        return res.status(500).send(JSON.stringify({error: err.message}));
    }
}
const getContentsByTopic = async (req, res) => {
    try{
        let result = await service.getContentsByTopic(req.params.topic);
        return res.status(200).send(JSON.stringify(result));
    }catch(err){
        return res.status(500).send(JSON.stringify({error: err.message}));
    }
}
const getContentsByUsername = async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const user = await jwtVerify.CheckToken(token);
        let result = await service.getContentsByUsername(user.username);
        return res.status(200).send(JSON.stringify(result));
    }catch(err){
        return res.status(500).send(JSON.stringify({error: err.message}));
    }
}
const getContentById = async (req, res) => {
    try{
        let result = await service.getContentById(req.params.id);
        return res.status(200).send(JSON.stringify(result));
    }catch(err){
        return res.status(500).send(JSON.stringify({error: err.message}));
    }
}
const updateContentById = async (req, res) => { // Toca arreglarlo
    try{
        let {error, value} = schema.validate(req.body);
        if(error){
            return res.status(400).send(JSON.stringify({error: error.message}));
        }
        let result = await service.updateContentById(req.params.id, value);
        return res.status(200).send(JSON.stringify(result));
    }catch(err){
        return res.status(500).send(JSON.stringify({error: err.message}));
    }
}
const deleteContentById = async (req, res) => {
    try{
        let result = await service.deleteContentById(req.params.id);
        return res.status(200).send(JSON.stringify(result));
    }catch(err){
        return res.status(500).send(JSON.stringify({error: err.message}));
    }
}
module.exports = {
    createContent,
    getContents,
    getContentsByTopic,
    getContentsByUsername,
    getContentById,
    updateContentById,
    deleteContentById
}
