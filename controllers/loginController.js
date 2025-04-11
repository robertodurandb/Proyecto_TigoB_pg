const { Pool } = require('pg');
const pool = require('../database/connectiondb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const doLogin = async(req, res) => {
    const { id_user, password_user } = req.body;

    // Validación básica del input
    if (!id_user || !password_user) {
        return res.status(400).json({
            success: false,
            message: "Usuario y contraseña son requeridos"
        });
    }

    let client;
    try {
        client = await pool.connect();
        const query = 'SELECT * FROM usuarios WHERE id_user = $1 AND estado_user = $2';
        const values = [id_user.toLowerCase(), 1];
        const result = await client.query(query, values);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado o inactivo"
            });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password_user, user.password_user);
  
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Credenciales inválidas"
            });
        }

        // Payload más completo y consistente
        const payload = {
            username: user.id_user,
            role: user.perfil_user,
            userId: user.id // Si tienes un ID único en la tabla
        };

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
        
        // Respuesta estandarizada
        res.status(200).json({ 
            success: true,
            token: token,
            expiresIn: 3600,
            user: {
                username: user.id_user,
                role: user.perfil_user
            }
        });
        
    } catch (err) {
        console.error("Error en login:", err);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    } finally {
        if (client) client.release();
    }
};

  

module.exports = { doLogin }