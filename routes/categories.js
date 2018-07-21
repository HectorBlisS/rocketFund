const router = require('express').Router();
const Category = require('../models/Category');
const verifyToken = require('../helpers/jwt').verifyToken;

router.get('/', (req,res)=>{
    Category.find()
    .then(items=>{
        res.status(200).send(items)
    })
    .catch(next())
})

module.exports = router