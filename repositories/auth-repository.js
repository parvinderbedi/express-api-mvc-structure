const bcrypt = require('bcryptjs');

const {User} = require('../models/User');
const {statusCode} = require('../config/constants');
const {secret} = require('../config/config');

var login = async (email, password, next) => {
    try{
        var checkUser = await User.findOne({ email });
        if (!checkUser) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = statusCode.UNAUTHORIZED;
            throw error;
          }

          const isEqual = await bcrypt.compare(password, checkUser.password);

          if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = statusCode.UNAUTHORIZED;
            throw error;
          }

          return checkUser;
    }
    catch(err){
        if (!err.statusCode) {
            err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
          }
        next(err);
    }
};

var register = async (firstName, lastName, email, password, next) => {
    try{
        var checkUser = await User.findOne({ email });
        if (checkUser) {
            const error = new Error('A user with this email is already exist in our database.');
            error.statusCode = statusCode.UNAUTHORIZED;
            throw error;
          }
          var hashedPw = await bcrypt.hash(password, secret.length);
          
          var user = new User({
              firstName,
              lastName,
              email,
              password: hashedPw
          });

          var user = await user.save();
          return {user, statusCode: statusCode.SUCCESS};
    }
    catch(err){
        if (!err.statusCode) {
            err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
          }
        next(err);
    }
};

module.exports = {
    login,
    register
};
