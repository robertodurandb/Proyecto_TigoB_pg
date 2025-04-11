const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createPlan = async(Data) => {
    
    const { nombreplan, descplan, precioplan, velocidadplan, estado_plan} = Data;
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO planes(nombreplan, descplan, precioplan, velocidadplan, estado_plan) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nombreplan, descplan, precioplan, velocidadplan, estado_plan];
        const result = await client.query(query, values);
        console.log("SOY El PLAN_MODEL")
        console.log(result.rows)
        return result.rows[0];
    } catch (error) {
        console.log("Error creating Plan: "+error);
        throw error;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

// Función para actualizar un PLAN
const updatePlan = async (id, Data) =>{
    const client = await pool.connect();
    try {
        const id_planes = id.id;
        const query = `UPDATE planes SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE idplanes = $1 RETURNING *`;
        const values = [id_planes];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error con UpdatePlan", err);
        throw err;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

const getPlanes = async() => {
    try {
        const result = await pool.query("select * from planes as pl INNER JOIN estado as es on es.id_estado = pl.estado_plan");
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