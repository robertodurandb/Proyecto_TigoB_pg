const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createCliente = async(clientData) => {
    
    const { dnicliente, nombrecli, apellidocli, direccioncli, distritocli, provinciacli, referenciacli, geolocalizacion, telefonocli, user_create } = clientData;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO cliente(dnicliente, nombrecli, apellidocli, direccioncli, distritocli, provinciacli, referenciacli, geolocalizacion, telefonocli, user_create) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
        const values = [dnicliente, nombrecli, apellidocli, direccioncli, distritocli, provinciacli, referenciacli, geolocalizacion, telefonocli, user_create];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY El CLIENTMODEL")
        console.log(result.rows)
        return result.rows[0];
        
    } catch (error) {
        console.log("Error creating Client: "+error);
        throw error;
    }
};

// Función para actualizar un cliente
const updateCliente = async (id, clientData) =>{
    try {
        const dnicliente = id.id;
        const client = await pool.connect();
        
        //await client.connect();
        const query = `UPDATE cliente SET ${Object.keys(clientData).map(key => `${key} = '${clientData[key]}'`).join(', ')} WHERE dnicliente = $1 RETURNING *`;
        const values = [dnicliente];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getClientes = async() => {
    try {
        const result = await pool.query("select dnicliente, nombrecli, apellidocli, direccioncli, distritocli, provinciacli, referenciacli, geolocalizacion, telefonocli, to_char(fecha_create, 'DD-MM-YYYY') as fecha_create, user_create FROM cliente");
        return result.rows;
    } catch (error) {
        console.log("Error Get Clients: "+error);
        throw error;
    }
}

const getClienteById = async(id) => {
    const query = 'SELECT * FROM cliente WHERE dnicliente = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

module.exports = {
    createCliente, updateCliente, getClienteById, getClientes
}