const mongoose = require('mongoose');
const express = require('express');
const userRoute = require('./Route/userRoute');
const productRoute = require('./Route/productRoute')
const cors = require('cors');
require('dotenv/config');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default
app.get('/', (req, res) => {
    res.send("Home / this is default route");
})

app.use('/api/user', userRoute);
app.use('/api/product', productRoute);

async function main() {
    try {
        const res = await mongoose.connect(process.env.DB);
        const data = await res.default
        console.log(data.STATES['connected']);
    } catch (error) {
        console.log(error.message);
    }
}
main();

app.listen(process.env.PORT)