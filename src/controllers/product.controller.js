'use strict'
const Product = require('../models/Product.model');

const productController = {};

productController.get = async(req, res) => {
    const id = req.query.id;
    // Retrieve all products
    if(id === undefined) {
        res.send('owo');
    }
    // Retrieve product by id
    else {
        res.send('awa');
    }
}

module.exports = productController