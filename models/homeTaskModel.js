const mongoose = require('mongoose');

//Schemas
const homeTaskSchema = new mongoose.Schema({
    name : String,
    Descripcion : String,
    creationDate : Date,
    Status : {
        type: String,
        enum : ['Pendiente', 'In procces', 'Complete'],
        default : 'Pendiente',
    },
})
//Modelos
const homeTaskModel = new mongoose.model('homeTask', homeTaskSchema);
//exportar modelo
module.exports = homeTaskModel;