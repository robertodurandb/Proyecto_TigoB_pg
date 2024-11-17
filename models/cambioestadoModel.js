const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createCambioestado = async(cambioestadoData) => {
    
    const { num_contrato, detalle, estado_anterior, estado_actual, user_create, fecha_create } = cambioestadoData;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO cambioestado(num_contrato, detalle, estado_anterior, estado_actual, user_create, fecha_create) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [num_contrato, detalle, estado_anterior, estado_actual, user_create, fecha_create];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY El cambioestadoMODEL")
        console.log(result.rows)
        return result.rows[0];
        
    } catch (error) {
        console.log("Error creating Client: "+error);
        throw error;
    }
};


const getCambioestados = async() => {
    try {
        const result = await pool.query("SELECT * FROM cambioestado");
        return result.rows;
    } catch (error) {
        console.log("Error Get Cambioestado: "+error);
        throw error;
    }
}

//*************** TODOS LOS CAMBIOESTADOS **/
const getCambioestadosAll = async() => {
    try {
        const result = await pool.query("");
        return result.rows;
    } catch (error) {
        console.log("Error Get Cambioestados: "+error);
        throw error;
    }
}




module.exports = {
    createCambioestado, getCambioestados
}