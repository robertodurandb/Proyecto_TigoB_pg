const historicoModel = require('../models/historicoModel');

const createHistoricoCajas = async(Data)=> {
    return historicoModel.createHistoricoCajas(Data);
}
const createHistoricoEquipos = async(Data)=>{
    return historicoModel.createHistoricoEquipos(Data);
}
const createHistoricoPlanes = async(Data)=>{
    return historicoModel.createHistoricoPlanes(Data);
}
const getHistoricoCajas = async()=>{
    return historicoModel.getHistoricoCajas();
}
const getHistoricoEquipos = async()=>{
    return historicoModel.getHistoricoEquipos();
}
const getHistoricoPlanes = async()=>{
    return historicoModel.getHistoricoPlanes();
}

module.exports={
    createHistoricoCajas, createHistoricoEquipos, createHistoricoPlanes, getHistoricoCajas, getHistoricoEquipos, getHistoricoPlanes
}