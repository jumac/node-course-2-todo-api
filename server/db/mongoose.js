var mongoose = require('mongoose');
console.log(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }); 

module.exports = {
    mongoose
};

//process.env.NODE_ENV