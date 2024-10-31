const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const userRouter = require('./routes/userRoute');

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.static('uploads'));
// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

app.use('/api/v1/clientes', userRouter)

app.get('/api/v1/clientes/:imagen', (req, res) => {
    const imagen = req.params.imagen;
    res.sendFile(__dirname + '/uploads/' + imagen);
});

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => console.log('Servidor andando en puerto: ' + PORT))