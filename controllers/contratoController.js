const contratoService = require('../services/contratoService')

const getContratos = async(req, res) => {
    try {
        const contratos = await contratoService.getContratos();
        res.status(201).json(contratos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getContratoById = async(req, res) => {
    const {id} = req.params;
    try {
        const contrato = await contratoService.getContratoById(id);
        if (!contrato) {
            return res.status(404).json({message: 'Contrato no encontrado'})
        }
        res.status(201).json(contrato)
        console.log("si se encontro el contrato: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createContrato = async(req, res) => {
    try { 
        const contratoData = req.body;
        const newContrato = await contratoService.createContrato(contratoData);
        res.status(201).json(newContrato);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateContrato = async(req, res) => {
    try { 
        const id = req.params;
        const contratoData = req.body;
        const contratoUpdate = await contratoService.updateContrato(id,contratoData);
        
        res.status(201).json(contratoUpdate);
        console.log("se actualizo el contrato en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getContratosSinInsta = async(req, res) => {
    try {
        const contratos = await contratoService.getContratosSinInsta();
        res.status(201).json(contratos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getContratosConInsta = async(req, res) => {
    try {
        const contratos = await contratoService.getContratosConInsta();
        res.status(201).json(contratos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getContratosAllInsta = async(req, res) => {
    try {
        const contratos = await contratoService.getContratosAllInsta();
        res.status(201).json(contratos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

module.exports = {
    getContratos, getContratoById, createContrato, updateContrato, getContratosSinInsta, getContratosConInsta, getContratosAllInsta
}