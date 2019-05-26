const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/facoolte-api', {
    useNewUrlParser : true,
    useCreateIndex : true
})
