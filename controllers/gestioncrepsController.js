const gestioncrepsService = require('../services/gestioncrepsService')
const multer = require('multer')

const getCrepsPendientes = async(req, res) => {
    try {
        const creps_pendientes = await gestioncrepsService.getCrepsPendientes();
        res.status(201).json(creps_pendientes)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const getCrepsTerminados = async(req, res) => {
    try {
        const creps_terminados = await gestioncrepsService.getCrepsTerminados();
        res.status(201).json(creps_terminados)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const getCrepsCancelados = async(req, res) => {
    try {
        const creps_cancelados = await gestioncrepsService.getCrepsCancelados();
        res.status(201).json(creps_cancelados)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const updateCreps = async(req, res) => {
    try { 
        const id = req.params;
        const Data = req.body;
        const crepsUpdate = await gestioncrepsService.updateCreps(id,Data);
        
        res.status(201).json(crepsUpdate);
        console.log("se actualizo el CREP EN CONTROLLER")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getCrepsPendientes, getCrepsTerminados, getCrepsCancelados, updateCreps
}