const router = require('express').Router();
const Category = require('../models/Category');
const verifyToken = require('../helpers/jwt').verifyToken;

router.post('/', (req,res)=>{
    Category.create(req.body)
    .then(item=>{
        res.status(200).send(item)
    })
    .catch(next())
})

router.get('/', (req,res)=>{
    Category.find()
    .then(items=>{
        res.status(200).send(items)
    })
    .catch(next())
})



module.exports = router