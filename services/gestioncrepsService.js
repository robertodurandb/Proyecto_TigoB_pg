const gestioncrepsModel = require('../models/gestioncrepsModel');

const getCrepsPendientes = async()=>{
    return gestioncrepsModel.getCrepsPendientes();
}

const getCrepsTerminados = async()=>{
    return gestioncrepsModel.getCrepsTerminados();
}

const getCrepsCancelados = async()=>{
    return gestioncrepsModel.getCrepsCancelados();
}

const updateCreps = async(id, Data)=>{
    return gestioncrepsModel.updateCreps(id, Data);
}

module.exports = {
 getCrepsPendientes, getCrepsTerminados, getCrepsCancelados, updateCreps
};