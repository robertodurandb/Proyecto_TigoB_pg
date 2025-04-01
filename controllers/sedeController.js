const sedeService = require('../services/sedeService')

const getSedes = async(req, res) => {
    try {
        const sedes = await sedeService.getSedes();
        res.status(201).json(sedes)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getSedeById = async(req, res) => {
    const {id} = req.params;
    try {
        const sede = await sedeService.getSedeById(id);
        if (!sede) {
            return res.status(404).json({message: 'Sede no encontrado'})
        }
        res.status(201).json(sede)
        console.log("si se encontro sede: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createSede = async(req, res) => {
    try { 
        const Data = req.body;
        const newSede = await sedeService.createSede(Data);
        res.status(201).json(newSede);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateSede = async(req, res) => {
    try { 
        const id = req.params;
        const Data = req.body;
        const sedeUpdate = await sedeService.updateSede(id, Data);
        
        res.status(201).json(sedeUpdate);
        console.log("se actualizo la Sede en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createSede, updateSede, getSedes, getSedeById
}