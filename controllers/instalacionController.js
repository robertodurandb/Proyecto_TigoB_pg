const instalacionService = require('../services/instalacionService')

const getInstalaciones = async(req, res) => {
    try {
        const instalaciones = await instalacionService.getInstalaciones();
        res.status(201).json(instalaciones)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getInstalacionById = async(req, res) => {
    const {id} = req.params;
    try {
        const instalacion = await instalacionService.getInstalacionById(id);
        if (!instalacion) {
            return res.status(404).json({message: 'Instalacion no encontrada'})
        }
        res.status(201).json(instalacion)
        console.log("si se encontro la instalacion: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createInstalacion = async(req, res) => {
    try { 
        const Data = req.body;
        const newInstalacion = await instalacionService.createInstalacion(Data);
        res.status(201).json(newInstalacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateInstalacion = async(req, res) => {
    try { 
        const id = req.params;
        const Data = req.body;
        const instalacionUpdate = await instalacionService.updateInstalacion(id,Data);
        
        res.status(201).json(instalacionUpdate);
        console.log("se actualizo la instalacion en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getInstalaciones, getInstalacionById, createInstalacion, updateInstalacion
}