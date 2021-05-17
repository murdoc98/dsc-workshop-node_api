'use strict'
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
require('dotenv').config();

const userController = {};

userController.signup = async(req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    // Por cuestiones de legibilidad comprobamos si el usuario ya ha sido registrado aqui
    // Y de esta forma evitamos tener if's anidados
    const emailUser = await User.findOne({email});

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
        });
    }
}

userController.login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    console.log(user);
    if(user === null) res.status(404).json({
        server: 'Correo no encontrado'
    });
    else if(user.password !== password) res.status(403).json({
        server: 'Contraseña incorrecta'
    });
    else {
        const newToken = jwt.sign(
            { id: user.id }, 
            process.env.TOKEN_PASS,
            { expiresIn: '10m' }
        );
        user.token = newToken;
        await User.findByIdAndUpdate(user.id, {token:newToken})
            .then((user) => console.log(`${user.name} was updated`))
            .catch((err) => console.log(chalk.bold.red('Error:'), err));
        res.status(200).header({token:newToken}).json({
            server: 'Inicio de sesion exitoso'
        });
    }
}

userController.profile = async(req, res) => {
    let user = await User.findById(req.userId, ['name', 'email']);
    // No se puede modificar atributos de moongose por lo que lo pasamos a un 
    // objeto plano
    user = user.toObject();
    // Borramos el id ya que no es relevante en el response
    delete user._id;
    if(user === null) res.status(404).json({
        server: 'Token corrupto :c'
    });
    else res.status(200).json(user);
}

userController.logout = async(req, res) => {;
    await User.findByIdAndUpdate(req.userId, {token:null})
        .then((user) => console.log(`User was updated`))
        .catch((err) => console.log(chalk.bold.red('Error:'), err));
    console.log(await User.find());
    res.status(200).json({
        server: 'Sesion finalizada'
    });
}

module.exports = userController;