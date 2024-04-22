const schema = require('../models/topic.model');
const service = require('../services/topic.service');

const createTopic = async (req, res) => {
    try{
        let{error, value} = schema.validate(req.body);
        if(error){
            return res.status(400).send(JSON.stringify({error: error.message}));
        }
        if(await service.getTopicByName(value.name)){
            return res.status(400).send(JSON.stringify({error: 'Topic already exists'}));
        }
        let result = await service.createTopic(value);
        return res.status(201).send(JSON.stringify(result));
    }catch(err){
        return res.status(500).send(JSON.stringify({error: err.message}));
    }
}
const deleteTopic = async(req,res) =>{
    try{
        let result = await service.deleteTopic(req.params.name);
        return res.status(200).send(JSON.stringify(result));
    }catch(err){
        return res.status(500).send(JSON.stringify({error: err.message}));
    }
}
const getTopics = async(req,res) =>{
    try{
        let result = await service.getTopics();
        return res.status(200).send(JSON.stringify(result));
    }catch(err){
        return res.status(500).send(JSON.stringify({error: err.message}));
    }
}
const getTopicByName = async(req,res)=>{
    try{
        let result = await service.getTopicByName(req.params.name);
        if(!result) return res.status(404).send(JSON.stringify({error: 'Topic not found'}));
        return res.status(200).send(JSON.stringify(result));
    }
    catch(err){
        return res.status(500).send(JSON.stringify({error: err.message}));
    }
}
module.exports = {
    createTopic,
    deleteTopic,
    getTopics,
    getTopicByName
}