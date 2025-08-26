const historicoService = require('../services/historicoService')

const createHistoricoCajas = async(req, res) => {
    try { 
        const Data = req.body;
        const newHistoricoCajas = await historicoService.createHistoricoCajas(Data);
        res.status(201).json(newHistoricoCajas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const createHistoricoEquipos = async(req, res) => {
    try { 
        const Data = req.body;
        const newHistoricoEquipos = await historicoService.createHistoricoEquipos(Data);
        res.status(201).json(newHistoricoEquipos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createHistoricoPlanes = async(req, res) => {
    try { 
        const Data = req.body;
        const newHistoricoPlanes = await historicoService.createHistoricoPlanes(Data);
        res.status(201).json(newHistoricoPlanes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createHistoricoDiaPago = async(req, res) => {
    try { 
        const Data = req.body;
        const newHistoricoDiaPago = await historicoService.createHistoricoDiaPago(Data);
        res.status(201).json(newHistoricoDiaPago);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getHistoricoCajas = async(req, res) => {
    try {
        const historicoCajas = await historicoService.getHistoricoCajas();
        res.status(201).json(historicoCajas)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const getHistoricoEquipos = async(req, res) => {
    try {
        const historicoEquipos = await historicoService.getHistoricoEquipos();
        res.status(201).json(historicoEquipos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const getHistoricoPlanes = async(req, res) => {
    try {
        const historicoPlanes = await historicoService.getHistoricoPlanes();
        res.status(201).json(historicoPlanes)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const getHistoricoDiaPago = async(req, res) => {
    try {
        const historicoDiaPago = await historicoService.getHistoricoDiaPago();
        res.status(201).json(historicoDiaPago)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

module.exports = {
    createHistoricoCajas, createHistoricoEquipos, createHistoricoPlanes, createHistoricoDiaPago, getHistoricoCajas, getHistoricoEquipos, getHistoricoPlanes, getHistoricoDiaPago
}