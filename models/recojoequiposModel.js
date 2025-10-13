const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createRecojo = async(createrecojoData) => {
    
    const { num_contrato, indicaciones, user_create } = createrecojoData;
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO recojos_equipos(num_contrato, indicaciones, user_create) VALUES ($1, $2, $3) RETURNING *';
        const values = [num_contrato, indicaciones, user_create];
        const result = await client.query(query, values);
        console.log("SOY recojo_equipos MODEL")
        console.log(result.rows)
        return result.rows[0];
    } catch (error) {
        console.log("Error creating recojo_equipo: "+error);
        throw error;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

const marcarPendientesRecojo = async () => {
    const client = await pool.connect();
    try {
        const query = `
            UPDATE instalacion_contrato SET pendiente_recojo = TRUE 
            WHERE estado_servicio = 3
            AND fecha_suspension <= NOW() - INTERVAL '5 days'
            AND pendiente_recojo = FALSE
            RETURNING *`;
        
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error en marcarPendientesRecojo:", error);
        throw error;
    } finally {
        client.release();
    }
};

//******* TODOS LOS RECOJOS PENDIENTES ******/
const getRecojosPendientes = async(sedeFilter = null) => {
    const client = await pool.connect();
    try {
        let query = `
            SELECT rc.id, rc.num_contrato, rc.estado, rc.indicaciones, rc.user_create, 
            to_char(rc.fecha_create, 'DD/MM') AS fecha_create, rc.equipos_recolectados, 
            rc.observaciones, rc.tecnico_completado_poste, to_char(rc.fecha_completado_poste, 'DD/MM') AS fecha_completado_poste, 
            rc.tecnico_completado_recojo, to_char(rc.fecha_completado_recojo, 'DD/MM') AS fecha_completado_recojo, 
            rc.user_cancelado, to_char(rc.fecha_cancelado, 'DD/MM') AS fecha_cancelado, rc.comentario, 
            rc.motivo_cancelado, rc.foto_evidencia, ic.clienteactual_dnicliente, ic.caja_instalacion, 
            ic.splitter_instalacion, ic.tipo_equipo, ic.user_mk, cl.nombrecli, cl.apellidocli, cl.direccioncli, 
            cl.telefonocli, sd.nombre_sede 
            FROM recojos_equipos as rc 
            LEFT JOIN instalacion_contrato as ic on ic.num_contrato = rc.num_contrato 
            LEFT JOIN cliente as cl on cl.dnicliente = ic.clienteactual_dnicliente 
            LEFT JOIN sedes as sd on cl.sedecli=sd.id_sede 
            WHERE 1=1 AND rc.estado IN ('PROGRAMADO', 'COMPLETADO_POSTE')
        `;
        const values = [];
        let paramCount = 0;

        if (sedeFilter) {
            paramCount++;
            query += ` AND cl.sedecli = $${paramCount}`;
            values.push(sedeFilter);
        }
        query += ' ORDER BY rc.fecha_create DESC';
        
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.log("Error Get Recojos Pendientes: "+error);
        throw error;
    } finally {
        client.release();
    }
}
//******* TODOS LOS RECOJOS COMPLETADOS ******/
const getRecojosTerminados = async(sedeFilter = null) => {
    const client = await pool.connect();
    try {
        let query = `
            SELECT rc.id, rc.num_contrato, rc.estado, rc.indicaciones, rc.user_create, to_char(rc.fecha_create, 'DD/MM') AS fecha_create, 
            rc.equipos_recolectados, rc.observaciones, rc.tecnico_completado_poste, to_char(rc.fecha_completado_poste, 'DD/MM') AS fecha_completado_poste, 
            rc.tecnico_completado_recojo, to_char(rc.fecha_completado_recojo, 'DD/MM') AS fecha_completado_recojo, rc.user_cancelado, 
            to_char(rc.fecha_cancelado, 'DD/MM') AS fecha_cancelado, rc.comentario, rc.motivo_cancelado, rc.foto_evidencia, ic.clienteactual_dnicliente, 
            ic.caja_instalacion, ic.splitter_instalacion, ic.tipo_equipo, cl.nombrecli, cl.apellidocli, cl.direccioncli, cl.telefonocli, sd.nombre_sede
            FROM recojos_equipos as rc 
            LEFT JOIN instalacion_contrato as ic on ic.num_contrato = rc.num_contrato 
            LEFT JOIN cliente as cl on cl.dnicliente = ic.clienteactual_dnicliente 
            LEFT JOIN sedes as sd on cl.sedecli=sd.id_sede
            WHERE 1=1 AND rc.estado IN ('COMPLETADO_RECOJO')
        `;
        const values = [];
        let paramCount = 0;

        if (sedeFilter) {
            paramCount++;
            query += ` AND cl.sedecli = $${paramCount}`;
            values.push(sedeFilter);
        }
        query += ' ORDER BY rc.fecha_create DESC';

        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.log("Error Get Recojos Completados: "+error);
        throw error;
    } finally {
        client.release();
    }
}

/************ TODOS LOS RECOJOS COMPLETADOS DE UN TECNICO ***************/
const getRecojosTerminadosForUser = async(id) => {
    const query = `
        SELECT rc.id, rc.num_contrato, rc.estado, rc.indicaciones, rc.user_create, to_char(rc.fecha_create, 'DD/MM') AS fecha_create, 
        rc.equipos_recolectados, rc.observaciones, rc.tecnico_completado_poste, to_char(rc.fecha_completado_poste, 'DD/MM') AS fecha_completado_poste, 
        rc.tecnico_completado_recojo, to_char(rc.fecha_completado_recojo, 'DD/MM') AS fecha_completado_recojo, rc.user_cancelado, 
        to_char(rc.fecha_cancelado, 'DD/MM') AS fecha_cancelado, rc.comentario, rc.motivo_cancelado, rc.foto_evidencia, ic.clienteactual_dnicliente, 
        ic.caja_instalacion, ic.splitter_instalacion, ic.tipo_equipo, cl.nombrecli, cl.apellidocli, cl.direccioncli, cl.telefonocli, sd.nombre_sede
        FROM recojos_equipos as rc 
        LEFT JOIN instalacion_contrato as ic on ic.num_contrato = rc.num_contrato 
        LEFT JOIN cliente as cl on cl.dnicliente = ic.clienteactual_dnicliente 
        LEFT JOIN sedes as sd on cl.sedecli=sd.id_sede
        WHERE rc.estado IN ('COMPLETADO_RECOJO') AND rc.tecnico_completado_recojo = $1
    `;
    // " WHERE ic.user_create = $1 AND (ic.estado_servicio=1 OR ic.estado_servicio=3)"
    const { rows } = await pool.query(query, [id]);
    return rows;
}

//******* TODOS LOS RECOJOS CANCELADOS ******/
const getRecojosCancelados = async() => {
    try {
        const result = await pool.query("SELECT rc.id, rc.num_contrato, rc.estado, rc.indicaciones, rc.user_create, to_char(rc.fecha_create, 'DD/MM') AS fecha_create, rc.equipos_recolectados, rc.observaciones, rc.tecnico_completado_poste, to_char(rc.fecha_completado_poste, 'DD/MM') AS fecha_completado_poste, rc.tecnico_completado_recojo, to_char(rc.fecha_completado_recojo, 'DD/MM') AS fecha_completado_recojo, rc.user_cancelado, to_char(rc.fecha_cancelado, 'DD/MM') AS fecha_cancelado, rc.comentario, rc.motivo_cancelado, rc.foto_evidencia, ic.clienteactual_dnicliente, ic.caja_instalacion, ic.splitter_instalacion, ic.tipo_equipo, cl.nombrecli, cl.apellidocli, cl.direccioncli, cl.telefonocli FROM recojos_equipos as rc INNER JOIN instalacion_contrato as ic on ic.num_contrato = rc.num_contrato INNER JOIN cliente as cl on cl.dnicliente = ic.clienteactual_dnicliente WHERE estado IN ('CANCELADO') ORDER BY fecha_create");
        return result.rows;
    } catch (error) {
        console.log("Error Get Recojos Cancelados: "+error);
        throw error;
    }
}

/************ TODOS LOS RECOJOS COMPLETADOS DE UN TECNICO ***************/
const getRecojosCanceladosForUser = async(id) => {
    const query = `
        SELECT rc.id, rc.num_contrato, rc.estado, rc.indicaciones, rc.user_create, to_char(rc.fecha_create, 'DD/MM') AS fecha_create, 
        rc.equipos_recolectados, rc.observaciones, rc.tecnico_completado_poste, to_char(rc.fecha_completado_poste, 'DD/MM') AS fecha_completado_poste, 
        rc.tecnico_completado_recojo, to_char(rc.fecha_completado_recojo, 'DD/MM') AS fecha_completado_recojo, rc.user_cancelado, 
        to_char(rc.fecha_cancelado, 'DD/MM') AS fecha_cancelado, rc.comentario, rc.motivo_cancelado, rc.foto_evidencia, ic.clienteactual_dnicliente, 
        ic.caja_instalacion, ic.splitter_instalacion, ic.tipo_equipo, cl.nombrecli, cl.apellidocli, cl.direccioncli, cl.telefonocli, sd.nombre_sede
        FROM recojos_equipos as rc 
        LEFT JOIN instalacion_contrato as ic on ic.num_contrato = rc.num_contrato 
        LEFT JOIN cliente as cl on cl.dnicliente = ic.clienteactual_dnicliente 
        LEFT JOIN sedes as sd on cl.sedecli=sd.id_sede
        WHERE rc.estado IN ('CANCELADO') AND rc.user_cancelado = $1
    `;
    // " WHERE ic.user_create = $1 AND (ic.estado_servicio=1 OR ic.estado_servicio=3)"
    const { rows } = await pool.query(query, [id]);
    return rows;
}

// Función para actualizar una OT RECOJO EQUIPOS
const updateRecojos = async (id, Data) =>{
    const client = await pool.connect(); // Adquiriendo conexión
    try {
        const id_recojo = id.id;
        const query = `UPDATE recojos_equipos SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE id = $1 RETURNING *`;
        const values = [id_recojo];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error en update OT RECOJOS:",err);
        throw err; //Re-lanzar el error para manejarlo en el controlador
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

module.exports = {
    marcarPendientesRecojo, createRecojo, getRecojosPendientes, getRecojosTerminados, updateRecojos, getRecojosCancelados, 
    getRecojosTerminadosForUser, getRecojosCanceladosForUser
}