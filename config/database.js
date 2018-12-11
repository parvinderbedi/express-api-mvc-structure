const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODBURL || 'mongodb://localhost:27017/expressProject', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
module.exports = {mongoose};
