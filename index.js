const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()


app.use(morgan('dev'))
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hola Mundo!')
    console.log("Si inicio")
})
// Routes
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/roles', require('./routes/role.route'))

app.use('/linea', (req, res)=>{
    res.send('No se puede hacer un culooo')
})

// Port and app started
app.listen(3000, ()=>{
    console.log('Esto esta funcionando')
})
// Database 
mongoose.connect('mongodb://localhost/usersdb')
    .then(db => console.log('Db is conected'))
    .catch(err => console.log(err))