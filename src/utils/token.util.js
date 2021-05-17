const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
require('dotenv').config();

let token = {}

token.verify = async(req, res, next) => {
    if(req.headers.token === null) res.status(401).json({
        server: 'No estas autenticado'
    });
    try {
        const token = req.headers.token;
        const { id } = jwt.verify(token, process.env.TOKEN_PASS);
        const user = await User.findOne({_id:id});
        if(user === null) res.status(403).json({
            server: 'Vaya, tienes la contraseña de mi token pero no el id del usuario'
        });
        else if(user.token === null) res.status(403).json({
            server: 'La sesion ha sido finalizada'
        });
        // Esto habilita que solo haya una sesion abierta por usuario a la vez
        else if(user.token !== token) res.status(403).json({
            server: 'Ya hay una sesion activa'
        });
        //
        else {
            req.userId = id;
            next();
        }
    } catch(e) {
        console.log(e);
        if(e.name === 'TokenExpiredError') res.status(403).json({
            server: 'La sesion ha finalizado'
        });
        else res.status(403).json({
            server: 'Token corrupto'
        });
    }
}

module.exports = token;