const ordentrabajoService = require('../services/ordentrabajoService')

const getOrdentrabajo = async(req, res) => {
    try {
        const sedeFilter = req.sedeFilter; //Del middleware de sede
        const ordentrabajo = await ordentrabajoService.getOrdentrabajo(sedeFilter);
        res.status(201).json(ordentrabajo)
        console.log('si se encontro los clientes de la sede '+sedeFilter)
        
    } catch (error) {
        res.status(400).json({ error: error.message });
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
        console.log(ordentrabajo)
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
        const sedeFilter = req.sedeFilter; // Del middleware de sede
        const contratos = await ordentrabajoService.getOrdenesSinInsta(sedeFilter);
        res.status(201).json(contratos)
        console.log('si se encontro las ordenes sin instalación de la sede '+sedeFilter)
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
}
const getOrdenesConInsta = async(req, res) => {
    try {
        const sedeFilter = req.sedeFilter; // Del middleware de sede
        const contratos = await ordentrabajoService.getOrdenesConInsta(sedeFilter);
        res.status(201).json(contratos)
        console.log('si se encontro las ordenes con instalación de la sede '+sedeFilter)
        
    } catch (error) {
         res.status(400).json({ error: error.message });
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
        console.log(ordentrabajo)
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