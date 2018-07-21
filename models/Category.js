const Schema = require('mongoose').Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required:true
    },
    slug: String,
    photo:String
},
{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// projectSchema.virtual = ()=>{

// }

module.exports = require('mongoose').model('Category', categorySchema);