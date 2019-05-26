const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const videoRouter = require('./routers/video')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8400

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(videoRouter)

app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})