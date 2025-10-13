const recojoequiposModel = require('../models/recojoequiposModel');

const createRecojo = async(createrecojoData)=>{
    return recojoequiposModel.createRecojo(createrecojoData);
}
const verificarSuspensiones = async () => {
    try {
        const contratosActualizados = await recojoequiposModel.marcarPendientesRecojo();
        return contratosActualizados;
    } catch (error) {
        console.error('Error en verificarSuspensiones:', error);
        throw error;
    }
};

const getRecojosPendientes = async(sedeFilter = null)=>{
    if (sedeFilter && typeof sedeFilter !== 'number') {
        throw new Error('Filtro de sede inválido');
    }
    return recojoequiposModel.getRecojosPendientes(sedeFilter);
}

const getRecojosTerminados = async(sedeFilter = null)=>{
    if (sedeFilter && typeof sedeFilter !== 'number') {
        throw new Error('Filtro de sede inválido');
    }
    return recojoequiposModel.getRecojosTerminados(sedeFilter);
}

const getRecojosTerminadosForUser = async(id)=>{
    return recojoequiposModel.getRecojosTerminadosForUser(id);
}

const getRecojosCancelados = async()=>{
    return recojoequiposModel.getRecojosCancelados();
}

const getRecojosCanceladosForUser = async(id)=>{
    return recojoequiposModel.getRecojosCanceladosForUser(id);
}

const updateRecojos = async(id, Data)=>{
    return recojoequiposModel.updateRecojos(id, Data);
}

module.exports = {
    verificarSuspensiones, createRecojo, getRecojosPendientes, getRecojosTerminados, updateRecojos, getRecojosCancelados, getRecojosTerminadosForUser, getRecojosCanceladosForUser
};