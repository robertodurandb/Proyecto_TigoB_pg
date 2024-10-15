const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createPlan = async(Data) => {
    
    const { idplanes, nombreplan, descplan, precioplan, velocidadplan, estado} = Data;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO planes(idplanes, nombreplan, descplan, precioplan, velocidadplan, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const values = [idplanes, nombreplan, descplan, precioplan, velocidadplan, estado];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY El PLAN_MODEL")
        console.log(result.rows)
        return result.rows[0];
        
    } catch (error) {
        console.log("Error creating Client: "+error);
        throw error;
    }
};

// Función para actualizar un PLAN
const updatePlan = async (id, Data) =>{
    try {
        const id_planes = id.id;
        const client = await pool.connect();
        
        const query = `UPDATE planes SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE idplanes = $1 RETURNING *`;
        const values = [id_planes];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getPlanes = async() => {
    try {
        const result = await pool.query("SELECT * FROM planes");
        return result.rows;
    } catch (error) {
        console.log("Error Get Planes: "+error);
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