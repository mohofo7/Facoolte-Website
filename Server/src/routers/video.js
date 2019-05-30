const express = require('express')
const request = require('request')
const path = require('path')
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()

getSubject = (desc) => {
    return desc.slice(0, desc.indexOf("|"))
}
getTeacher = (desc) => {
    desc = desc.slice(desc.indexOf("|") + 1)
    return desc.slice(0, desc.indexOf("|"))
}
getPrice = (desc) => {
    desc = desc.slice(desc.indexOf("|") + 1)
    desc = desc.slice(desc.indexOf("|") + 1)
    return desc.slice(0, desc.indexOf("|"))
}
getDescribe = (desc) => {
    desc = desc.slice(desc.indexOf("|") + 1)
    desc = desc.slice(desc.indexOf("|") + 1)
    desc = desc.slice(desc.indexOf("|") + 1)
    return desc
}

router.get('/videos', async (req, res) => {
    let options = {
        url: 'https://napi.arvancloud.com/vod/2.0/channels/7040f4fa-a249-4836-b140-6e2a85552463/videos',
        headers: {
            'Authorization': 'Apikey 5e93a343-3215-477e-80b6-ba30ba83c2ed',
            'accept': 'application/json'
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data = []
            info.data.forEach(element => {
                data.push({
                    id:element.id,
                    title:element.title,
                    description:getDescribe(element.description),
                    thumbnail_url:element.thumbnail_url
                })
            });
            res.status(200).send(JSON.stringify(data))
        } else res.status(400)
    }
    await request.get(options, callback)
})

router.get('/video/:videoID', auth, async (req , res) => {
    let url = 'https://napi.arvancloud.com/vod/2.0/videos/'.concat(req.params.videoID)
    let options = {
        url: url,
        headers: {
            'Authorization': 'Apikey 5e93a343-3215-477e-80b6-ba30ba83c2ed',
            'accept': 'application/json'
        }
    };

    
    async function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            const user = await User.findOne({email: req.user.email , 'videos.video' : info.data.id})
            var data = {
                id: info.data.id,
                title: info.data.title,
                description: getDescribe(info.data.description),
                thumbnail_url: info.data.thumbnail_url,
                price: getPrice(info.data.description),
                teacher: getTeacher(info.data.description),
                permit: false
            }
            if(user){
                data = {
                    id: info.data.id,
                    title: info.data.title,
                    description: getDescribe(info.data.description),
                    thumbnail_url: info.data.thumbnail_url,
                    price: getPrice(info.data.description),
                    teacher: getTeacher(info.data.description),
                    permit: true,
                    video_url: info.data.video_url
                }
            }
            res.status(200).send(JSON.stringify(data))
        }
    }
    await request.get(options, callback)
})

router.get('/buyVideo/:videoID', auth,async (req, res)=>{
    
    let url = 'https://napi.arvancloud.com/vod/2.0/videos/'.concat(req.params.videoID)
    let options = {
        url: url,
        headers: {
            'Authorization': 'Apikey 5e93a343-3215-477e-80b6-ba30ba83c2ed',
            'accept': 'application/json'
        }
    };


    async function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            let price =  getPrice(info.data.description)

            if(req.user.getCredit()*1000 >= price){
                await req.user.spendCredit(price/1000)
                await req.user.addNewVideo(info.data.id)
                res.status(200).send("successful")
            }
            else{
                res.status(406).send()
            }
        }
    }
    await request.get(options, callback)
})

module.exports = router