const ordentrabajoModel = require('../models/ordentrabajoModel')

const createOrdentrabajo = async(ordentrabajoData)=> {
    return ordentrabajoModel.createOrdentrabajo(ordentrabajoData);
}
const getOrdentrabajo = async()=>{
    return ordentrabajoModel.getOrdentrabajo();
}

const getOrdentrabajoById = async(id)=>{
    return ordentrabajoModel.getOrdentrabajoById(id);
}
const updateOrdentrabajo = async(id, ordentrabajoData)=>{
    // Aquí puedes agregar lógica adicional antes o después de actualizar el usuario
    // Por ejemplo, validaciones, notificaciones, etc.
    return ordentrabajoModel.updateOrdentrabajo(id, ordentrabajoData);
}

const getOrdenesSinInsta = async()=>{
    return ordentrabajoModel.getOrdenesSinInsta();
}
const getOrdenesConInsta = async()=>{
    return ordentrabajoModel.getOrdenesConInsta();
}

module.exports={
    createOrdentrabajo, updateOrdentrabajo, getOrdentrabajo, getOrdentrabajoById, getOrdenesSinInsta, getOrdenesConInsta
}