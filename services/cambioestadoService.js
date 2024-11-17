const cambioestadoModel = require('../models/cambioestadoModel');

const createCambioestado = async(Data)=> {
    return cambioestadoModel.createCambioestado(Data);
}
const getCambioestados = async()=>{
    return cambioestadoModel.getCambioestados();
}

module.exports={
    createCambioestado, getCambioestados
}