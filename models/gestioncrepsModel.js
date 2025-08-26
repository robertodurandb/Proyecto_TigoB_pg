const { Pool } = require('pg');
const pool = require('../database/connectiondb');




//******* TODOS LOS CREPS PENDIENTES ******/
const getCrepsPendientes = async() => {
    try {
        const result = await pool.query("SELECT cr.id, cr.num_contrato, cr.estado, cr.tipo_operacion, to_char(cr.fecha_generacion, 'DD/MM') AS fecha_generacion, cr.monto_anterior, cr.monto_nuevo, cr.dcto_anterior, cr.dcto_nuevo, cr.dia_pago_anterior, cr.dia_pago_nuevo, cr.plan_anterior, cr.plan_nuevo, to_char(cr.fecha_completado, 'DD/MM') AS fecha_completado, cr.usuario_completado, cr.comentarios, ic.clienteactual_dnicliente, cl.nombrecli, cl.apellidocli, cl.direccioncli, cl.telefonocli, sd.nombre_sede FROM gestion_creps as cr INNER JOIN instalacion_contrato as ic on ic.num_contrato = cr.num_contrato INNER JOIN cliente as cl on cl.dnicliente = ic.clienteactual_dnicliente INNER JOIN sedes as sd on cl.sedecli=sd.id_sede WHERE cr.estado IN ('PENDIENTE') ORDER BY fecha_generacion");
        return result.rows;
    } catch (error) {
        console.log("Error Get CREPS Pendientes: "+error);
        throw error;
    }
}
//******* TODOS LOS CREPS COMPLETADOS ******/
const getCrepsTerminados = async() => {
    try {
        const result = await pool.query("SELECT cr.id, cr.num_contrato, cr.estado, cr.tipo_operacion, to_char(cr.fecha_generacion, 'DD/MM') AS fecha_generacion, cr.monto_anterior, cr.monto_nuevo, cr.dcto_anterior, cr.dcto_nuevo, cr.dia_pago_anterior, cr.dia_pago_nuevo, cr.plan_anterior, cr.plan_nuevo, to_char(cr.fecha_completado, 'DD/MM') AS fecha_completado, cr.usuario_completado, cr.comentarios, ic.clienteactual_dnicliente, cl.nombrecli, cl.apellidocli, cl.direccioncli, cl.telefonocli, sd.nombre_sede FROM gestion_creps as cr INNER JOIN instalacion_contrato as ic on ic.num_contrato = cr.num_contrato INNER JOIN cliente as cl on cl.dnicliente = ic.clienteactual_dnicliente INNER JOIN sedes as sd on cl.sedecli=sd.id_sede WHERE cr.estado IN ('COMPLETADO') ORDER BY fecha_completado");
        return result.rows;
    } catch (error) {
        console.log("Error Get CREPS Terminados: "+error);
        throw error;
    }
}
//******* TODOS LOS CREPS CANCELADOS ******/
const getCrepsCancelados = async() => {
    try {
        const result = await pool.query("SELECT cr.id, cr.num_contrato, cr.estado, cr.tipo_operacion, to_char(cr.fecha_generacion, 'DD/MM') AS fecha_generacion, cr.monto_anterior, cr.monto_nuevo, cr.dcto_anterior, cr.dcto_nuevo, cr.dia_pago_anterior, cr.dia_pago_nuevo, cr.plan_anterior, cr.plan_nuevo, to_char(cr.fecha_completado, 'DD/MM') AS fecha_completado, cr.usuario_completado, cr.comentarios, ic.clienteactual_dnicliente, cl.nombrecli, cl.apellidocli, cl.direccioncli, cl.telefonocli, sd.nombre_sede FROM gestion_creps as cr INNER JOIN instalacion_contrato as ic on ic.num_contrato = cr.num_contrato INNER JOIN cliente as cl on cl.dnicliente = ic.clienteactual_dnicliente INNER JOIN sedes as sd on cl.sedecli=sd.id_sede WHERE cr.estado IN ('CANCELADO') ORDER BY fecha_completado");
        return result.rows;
    } catch (error) {
        console.log("Error Get CREPS Cancelados: "+error);
        throw error;
    }
}

// Función para actualizar CREP
const updateCreps = async (id, Data) =>{
    const client = await pool.connect(); // Adquiriendo conexión
    try {
        const id_crep = id.id;
        const query = `UPDATE gestion_creps SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE id = $1 RETURNING *`;
        const values = [id_crep];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error en update OT CREPS:",err);
        throw err; //Re-lanzar el error para manejarlo en el controlador
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

module.exports = {
   getCrepsPendientes, getCrepsTerminados, getCrepsCancelados, updateCreps
}