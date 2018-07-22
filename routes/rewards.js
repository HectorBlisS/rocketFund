const router = require('express').Router();
const Reward = require('../models/Reward');
const Project = require('../models/Project');
const verifyToken = require('../helpers/jwt').verifyToken;

const canPublish = (req,res,next)=>{
    if(req.user.role === 'OWNER' && req.user.canPublish) return next();
    res.status(403).json({status:'Forbidden', message:'No tienes permiso para publicar'});
}

const canEdit = (req,res,next)=>{
    Reward.findOne({_id:req.params.id, owner:req.user._id})
    .then(item=>{
        if(item) return next();
        return res.status(404).send({message:'No se encotró ninguna recompens que coincida'})
    })
    .catch(e=>{
        res.status(403).json({e,status:'Forbidden', message:'No tienes permiso para editar esta recompensa'});
    });
    
}

//public
router.get('/', (req,res,next)=>{
    const query = {active:true};
    let skip = 0;
    if(req.query.skip) {
        skip = req.query.skip;
        skip += 20;
    }
    if(req.query.category) query['category'] = req.query.category; 
    if(req.query.title) query.title = {$regex:req.query.title, $options:'i'};

    Reward.find(query).limit(20).skip(skip)
    .then(items=>{
        res.json({items,skip})
    })
    .catch(e=>next(e));
});

router.get('/:id', (req,res,next)=>{
    const query = {active:true};
    query._id = req.params.id;
    Reward.findOne(query)
    .then(item=>{
        res.json(item)
    })
    .catch(e=>next(e));
});

//user crud
router.get('/:id', (req,res,next)=>{
    Reward.findById(req.params.id)
    .then(item=>{
        res.json(item)
    })
    .catch(e=>next(e));
});

router.post('/', verifyToken, canPublish, (req,res,next)=>{
    let newReward = {}
    req.body.owner = req.user._id
    Reward.create(req.body)
    .then(item=>{
        newReward = item;
        return Project.findByIdAndUpdate(item.project, {$push:{rewards:item._id}}, {new:true})
    })
    .then(project=>res.status(201).json(newReward))
    .catch(e=>next(e));
});

router.patch('/:id', verifyToken, canEdit, (req,res,next)=>{
    Reward.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(item=>{
        res.status(202).json(item)
    })
    .catch(e=>next(e));
})

//how to make the cascade effect?
router.delete('/:id', verifyToken, canEdit, (req,res,next)=>{
    let deleted;
    Reward.remove({_id:req.params.id})
    .then(item=>{
        deleted = item
        return Project.findByIdAndUpdate(item.project,{$pull:{ rewards:item._id}}, {new:true})
        
    })
    .then(project=>{
        res.status(200).json(deleted)
    })
    .catch(e=>next(e));
})

//admin crud

module.exports = router;