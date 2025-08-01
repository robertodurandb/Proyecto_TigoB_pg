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

const getRecojosPendientes = async()=>{
    return recojoequiposModel.getRecojosPendientes();
}

const getRecojosTerminados = async()=>{
    return recojoequiposModel.getRecojosTerminados();
}

const getRecojosCancelados = async()=>{
    return recojoequiposModel.getRecojosCancelados();
}

const updateRecojos = async(id, Data)=>{
    return recojoequiposModel.updateRecojos(id, Data);
}

module.exports = {
    verificarSuspensiones, createRecojo, getRecojosPendientes, getRecojosTerminados, updateRecojos, getRecojosCancelados
};