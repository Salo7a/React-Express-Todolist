const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose
  .connect(`mongodb://127.0.0.1/fullstacktest`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => console.error(error))

mongoose.connection.on('open', () => console.log('MongoDB connected'))

module.exports = mongoose
