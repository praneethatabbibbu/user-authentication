const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/user-authentication-task', {useNewUrlParser : true})
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error in connecting to db', err)
    })
module.exports = {
    mongoose
}