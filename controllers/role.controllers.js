const rolSchema = require('../models/Roles')


exports.createRole = async(req, res)=>{
    const {rolName} = req.body
    console.log(rolName)
    rolSchema.findOne({rolName}).exec((err, data)=>{
        if(err){
            console.log(err)
            return res.status(400).json({'message':'something goes wrong'})
        }
        if(data){
            console.log(data)
            return res.status(400).json({'message':'the role already exists'})
        }
        const newRol = new rolSchema({rolName})
        newRol.save((err, data)=>{
            if(err){
                console.log('bloque1 ', err)
                return res.status(400).json({'message':'something goes wrong'})
            }
            return res.status(200).json({'message':'the role was successfully created'})
        })
    })
}

exports.getRoles = (req, res)=>{
    rolSchema.find().exec((err, data)=>{
        if(err){
            console.log('Bloque1')
            console.log(err)
            return res.status(400).json({'message':'something goes wrong'})
        }
        return res.json(data)})
        
    
}