const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createContrato = async(contratoData) => {
    
    const { num_contrato, planes_idplanes, cliente_dnicliente, fecha_contrato, diapago, fechaprog_instalacion, observacion_instalacion, instalacion_idinstalacion, estadodc_instalacion } = contratoData;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO contrato(num_contrato, planes_idplanes, cliente_dnicliente, fecha_contrato, diapago, fechaprog_instalacion, observacion_instalacion, instalacion_idinstalacion, estadodc_instalacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const values = [num_contrato, planes_idplanes, cliente_dnicliente, fecha_contrato, diapago, fechaprog_instalacion, observacion_instalacion, instalacion_idinstalacion, estadodc_instalacion];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY El CONTRATOMODEL")
        console.log(result.rows)
        return result.rows[0];
        
    } catch (error) {
        console.log("Error creating Client: "+error);
        throw error;
    }
};

// Función para actualizar un cliente
const updateContrato = async (id, contratoData) =>{
    try {
        const num_contrato = id.id;
        const client = await pool.connect();
        
        const query = `UPDATE contrato SET ${Object.keys(contratoData).map(key => `${key} = '${contratoData[key]}'`).join(', ')} WHERE num_contrato = $1 RETURNING *`;
        const values = [num_contrato];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getContratos = async() => {
    try {
        const result = await pool.query("SELECT * FROM contrato");
        return result.rows;
    } catch (error) {
        console.log("Error Get Contratos: "+error);
        throw error;
    }
}

const getContratoById = async(id) => {
    const query = 'SELECT * FROM contrato WHERE num_contrato = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

module.exports = {
    createContrato, updateContrato, getContratos, getContratoById
}