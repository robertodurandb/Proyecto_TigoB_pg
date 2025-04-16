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
const getClientes = async()=>{
    return clienteModel.getClientes();
}

const getClienteById = async(id)=>{
    return clienteModel.getClienteById(id);
}
const updateCliente = async(id, clientData)=>{
    const processedData = convertSelectiveToUpper(clientData);
    return clienteModel.updateCliente(id, processedData);
}

module.exports={
    createCliente, getClientes, getClienteById, updateCliente
}