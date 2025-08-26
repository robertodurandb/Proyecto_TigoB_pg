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
const createHistoricoDiaPago = async(Data)=>{
    return historicoModel.createHistoricoDiaPago(Data);
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
const getHistoricoDiaPago = async()=>{
    return historicoModel.getHistoricoDiaPago();
}

module.exports={
    createHistoricoCajas, createHistoricoEquipos, createHistoricoPlanes, createHistoricoDiaPago, getHistoricoCajas, getHistoricoEquipos, getHistoricoPlanes, getHistoricoDiaPago
}