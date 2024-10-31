const estadoModel = require('../models/estadoModel')

const getEstados = async()=>{
    return estadoModel.getEstados();
}

module.exports={
    getEstados
}