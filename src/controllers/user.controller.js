const User = require('../models/User.model');

const userController = {};

userController.signup = async(req, res) => {
    const {name, email, password, confirmPassword} = req.body;
    // Por cuestiones de legibilidad comprobamos si el usuario ya ha sido registrado aqui
    // Y de esta forma evitamos tener if's anidados
    const emailUser = await User.findOne({email: email});

    if(password !== confirmPassword) res.status(403).json({
        server: 'Las contraseñas no coinciden'
    });

    else if(emailUser) res.status(401).json({
        server: 'El usuario ya ha sido registrado'
    });

    else {
        const newUser = new User({name, email, password});
        await newUser.encryptPassword(password);
        await newUser.save();
        res.status(200).json({
            server: 'Usuario registrado'
        })
    }
}

module.exports = userController;