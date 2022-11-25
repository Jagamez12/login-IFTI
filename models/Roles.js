const mongoose = require('mongoose')


const rolSchema = new mongoose.Schema({
    
    rolName: { type: String, unique: true}
})

module.exports = mongoose.model('Role', rolSchema)