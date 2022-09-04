import express from 'express'
// import mongoose from 'mongoose'

const PORT = process.env.PORT || 3000

const app = express()

// lpFc6OGNZy1jrx4I
async function start(){

    // await mongoose.connect('mongodb+srv://hugeMordor:lpFc6OGNZy1jrx4I@cluster0.4mxpg8p.mongodb.net/todos', {
    //     useNewUrlParser: true, 
    //     useFindAndModify: false
    // })
    app.get('/', (req, res) => {
        res.send('TEST')
    })
    app.listen(PORT, () =>{
        console.log(`Server started on ${PORT}...`)
    })
}

start()