const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createCliente = async(clientData) => {
    
    const { dnicliente, nombrecli, apellidocli, direccioncli, referenciacli, geolocalizacion, telefonocli, telefonocli2, sedecli, user_create } = clientData;
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO cliente(dnicliente, nombrecli, apellidocli, direccioncli, referenciacli, geolocalizacion, telefonocli, telefonocli2, sedecli, user_create) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
        const values = [dnicliente, nombrecli, apellidocli, direccioncli, referenciacli, geolocalizacion, telefonocli, telefonocli2, sedecli, user_create];
        const result = await client.query(query, values);
        console.log("SOY El CLIENTMODEL")
        console.log(result.rows)
        return result.rows[0];
    } catch (error) {
        console.log("Error creating Client: "+error);
        throw error;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

// Función para actualizar un cliente
const updateCliente = async (id, clientData) =>{
    const client = await pool.connect();
    try {
        const dnicliente = id.id;
        
        
        //await client.connect();
        const query = `UPDATE cliente SET ${Object.keys(clientData).map(key => `${key} = '${clientData[key]}'`).join(', ')} WHERE dnicliente = $1 RETURNING *`;
        const values = [dnicliente];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error en updateCliente",err);
        throw err;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
}

// NUEVOS MÉTODOS CON FILTRO DE SEDE
const getClientes = async (sedeFilter = null) => {
    const client = await pool.connect();
    try {
        let query = `
            SELECT c.*, s.nombre_sede as sede_nombre 
            FROM cliente c 
            LEFT JOIN sedes s ON c.sedecli = s.id_sede 
            WHERE 1=1
        `;
        const values = [];
        let paramCount = 0;

        if (sedeFilter) {
            paramCount++;
            query += ` AND c.sedecli = $${paramCount}`;
            values.push(sedeFilter);
        }

        query += ' ORDER BY c.fecha_create DESC';

        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.log("Error getting clients: " + error);
        throw error;
    } finally {
        client.release();
    }
};

const checkDniExistsGlobal = async (dni) => {
    const client = await pool.connect();
    try {
        const query = `
            SELECT 
                ic.clienteactual_dnicliente, ic.fecha_create,
                c.nombrecli, 
                c.apellidocli, 
                e.id_estado, e.nombre_estado,
                s.id_sede, s.nombre_sede
            FROM instalacion_contrato as ic
            INNER JOIN estado as e on e.id_estado = ic.estado_servicio
            INNER JOIN cliente as c on c.dnicliente = ic.clienteactual_dnicliente
            INNER JOIN sedes as s on s.id_sede = ic.sede_id
            WHERE clienteactual_dnicliente = $1
            LIMIT 1
        `;  
        const result = await client.query(query, [dni]);
        return result.rows[0] || null;
        
    } catch (error) {
        console.error("Error in checkDniExistsGlobal:", error);
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    createCliente, updateCliente, getClientes, checkDniExistsGlobal
}