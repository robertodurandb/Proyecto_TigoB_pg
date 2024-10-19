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

const getContratosSinInsta = async()=>{
    return contratoModel.getContratosSinInsta();
}
const getContratosConInsta = async()=>{
    return contratoModel.getContratosConInsta();
}
const getContratosAllInsta = async()=>{
    return contratoModel.getContratosAllInsta();
}

module.exports={
    createContrato, updateContrato, getContratos, getContratoById, getContratosSinInsta, getContratosConInsta, getContratosAllInsta
}