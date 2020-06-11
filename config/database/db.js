import mongoose from 'mongoose';

module.exports = () => {
    mongoose.set('useUnifiedTopology', true);
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/toDoApp', {useNewUrlParser: true});
    mongoose.connection
    .once('connected', () => {
        console.log("connect to database successfully");
    })
    .on('error', err => {
        console.log(err);
    });
}