const Schema = require('mongoose').Schema;
const Project = require('./Project');

const rewardSchema = new Schema({
    date: Date,
    quantity:Number,
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project:{
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    body: String,
    active: {
        type: Boolean,
        default: true
    },
    amount: Number,
    available: Number,
    sold: Number,
    photo:String,
    funders:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    funds:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Fund'
        }
    ]
},
{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// projectSchema.virtual = ()=>{

// }

rewardSchema.pre('remove', function(next) {
    Project.update(
        { rewards : this._id}, 
        { $pull: { rewards: this._id } },
        { multi: true })  //if reference exists in multiple documents 
    .exec();
    next();
});

module.exports = require('mongoose').model('Reward', rewardSchema);