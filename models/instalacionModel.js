const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createInstalacion = async(Data) => {
    
    const { fechainstalacion, geolocalizacion, user_create, fecha_create, estado_instalacion, observacion_instalacion, caja_instalacion, imagen_idimagen, user_update, fecha_update} = Data;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO instalacion(fechainstalacion, geolocalizacion, user_create, fecha_create, estado_instalacion, observacion_instalacion, caja_instalacion, imagen_idimagen) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const values = [fechainstalacion, geolocalizacion, user_create, fecha_create, estado_instalacion, observacion_instalacion, caja_instalacion, imagen_idimagen];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY INSTALACION_MODEL")
        console.log(result.rows)
        return result.rows[0];
    
    } catch (error) {
        console.log("Error creating Plan: "+error);
        throw error;
    }
};

// Función para actualizar un PLAN
const updateInstalacion = async (id, Data) =>{
    try {
        const idinstalacion = id.id;
        const client = await pool.connect();
        
        const query = `UPDATE instalacion SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE idinstalacion = $1 RETURNING *`;
        const values = [idinstalacion];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getInstalaciones = async() => {
    try {
        const result = await pool.query("SELECT * FROM instalacion");
        return result.rows;
    } catch (error) {
        console.log("Error Get Instalaciones: "+error);
        throw error;
    }
}

const getInstalacionById = async(id) => {
    const query = 'SELECT * FROM instalacion WHERE idinstalacion = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

module.exports = {
    createInstalacion, updateInstalacion, getInstalaciones, getInstalacionById
}