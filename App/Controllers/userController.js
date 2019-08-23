const express = require('express')
const router = express.Router()
const _ = require('lodash')
const {User} = require('../Models/user')
const {authenticateUser} = require('../Middlewares/authentication')

//localhost:3007/users/register
router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})

//localhost:3007/users/login
router.post('/login', (req, res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then((user) => {
            return user.generateToken()
            //res.send(user)
        })
        .then((token) =>  {
            res.send({token})
            res.send(_.pick(user, ['_id', 'username', 'email', 'createdAt']))
           //res.setHeader('x-auth', token).send()
           //res.send(token)
        })
        .catch((err) => {
            res.send(err)
        })
})

//localhost:3007/users/account
router.get('/account',authenticateUser, (req, res) => {
    const {user} = req
    res.send(user)
    res.send(_.pick(user, ['_id', 'username', 'email', 'createdAt']))
})

//localhost:3007/users/logout
router.delete('/logout', authenticateUser, (req, res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, {$pull:{tokens:{token:token}}})
        .then(() => {
            res.send({notice : 'Successfully logged out'})
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
   userRouter : router
}