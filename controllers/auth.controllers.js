const userSchema = require('../models/Users')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    const { username, email, password, roles } = req.body
    const userExist = await userSchema.findOne({ 'username': username })
    const emailExist = await userSchema.findOne({'email': email})
    if(userExist||emailExist){ return res.status(400).json({'message':'the username or email already exists'})}
    const hashedPassword = await userSchema.encryptPassword(password)
    const newUser = new userSchema({
        username,
        email,
        'password': hashedPassword,
    })
    if(roles){
        newUser.roles = [...roles]
    }else{
        newUser.roles = ["6368d8701a0daa2e9e3122f0"]
    }

    const savedUser = await newUser.save()
    console.log(savedUser)
    return res.status(200).json({'message': 'the user was saved successfully'})
}

exports.signin = async (req, res) => {
    const { username, password } = req.body
    const user = await userSchema.findOne({ 'username': username })
    if (!user) {
        return res.status(404).json({ 'message': 'The user does not exist' })
    }
    const validate = await userSchema.comparePassword(user.password, password).then(value => { return value })
    if (!validate) {
        return res.status(400).json({ 'message': 'The password is incorrect' })
    }
    const token = jwt.sign({user:user._id}, 'HMC2CA', {expiresIn: 86400})
    return res.status(200).json({token: token})
}

