const mongoose = require('mongoose')

//conectar mongo
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('DB connected'))
    .catch(e => console.log(e))
