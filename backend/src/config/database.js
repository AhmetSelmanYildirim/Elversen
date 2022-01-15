const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to Database'))
    .catch(e => {
        console.log('An error occured while connecting to database: ' + e)
    })