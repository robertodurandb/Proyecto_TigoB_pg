const clienteModel = require('../models/clienteModel')

const createCliente = async(clientData)=> {
    return clienteModel.createCliente(clientData);
}
const getClientes = async()=>{
    return clienteModel.getClientes();
}

const getClienteById = async(id)=>{
    return clienteModel.getClienteById(id);
}
const updateCliente = async(id, clientData)=>{
    // Aquí puedes agregar lógica adicional antes o después de actualizar el usuario
    // Por ejemplo, validaciones, notificaciones, etc.
    return clienteModel.updateCliente(id, clientData);
}

module.exports={
    createCliente, getClientes, getClienteById, updateCliente
}