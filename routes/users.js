const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('../helpers/jwt').verifyToken;

const checkIfAdmin = (req,res,next) => {
    if(req.user.role !== "ADMIN") return res.status(403).send({message:"No tienes permiso"})
    next()
}

//admin

router.patch('/admin/:id', verifyToken, checkIfAdmin, (req,res,next)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .populate({
        path: 'projects',
        populate:{
            path: 'followers'
        }
    })
    .populate('followingProjects')
    .populate('contacts')
    .then(user=>res.status(200).json(user))
    .catch(err=>next())
})

router.get('/admin', verifyToken, checkIfAdmin, (req,res, next)=>{
    User.find()
    .then(items=>{
        res.status(200).send(items)
    })
    .catch(e=>next(e))
})



//public

// router.get('/', (req,res)=>{
//     User.find()
//     .then(items=>{
//         res.status(200).send(items)
//     })
//     .catch(e=>next(e))
// })



module.exports = router