import express from 'express';
import {LiveServer} from "../connectors";

const router = express.Router();

router.post('/addLiveServer', function (req, res, next) {
    LiveServer.create({
        serverId: req.body.serverId,
        port: req.body.port,
        maxStream: req.body.maxStream,
        rootServerId: req.body.rootServerId,
    }).then(liveServer => {
        console.log('liveServer created.' + JSON.stringify(liveServer));
        res.send({data: 'success', id: liveServer.id});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        res.send({data: err});
    });
});

router.get('/getLiveServers', function (req,res, next) {
    LiveServer.findAll().then(result => {
        console.log('liveServer find all' + result.length);
        res.send({data:'success',liveServers: JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find all liveServers failed' + err);
        res.send({data:err});
    })
});

router.delete('/deleteLiveServer', function (req, res, next) {
    LiveServer.destroy({
        where:{
            id:req.query.id
        }
    }).then(success => {
        console.log('liveServer delete success'+success);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('liveServer delete failed: ' + err);
        if (err.name.includes('ForeignKeyConstraintError'))
            res.send({data:'ForeignKeyConstraintError'});
        else
            res.send({data: err});
    })
});

export {router as liveServer};