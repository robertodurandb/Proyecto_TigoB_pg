const cambioestadoModel = require('../models/cambioestadoModel');

const createCambioestado = async(Data)=> {
    return cambioestadoModel.createCambioestado(Data);
}
const getCambioestados = async()=>{
    return cambioestadoModel.getCambioestados();
}
const getCambioestadosAll = async()=>{
    return cambioestadoModel.getCambioestadosAll();
}

module.exports={
    createCambioestado, getCambioestados, getCambioestadosAll
}