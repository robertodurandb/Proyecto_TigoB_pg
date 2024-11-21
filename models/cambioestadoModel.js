const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createCambioestado = async(cambioestadoData) => {
    
    const { num_contrato, detalle, estado_anterior, estado_actual, user_create } = cambioestadoData;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO cambioestados(num_contrato, detalle, estado_anterior, estado_actual, user_create) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [num_contrato, detalle, estado_anterior, estado_actual, user_create];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY El cambioestadoMODEL")
        console.log(result.rows)
        return result.rows[0];
        
    } catch (error) {
        console.log("Error creating CambioEstado: "+error);
        throw error;
    }
};


const getCambioestados = async() => {
    try {
        const result = await pool.query("SELECT * FROM cambioestados");
        return result.rows;
    } catch (error) {
        console.log("Error Get Cambioestado: "+error);
        throw error;
    }
}

//*************** TODOS LOS CAMBIOESTADOS **/
const getCambioestadosAll = async() => {
    try {
        const result = await pool.query("select ce.idcambioestado, ce.num_contrato, ce.detalle, ce.estado_anterior, es.nombre_estado as nomestado_anterior, ce.estado_actual, esa.nombre_estado as nomestado_actual, ce.user_create, to_char(ce.fecha_create, 'DD/MM/YYYY') as fecha_create, to_char(ce.fecha_create, 'HH24:MI:SS') as hora_create, dc.cliente_dnicliente, cl.apellidocli, cl.nombrecli from cambioestados as ce INNER JOIN contrato as dc on ce.num_contrato=dc.num_contrato INNER JOIN cliente as cl on cl.dnicliente=dc.cliente_dnicliente INNER JOIN estado as es on es.id_estado=ce.estado_anterior INNER JOIN estado as esa on esa.id_estado=ce.estado_actual");
        return result.rows;
    } catch (error) {
        console.log("Error Get CambioestadosAll: "+error);
        throw error;
    }
}




module.exports = {
    createCambioestado, getCambioestados, getCambioestadosAll
}