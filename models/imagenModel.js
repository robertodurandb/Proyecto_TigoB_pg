const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createImagen = async(Data) => {
    
    const { nombreimg, tipo} = Data;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO imagen(nombreimg, tipo) VALUES ($1, $2) RETURNING *';
        const values = [nombreimg, tipo];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY El imagenModel")
        console.log(result.rows)
        return result.rows[0];
    
    } catch (error) {
        console.log("Error creating Imagen: "+error);
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