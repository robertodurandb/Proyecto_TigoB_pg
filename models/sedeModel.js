const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createSede = async(Data) => {
    
    const { nombre_sede, empresa, distritosede, estado} = Data;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO sedes(nombre_sede, empresa, distritosede, estado) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [nombre_sede, empresa, distritosede, estado];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY SEDE_MODEL")
        console.log(result.rows)
        return result.rows[0];
    
    } catch (error) {
        console.log("Error creating Sede: "+error);
        throw error;
    }
};

// Función para actualizar un sede
const updateSede = async (id, Data) =>{
    try {
        const id_sede = id.id;
        const client = await pool.connect();
        
        const query = `UPDATE sedes SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE id_sede = $1 RETURNING *`;
        const values = [id_sede];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getSedes = async() => {
    try {
        const result = await pool.query("select * from sedes as sd INNER JOIN estado as es on es.id_estado = sd.estado");
        return result.rows;
    } catch (error) {
        console.log("Error Get Sedes: "+error);
        throw error;
    }
}

const getSedeById = async(id) => {
    const query = 'SELECT * FROM sedes WHERE id_sede = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

module.exports = {
    createSede, updateSede, getSedes, getSedeById
}