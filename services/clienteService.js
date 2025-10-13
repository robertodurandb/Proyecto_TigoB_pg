const clienteModel = require('../models/clienteModel')
// Lista de campos que NO deben convertirse a mayúsculas
const EXCLUDED_FIELDS = ['geolocalizacion', 'user_create'];

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

const createCliente = async(clientData)=> {
    const processedData = convertSelectiveToUpper(clientData);
    return clienteModel.createCliente(processedData);
}

const getClientes = async(sedeFilter = null) => {
    // Validaciones adicionales podrían ir aquí
    if (sedeFilter && typeof sedeFilter !== 'number') {
        throw new Error('Filtro de sede inválido');
    }
    return clienteModel.getClientes(sedeFilter);
};

const checkDniExistsGlobal = async(dni)=>{
    return clienteModel.checkDniExistsGlobal(dni);
}
const updateCliente = async(id, clientData)=>{
    const processedData = convertSelectiveToUpper(clientData);
    return clienteModel.updateCliente(id, processedData);
}

module.exports={
    createCliente, getClientes, updateCliente, checkDniExistsGlobal
}