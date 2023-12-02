require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose')

const homeTaskRoutes = require('./routes/homeTaskRouter');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

//connect with DB
mongoose.connect(MONGO_URI)

//Rutas
app.use ('/homeTask', homeTaskRoutes);

//Endpoint seguro
app.get('/', (req,res)=>{
    res.status(200).json({msg : 'Servidor funcionando'})
})

//se corre el servidor
app.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`);
})