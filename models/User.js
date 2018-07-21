const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    donations:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Fund'
        }
    ],
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
    },
    projects:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    //profile
    genre: String,
    cover:String,
    photoURL:String,
    age:Number,
    tel:String,
    address:{
        type: String
    },
    occupation: String,
    anotherMail: String
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'});
module.exports = mongoose.model('User', userSchema);