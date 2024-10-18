const pagoService = require('../services/pagoService')

const getPagos = async(req, res) => {
    try {
        const pagos = await pagoService.getPagos();
        res.status(201).json(pagos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getPagoById = async(req, res) => {
    const {id} = req.params;
    try {
        const pago = await pagoService.getPagoById(id);
        if (!pago) {
            return res.status(404).json({message: 'pago no encontrado'})
        }
        res.status(201).json(pago)
        console.log("si se encontro el pago: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createPago = async(req, res) => {
    try { 
        const Data = req.body;
        const newPago = await pagoService.createPago(Data);
        res.status(201).json(newPago);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updatePago = async(req, res) => {
    try { 
        const id = req.params;
        const Data = req.body;
        const pagoUpdate = await pagoService.updatePago(id,Data);
        
        res.status(201).json(pagoUpdate);
        console.log("se actualizo el pago en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getPagos, getPagoById, createPago, updatePago
}