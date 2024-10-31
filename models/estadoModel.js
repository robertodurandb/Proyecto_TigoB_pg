const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const getEstados = async() => {
    try {
        const result = await pool.query("SELECT * FROM estado");
        return result.rows;
    } catch (error) {
        console.log("Error Get Pagos: "+error);
        throw error;
    }
}

module.exports = {
    getEstados
}