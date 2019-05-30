const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users/register', async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user , token})
    } catch (e) {
        res.status(401).send(e)
    }
})

router.post('/users/login', async (req, res)=>{

    try{
        const user = await User.findByCredentials(req.body.username , req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user: user.getPublicProfile() , token})
    }catch(e){
        res.status(404).send(e)
    }
})

router.post('/logout', auth, async (req, res)=> {
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.status(200).send('loged out!')
    }catch(e){
        res.status(500).send('cant log out!')
    }
})

router.get('/users/checkToken', auth, async (req , res) => {
    res.status(200).send({user: req.user.getPublicProfile()})
})
module.exports = router