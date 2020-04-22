// External Libraries import
const mongoose = require('mongoose');

// Local libraries imports
const Util = require('../../util/helpers.js');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        minlength: 3,
        validate: {
            validator: Util.validateEmail,
            message: props => `${props.value} is not a valid email address!`
        }
    },

    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        validate: {
            validator: Util.validatePassword,
            message: props => `${props.value} does not match requirements!`
        }
    }
}, {
    timestamps: true
})

// Before saveing a new user
userSchema.pre('save', function (next) {
    const user = this;
    try {
        // Hash user password
        const hash = Util.hash(user.password)
        user.password = hash;
        return next();
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// Create a password compare function to use to compare passwords inputted by the user during login
// This method will be available on every document that comes back from the database
userSchema.methods.comparePassword = function (inputPassw) {
    // Only accept strings
    if (typeof inputPassw === 'string') {
        return Util.hash(inputPassw) === this.password;
    } else {
        return false;
    }
}

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;