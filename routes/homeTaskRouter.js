const express = require('express');
const router = express.Router();
const homeModel = require('../models/homeTaskModel');

//CRUD
//Create
router.post('/createTask',async(req,res)=>{
    try{
    const newTask = new homeModel(req.body);
    const saveTask = await newTask.save();
    res.status(201).json({saveTask, msg : 'La tarea fue creada con exito'})
    }catch(error){
        res.status(500).json({error: 'Error al crear la tarea'})
    }
});
//Read
router.get('/findTasks', async(req,res)=>{
    try {
        const getTasks = await homeModel.find();
        res.json(getTasks);
    } catch (error) {
        res.status(500).json({error: 'Error al encontrar las tareas'})
    }
})
router.get('/findTaskId/:id', async(req,res)=>{
    const getTaskId = req.params.id
    try {
        const task = await homeModel.findById(getTaskId);
        if(!task){
            res.status(500).json({error: 'No se encontro la tarea'})
        }else{
            res.json(task);
        }
    } catch (error) {
        res.status(500).json({error: 'Error no se encontro la tarea'})
    }
})
//Update
router.put('/updateTask/:id', async(req,res)=>{
    const taskId = req.params.id
    try {
        // Verificar si req.body no está vacío
        if (!Object.keys(req.body).length) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
        }

        const updateTask = await homeModel.findByIdAndUpdate(taskId, req.body, { new: true });

        // Verificar si la tarea se actualizó correctamente
        if (!updateTask) {
            return res.status(404).json({ error: 'No se encontró la tarea para actualizarla' });
        }

        // Enviar una respuesta con la tarea actualizada
        res.status(200).json({ task: updateTask, msg: 'Tarea actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
})
//Delete 
router.delete('/deleteTask/:id', async(req,res)=>{
    const getTaskId = req.params.id
    try {
        const deleteTask = await homeModel.findByIdAndDelete(getTaskId);
        if (!deleteTask) {
            res.status(404).json({error : 'Tarea no encontrada'});
        }else{
            res.status(200).json({deleteTask, msg: 'La tarea fue borrada con exito'})
        }
    } catch (error) {
        res.status(500).json({error: 'Error al borrar la tarea'})
    }
})

module.exports = router;