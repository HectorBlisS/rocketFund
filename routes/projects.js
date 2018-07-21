const router = require('express').Router();
const Project = require('../models/Project');
const verifyToken = require('../helpers/jwt').verifyToken;

const canPublish = (req,res,next)=>{
    if(req.user.role === 'OWNER' && req.user.canPublish) return next();
    res.status(403).json({status:'Forbidden', message:'No tienes permiso para publicar'});
}

const canEdit = (req,res,next)=>{
    Project.findOne({_id:req.params.id, owner:req.user._id})
    .then(project=>{
        if(project) return next();
        return res.status(404).send({message:'No se encotró ningun proyecto que coincida'})
    })
    .catch(e=>{
        res.status(403).json({e,status:'Forbidden', message:'No tienes permiso para editar este proyecto'});
    });
    
}

//public
router.get('/', (req,res,next)=>{
    const query = {status:"PUBLISHED", active:true};
    let skip = 0;
    if(req.query.skip) {
        skip = req.query.skip;
        skip += 20;
    }
    if(req.query.category) query['category'] = req.query.category; 
    if(req.query.title) query.title = {$regex:req.query.title, $options:'i'};

    Project.find(query).limit(20).skip(skip)
    .populate('owner')
    .then(items=>{
        res.json({items,skip})
    })
    .catch(e=>next(e));
});

router.get('/:id', (req,res,next)=>{
    const query = {status:"PUBLISHED", active:true};
    query._id = req.params.id;
    Project.findOne(query)
    .then(item=>{
        res.json(item)
    })
    .catch(e=>next(e));
});

//user crud

router.get('/:id', (req,res,next)=>{
    Project.findById(req.params.id)
    .then(item=>{
        res.json(item)
    })
    .catch(e=>next(e));
});

router.post('/', verifyToken, canPublish, (req,res,next)=>{
    Project.create(req.body)
    .then(item=>{
        res.status(201).json(item)
    })
    .catch(e=>next(e));
});

router.patch('/:id', verifyToken, canEdit, (req,res,next)=>{
    Project.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(item=>{
        res.status(201).json(item)
    })
    .catch(e=>next(e));
})

//admin crud

module.exports = router;