const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createPlan = async(Data) => {
    
    const { nombreplan, descplan, precioplan, velocidadplan, estado_plan} = Data;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO planes(nombreplan, descplan, precioplan, velocidadplan, estado_plan) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nombreplan, descplan, precioplan, velocidadplan, estado_plan];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY El PLAN_MODEL")
        console.log(result.rows)
        return result.rows[0];
    
    } catch (error) {
        console.log("Error creating Plan: "+error);
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

const getPlanById = async(id) => {
    const query = 'SELECT * FROM planes WHERE idplanes = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

module.exports = {
    createPlan, updatePlan, getPlanes, getPlanById
}