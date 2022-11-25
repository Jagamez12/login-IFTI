const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: 'Role',
        type: mongoose.Schema.Types.ObjectId    
    }]
})

userSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}
userSchema.statics.comparePassword = async(password, receivedPassword)=>{
    
    return await bcrypt.compare(receivedPassword, password)

}
module.exports =  mongoose.model('User', userSchema)