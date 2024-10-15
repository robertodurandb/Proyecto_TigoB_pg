const contratoModel = require('../models/contratoModel')

const createContrato = async(contratoData)=> {
    return contratoModel.createContrato(contratoData);
}
const getContratos = async()=>{
    return contratoModel.getContratos();
}

const getContratoById = async(id)=>{
    return contratoModel.getContratoById(id);
}
const updateContrato = async(id, contratoData)=>{
    // Aquí puedes agregar lógica adicional antes o después de actualizar el usuario
    // Por ejemplo, validaciones, notificaciones, etc.
    return contratoModel.updateContrato(id, contratoData);
}

module.exports={
    createContrato, updateContrato, getContratos, getContratoById
}