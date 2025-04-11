const { Pool } = require('pg');
const pool = require('../database/connectiondb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const doLogin = async(req, res) => {
    const { id_user, password_user } = req.body;

    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM usuarios WHERE id_user = $1 AND estado_user = $2';
        const values = [id_user.toLowerCase(), 1];
        const user = await client.query(query, values);
  
      if (user.rows.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      const validPassword = await bcrypt.compare(password_user, user.rows[0].password_user);
  
      if (validPassword) {
        let payload = {
            username: user.rows[0].id_user,
            role: user.rows[0].perfil_user
        }
        const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '3600s'});
                            return res.status(200).send({ 
                                token : token,
                                username: user.rows[0].id_user,
                                role: user.rows[0].perfil_user
                            });
      } else {
        res.status(401).send('Contraseña incorrecta');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al iniciar sesión');
    }
  };
  

module.exports = { doLogin }