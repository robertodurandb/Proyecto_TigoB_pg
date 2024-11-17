const cambioestadoServide = require('../services/cambioestadoService')

const createCambioestado = async(req, res) => {
    try { 
        const cambioestadoData = req.body;
        const newCambioestado = await cambioestadoServide.createCambioestado(cambioestadoData);
        res.status(201).json(newCambioestado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getCambioestados = async(req, res) => {
    try {
        const cambioestados = await cambioestadoServide.getCambioestados();
        res.status(201).json(cambioestados)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

module.exports = {
    getCambioestados, createCambioestado
}