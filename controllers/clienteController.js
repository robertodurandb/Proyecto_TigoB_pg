const clienteService = require('../services/clienteService')

const getClientes = async(req, res) => {
    try {
        const sedeFilter = req.sedeFilter; // Del middleware de sede
        const clientes = await clienteService.getClientes(sedeFilter);
        res.status(201).json(clientes)
        console.log('si se encontro los clientes de la sede '+sedeFilter)
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const checkDniGlobal = async (req, res) => {
    try {
        const { dni } = req.params;
        
        if (!dni || dni.length < 8) {
            return res.status(400).json({ 
                success: false,
                message: "DNI debe tener al menos 8 dígitos" 
            });
        }

        const cliente = await clienteService.checkDniExistsGlobal(dni);
        
        res.json({ 
            success: true,
            exists: !!cliente,
            cliente: cliente
        });
        
    } catch (error) {
        console.error("Error validando DNI global:", error);
        res.status(500).json({ 
            success: false,
            message: "Error interno del servidor al validar DNI" 
        });
    }
};

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
    getClientes, createCliente, updateCliente, checkDniGlobal
}