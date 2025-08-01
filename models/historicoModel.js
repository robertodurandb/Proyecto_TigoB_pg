const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createHistoricoEquipos = async(Data) => {
    
    const { num_contrato, detalle, tipo_equipo_anterior, tipo_equipo_nuevo, user_create } = Data;
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO historico_equipos(num_contrato, detalle, tipo_equipo_anterior, tipo_equipo_nuevo, user_create) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [num_contrato, detalle, tipo_equipo_anterior, tipo_equipo_nuevo, user_create];
        const result = await client.query(query, values);
        console.log("SOY El historicoModel")
        console.log(result.rows)
        return result.rows[0];     
    } catch (error) {
        console.log("Error creating HistoricoEquipos: "+error);
        throw error;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

const createHistoricoCajas = async(Data) => {
    
    const { num_contrato, detalle, caja_terminal_anterior, caja_terminal_nuevo, splitter_anterior, splitter_nuevo, user_create } = Data;
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO historico_cajas(num_contrato, detalle, caja_terminal_anterior, caja_terminal_nuevo, splitter_anterior, splitter_nuevo, user_create) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [num_contrato, detalle, caja_terminal_anterior, caja_terminal_nuevo, splitter_anterior, splitter_nuevo, user_create];
        const result = await client.query(query, values);
        console.log("SOY El historicoModel")
        console.log(result.rows)
        return result.rows[0];     
    } catch (error) {
        console.log("Error creating HistoricoCajas: "+error);
        throw error;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

const createHistoricoPlanes = async(Data) => {
    
    const { num_contrato, user_create, plan_anterior, plan_nuevo, descuento_anterior, descuento_nuevo, comentario } = Data;
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO historico_plan_descuento(num_contrato, user_create, plan_anterior, plan_nuevo, descuento_anterior, descuento_nuevo, comentario) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [num_contrato, user_create, plan_anterior, plan_nuevo, descuento_anterior, descuento_nuevo, comentario];
        const result = await client.query(query, values);
        console.log("SOY El historicoPlanesModel")
        console.log(result.rows)
        return result.rows[0];     
    } catch (error) {
        console.log("Error creating HistoricoPlanes: "+error);
        throw error;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

//*************** TODOS LOS CAMBIOCAJAS **/
const getHistoricoCajas = async() => {
    try {
        const result = await pool.query("select hc.id, hc.num_contrato, hc.detalle, hc.caja_terminal_anterior, hc.caja_terminal_nuevo, hc.splitter_anterior, hc.splitter_nuevo, hc.user_create, to_char(hc.fecha_create, 'DD/MM/YYYY') as fecha_create, to_char(hc.fecha_create, 'HH24:MI:SS') as hora_create, ic.clienteactual_dnicliente, cl.apellidocli, cl.nombrecli from historico_cajas as hc INNER JOIN instalacion_contrato as ic on hc.num_contrato=ic.num_contrato INNER JOIN cliente as cl on cl.dnicliente=ic.clienteactual_dnicliente");
        return result.rows;
    } catch (error) {
        console.log("Error Get HistoricoCajasAll: "+error);
        throw error;
    }
}

//*************** TODOS LOS CAMBIOEQUIPOS **/
const getHistoricoEquipos = async() => {
    try {
        const result = await pool.query("select he.id, he.num_contrato, he.detalle, he.tipo_equipo_anterior, he.tipo_equipo_nuevo, he.user_create, to_char(he.fecha_create, 'DD/MM/YYYY') as fecha_create, to_char(he.fecha_create, 'HH24:MI:SS') as hora_create, ic.clienteactual_dnicliente, cl.apellidocli, cl.nombrecli from historico_equipos as he INNER JOIN instalacion_contrato as ic on he.num_contrato=ic.num_contrato INNER JOIN cliente as cl on cl.dnicliente=ic.clienteactual_dnicliente");
        return result.rows;
    } catch (error) {
        console.log("Error Get HistoricoEquiposAll: "+error);
        throw error;
    }
}

//*************** TODOS LOS CAMBIOS PLANES O DESCUENTOS **/
const getHistoricoPlanes = async() => {
    try {
        const result = await pool.query("SELECT hp.num_contrato, dc.clienteactual_dnicliente, cl.apellidocli, cl.nombrecli, hp.fecha_create, hp.user_create, hp.comentario, pl.nombreplan AS plan_anterior, hp.descuento_anterior, pln.nombreplan AS plan_nuevo, hp.descuento_nuevo FROM historico_plan_descuento as hp INNER JOIN instalacion_contrato as dc on hp.num_contrato = dc.num_contrato INNER JOIN cliente as cl on dc.clienteactual_dnicliente = cl.dnicliente INNER JOIN planes as pl on hp.plan_anterior = pl.idplanes INNER JOIN planes as pln on hp.plan_nuevo = pln.idplanes");
        return result.rows;
    } catch (error) {
        console.log("Error Get HistoricoPlanes: "+error);
        throw error;
    }
}

module.exports = {
    createHistoricoCajas, createHistoricoEquipos, createHistoricoPlanes, getHistoricoCajas, getHistoricoEquipos, getHistoricoPlanes
}