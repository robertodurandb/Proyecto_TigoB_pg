const ordentrabajoService = require('../services/ordentrabajoService')

const getOrdentrabajo = async(req, res) => {
    try {
        const ordentrabajo = await ordentrabajoService.getOrdentrabajo();
        res.status(201).json(ordentrabajo)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getOrdentrabajoById = async(req, res) => {
    const {id} = req.params;
    try {
        const ordentrabajo = await ordentrabajoService.getOrdentrabajoById(id);
        if (!ordentrabajo) {
            return res.status(404).json({message: 'OT no encontrado'})
        }
        res.status(201).json(ordentrabajo)
        console.log("si se encontro el ordentrabajo: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createOrdentrabajo = async(req, res) => {
    try { 
        const ordentrabajoData = req.body;
        const newOrdentrabajo = await ordentrabajoService.createOrdentrabajo(ordentrabajoData);
        res.status(201).json(newOrdentrabajo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateOrdentrabajo = async(req, res) => {
    try { 
        const id = req.params;
        const ordentrabajoData = req.body;
        const ordentrabajoUpdate = await ordentrabajoService.updateOrdentrabajo(id,ordentrabajoData);
        
        res.status(201).json(ordentrabajoUpdate);
        console.log("se actualizo el OT en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getOrdenesSinInsta = async(req, res) => {
    try {
        const contratos = await ordentrabajoService.getOrdenesSinInsta();
        res.status(201).json(contratos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getOrdenesConInsta = async(req, res) => {
    try {
        const contratos = await ordentrabajoService.getOrdenesConInsta();
        res.status(201).json(contratos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const getOrdenesConInstaForUser = async(req, res) => {
    const {id} = req.params;
    try {
        const ordentrabajo = await ordentrabajoService.getOrdenesConInstaForUser(id);
        if (!ordentrabajo) {
            return res.status(404).json({message: 'Usuario no registra ninguna instalación'})
        }
        res.status(201).json(ordentrabajo)
        console.log("si se encontro el usuario: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}


module.exports = {
    getOrdentrabajo, getOrdentrabajoById, createOrdentrabajo, updateOrdentrabajo, getOrdenesSinInsta, getOrdenesConInsta, getOrdenesConInstaForUser
}