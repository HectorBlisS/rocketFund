const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    followingProjects:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    contacts:[
        {
            type:Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    role:{
        type: String,
        enum:['ADMIN', 'GUEST', 'FUNDER', 'OWNER'],
        default:'GUEST'
    },
    canPublish:{
        type: Boolean,
        default: false
    }
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'});
module.exports = mongoose.model('User', userSchema);