const estadoService = require('../services/estadoService')

const getEstados = async(req, res) => {
    try {
        const estados = await estadoService.getEstados();
        res.status(201).json(estados)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

module.exports = {
    getEstados
}