import express from 'express';
import {Channel} from "../connectors";

const router = express.Router();

router.post('/addChannel', function (req, res, next) {
    Channel.create({
        category: req.body.category,
        description: req.body.description
    }).then(channel => {
        console.log('channel created.' + JSON.stringify(channel));
        res.send({data: 'success', id: channel.id});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        res.send({data: err});
    });
});

router.get('/getChannels', function (req,res, next) {
    Channel.findAll().then(result => {
        console.log('channel find all' + result.length);
        res.send({data:'success',channels: JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find all channels failed' + err);
        res.send({data:err});
    })
});

router.delete('/deleteChannel', function (req, res, next) {
    Channel.destroy({
        where:{
            id:req.query.id
        }
    }).then(success => {
        console.log('channel delete success'+success);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('channel delete failed: ' + err);
        if (err.name.includes('ForeignKeyConstraintError'))
            res.send({data:'ForeignKeyConstraintError'});
        else
            res.send({data: err});
    })
});

export {router as channel};