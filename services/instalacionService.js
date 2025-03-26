const instalacionModel = require('../models/instalacionModel');

const createInstalacion = async(Data)=> {
    return instalacionModel.createInstalacion(Data);
}
const getInstalaciones = async()=>{
    return instalacionModel.getInstalaciones();
}

const getInstalacionById = async(id)=>{
    return instalacionModel.getInstalacionById(id);
}
const getInstalacionesAll = async()=>{
    return instalacionModel.getInstalacionesAll();
}
const getInstalacionesAll2 = async()=>{
    return instalacionModel.getInstalacionesAll2();
}
const updateInstalacion = async(id, Data)=>{
    // Aquí puedes agregar lógica adicional antes o después de actualizar el usuario
    // Por ejemplo, validaciones, notificaciones, etc.
    return instalacionModel.updateInstalacion(id, Data);
}
const updateImagen = async(id, Data)=>{
    return instalacionModel.updateImagen(id, Data);
}

module.exports={
    createInstalacion, updateInstalacion, getInstalaciones, getInstalacionById, getInstalacionesAll, getInstalacionesAll2, updateImagen
}