const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        require: true,
    },
    userType:{
        type: String,
    },
    gender:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    }

    
});

module.exports = mongoose.model('User',UserSchema);









