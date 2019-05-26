const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        required: true,
        minlength: 6,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        },
        lowercase: true
    },
    credit: {
        type: Number,
        default: 0
    },
    tokens:[{
        token: {
            type: String,
            required: true,

        }
    }]
})

userSchema.methods.getPublicProfile = function () {

    const user = this
    const userObject = user.toObject()
    
    delete userObject.tokens
    delete userObject.password

    return userObject
}

userSchema.methods.generateAuthToken = async function(){

    const user = this
    const token = jwt.sign({ _id: user._id.toString() } , 'thisismohofo')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (username , password)=>{
    const user = await User.findOne({username})
    if(!user){
        throw new Error('Unable to login!')
    }
    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch){
        throw new Error('Unable to Login!')
    }

    return user
}

userSchema.pre('save' , async function (next) {

    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User