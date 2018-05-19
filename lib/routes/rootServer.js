import express from 'express';
import {RootServer} from "../connectors";

const router = express.Router();

router.post('/addRootServer', function (req, res, next) {
    RootServer.create({
        serverId: req.body.serverId,
        port: req.body.port,
    }).then(rootServer => {
        console.log('rootServer created.' + JSON.stringify(rootServer));
        res.send({data: 'success', id: rootServer.id});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        res.send({data: err});
    });
});

router.get('/getRootServers', function (req,res, next) {
    RootServer.findAll().then(result => {
        console.log('rootServer find all' + result.length);
        res.send({data:'success',rootServers: JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find all rootServers failed' + err);
        res.send({data:err});
    })
});

router.delete('/deleteRootServer', function (req, res, next) {
    RootServer.destroy({
        where:{
            id:req.query.id
        }
    }).then(success => {
        console.log('RootServer delete success'+success);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('RootServer delete failed: ' + err);
        if (err.name.includes('ForeignKeyConstraintError'))
            res.send({data:'ForeignKeyConstraintError'});
        else
            res.send({data: err});
    })
});

export {router as rootServer};