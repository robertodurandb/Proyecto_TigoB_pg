const clienteService = require('../services/clienteService')

const getClientes = async(req, res) => {
    try {
        const clientes = await clienteService.getClientes();
        res.status(201).json(clientes)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getClienteById = async(req, res) => {
    const {id} = req.params;
    try {
        const cliente = await clienteService.getClienteById(id);
        if (!cliente) {
            return res.status(404).json({message: 'Cliente no encontrado'})
        }
        res.status(201).json(cliente)
        console.log("si se encontro el cliente: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createCliente = async(req, res) => {
    try { 
        const clientData = req.body;
        const newCliente = await clienteService.createCliente(clientData);
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateCliente = async(req, res) => {
    try { 
        const id = req.params;
        const clientData = req.body;
        const clientUpdate = await clienteService.updateCliente(id,clientData);
        
        res.status(201).json(clientUpdate);
        console.log("se actualizo el cliente en cliente Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getClientes, getClienteById, createCliente, updateCliente
}