const connectToMongo= require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json())    //to use request.body , you’ll have to use a middleware - app.use()

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/api/v1/login', (req, res) => {
//     res.send('Hello login!')
// })

// app.get('/api/v1/signup', (req, res) => {
//     res.send('Hello signup!')
// })

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})