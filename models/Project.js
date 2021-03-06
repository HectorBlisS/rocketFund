const Schema = require('mongoose').Schema;

const projectSchema = new Schema({
    duration: String,
    photo:String,
    video: String,
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title:{
        type: String,
        required: true
    },
    summary:String,
    body: String,
    category: {
        type: String,
        default: 'Industrias creativas'
    },
    status:{
        type: String,
        enum: ['PUBLISHED', 'DRAFT', 'VALIDATING', 'ARCHIVED'],
        default: 'DRAFT'
    },
    active: {
        type: Boolean,
        default: true
    },
    goal: Number,
    collected: Number,
    visits: Number,
    startDate: Date,
    endDate: Date,
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
    ],
    rewards:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Reward'
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    promoted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// projectSchema.virtual = ()=>{

// }

module.exports = require('mongoose').model('Project', projectSchema);