const Product = require('../Model/productModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// get Product
exports.getProduct = async(req, res) => {
    try {
        const data = await Product.find();
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// Post logic
exports.postProduct = async(req, res) => {
    try {
        // const productExists = await Product.findOne({ name: req.body.name });
        // if (productExists) return res.json({ errors: true, message: "Product already exist" })

        const data = await Product.create(req.body);
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// Put(update) logic 
exports.putProduct = async(req, res) => {
    try {
        const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// Delete Logic
exports.deleteProduct = async(req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        return res.json({ errors: false, data: data });
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}
