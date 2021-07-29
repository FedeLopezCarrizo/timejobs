const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1/timejobs';
const db = mongoose.connection;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .catch(err => console.log(err));

db.once('open', _ => {
    console.log('Database is connected to ', uri);
});

db.on('error', err => {
    console.log(err);
})