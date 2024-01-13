const { getProduct, postProduct, putProduct, deleteProduct,  } = require('../Controller/productController');
const { auth } = require('../Middleware/auth');

const route = require('express').Router()

// Get Route
route.get('/', getProduct);

//Post Route
route.post('/',auth, postProduct)

// Put Route
route.put('/:id',auth, putProduct)

// Delete Route
route.delete('/:id',auth, deleteProduct)

module.exports = route;
