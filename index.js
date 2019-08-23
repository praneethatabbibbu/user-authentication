const express = require('express')
const cors = require('cors')
const {mongoose} = require('./Config/database')
const {userRouter} = require('./App/Controllers/userController')

const port = 3007
const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.send('welcome to my app')
})

app.listen(port, () => {
    console.log('listening on port', port)
})
