const Schema = require('mongoose').Schema;

const rewardSchema = new Schema({
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

module.exports = require('mongoose').model('Reward', rewardSchema);