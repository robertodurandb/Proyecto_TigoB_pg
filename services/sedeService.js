const sedeModel = require('../models/sedeModel');

const createSede = async(Data)=> {
    return sedeModel.createSede(Data);
}
const getSedes = async()=>{
    return sedeModel.getSedes();
}

const getSedeById = async(id)=>{
    return sedeModel.getSedeById(id);
}
const updateSede = async(id, Data)=>{
    // Aquí puedes agregar lógica adicional antes o después de actualizar el usuario
    // Por ejemplo, validaciones, notificaciones, etc.
    return sedeModel.updateSede(id, Data);
}

module.exports={
    createSede, updateSede, getSedes, getSedeById
}