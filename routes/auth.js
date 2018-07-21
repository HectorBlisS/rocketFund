const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
const genToken = require('../helpers/jwt').genToken;
const verifyToken = require('../helpers/jwt').verifyToken;

//update user
router.post('/self', verifyToken, (req,res,next)=>{
    if(req.user._id !== req.body._id) return res.status(403).res({message:"No tienes permiso"})
    User.findByIdAndUpdate(req.user._id, req.body)
    .then(user=>res.status(200).json(user))
    .catch(err=>next())
})

//fullUser
router.get('/self', verifyToken, (req,res,next)=>{
    User.findById(req.user._id)
    .populate('projects')
    .populate('followingProjects')
    .populate('contacts')
    .then(user=>{
        if(!user) return res.status(404).send(user);
        res.status(200).send(user);
    })
    .catch(e=>next(e));
})

router.post('/signup', (req,res,next)=>{
    User.register(req.body, req.body.password)
    .then(user=>{
        res.json({user,access_token:genToken(user)})
    })
    .catch(e=>next(e));
});

router.post('/login', 
    (req,res,next)=>{
        passport.authenticate('local', (err, user, info)=>{
            if(err) return res.status(500).send(err);
            if(!user) return res.status(403).send(info);
            //res.json({user:user,access_token:genToken(user)});
            User.findById(user._id)
            .populate({
                path: 'projects',
                populate:{
                    path: 'followers'
                }
            })
            .then(u=>res.json({user:u,access_token:genToken(u)}))
        })(req, res, next);
});

router.get('/private', verifyToken, (req,res)=>{
    //req.user is available
    res.send('tienes permiso ' + req.user.username)
});



module.exports = router;