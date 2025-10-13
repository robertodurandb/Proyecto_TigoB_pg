const ordentrabajoModel = require('../models/ordentrabajoModel')

// Lista de campos que NO deben convertirse a mayúsculas
const EXCLUDED_FIELDS = ['user_create'];

// Función para conversión selectiva a mayúsculas
const convertSelectiveToUpper = (data) => {
  const processedData = {...data};
  
  for (const key in processedData) {
    // Si es string, no está en la lista de excluidos y no es nulo/undefined
    if (typeof processedData[key] === 'string' && 
        !EXCLUDED_FIELDS.includes(key) && 
        processedData[key] !== null) {
      processedData[key] = processedData[key].toUpperCase();
    }
  }
  return processedData;
};

const createOrdentrabajo = async(ordentrabajoData)=> {
    const processedData = convertSelectiveToUpper(ordentrabajoData);
    return ordentrabajoModel.createOrdentrabajo(processedData);
}
const getOrdentrabajo = async(sedeFilter = null)=>{
    if (sedeFilter && typeof sedeFilter !== 'number') {
        throw new Error('Filtro de sede inválido');
    }
    return ordentrabajoModel.getOrdentrabajo(sedeFilter);
}

const getOrdentrabajoById = async(id)=>{
    return ordentrabajoModel.getOrdentrabajoById(id);
}
const updateOrdentrabajo = async(id, ordentrabajoData)=>{
    const processedData = convertSelectiveToUpper(ordentrabajoData);
    return ordentrabajoModel.updateOrdentrabajo(id, processedData);
}

const getOrdenesSinInsta = async(sedeFilter = null)=>{
    if (sedeFilter && typeof sedeFilter !== 'number') {
        throw new Error('Filtro de sede inválido');
    }
    return ordentrabajoModel.getOrdenesSinInsta(sedeFilter);
}
const getOrdenesConInsta = async(sedeFilter = null)=>{
    if (sedeFilter && typeof sedeFilter !== 'number') {
        throw new Error('Filtro de sede inválido');
    }
    return ordentrabajoModel.getOrdenesConInsta(sedeFilter);
}
const getOrdenesConInstaForUser = async(id)=>{
    return ordentrabajoModel.getOrdenesConInstaForUser(id);
}

module.exports={
    createOrdentrabajo, updateOrdentrabajo, getOrdentrabajo, getOrdentrabajoById, getOrdenesSinInsta, getOrdenesConInsta, getOrdenesConInstaForUser
}