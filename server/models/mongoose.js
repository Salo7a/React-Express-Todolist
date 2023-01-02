const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.set('strictQuery', false)
mongoose
    .connect(config.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(error => console.error(error))

mongoose.connection.on('open', () => console.log('MongoDB connected'))

module.exports = mongoose