const imagenModel = require('../models/imagenModel');

const createImagen = async(Data)=> {
    return imagenModel.createImagen(Data);
}
const createImagen2 = async(Data)=> {
    return imagenModel.createImagen2(Data);
}
const getImagenes = async()=>{
    return imagenModel.getImagenes();
}

const getImagenById = async(id)=>{
    return imagenModel.getImagenById(id);
}
const updateImagen = async(id, Data)=>{
    // Aquí puedes agregar lógica adicional antes o después de actualizar el usuario
    // Por ejemplo, validaciones, notificaciones, etc.
    return imagenModel.updateImagen(id, Data);
}

module.exports={
    createImagen, updateImagen, getImagenById, getImagenes, createImagen2
}