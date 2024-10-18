const pagoModel = require('../models/pagoModel');

const createPago = async(Data)=> {
    return pagoModel.createPago(Data);
}
const getPagos = async()=>{
    return pagoModel.getPagos();
}

const getPagoById = async(id)=>{
    return pagoModel.getPagoById(id);
}
const updatePago = async(id, Data)=>{
    // Aquí puedes agregar lógica adicional antes o después de actualizar el usuario
    // Por ejemplo, validaciones, notificaciones, etc.
    return pagoModel.updatePago(id, Data);
}

module.exports={
    createPago, updatePago, getPagos, getPagoById
}