const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            //validator: (value) => {
            //    return validator.isEmail(value);
            //}, 
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                next(err);
            } else {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) {
                        next(err);
                    } else {
                        user.password = hash;
                        next();
                    }
                });
            }
        });
    } else {
        next();
    }
});

//UserSchema.methods are instance/objects method
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
};

//UserSchema.statics are static methods
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    //jwt.verify will throw exception
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        //return new Promise((resolve, reject) => {
        //    reject();
        //});
        //can also be
        return Promise.reject();
    }

    //Retrieving by property
    return User.findOne({
        _id: decoded._id, 
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

//Can not add methods in mongoose.model
var User = mongoose.model('User', UserSchema);

module.exports = {User};