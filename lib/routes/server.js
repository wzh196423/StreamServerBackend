import express from 'express';
import {Server} from "../connectors";

const router = express.Router();

router.post('/addServer', function (req, res, next) {
    Server.create({
        ip: req.body.ip,
        brand: req.body.brand,
        registerTime: req.body.registerTime,
        description: req.body.description,
        storage: req.body.storage,
        usedStorage: req.body.usedStorage,
        cores: req.body.cores,
        memory: req.body.memory,
        roomId: req.body.roomId,
    }).then(server => {
        console.log('server created.' + JSON.stringify(server));
        res.send({data: 'success', id: server.id});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        res.send({data: err});
    });
});

router.get('/getServers', function (req,res, next) {
    Server.findAll().then(result => {
        console.log('server find all' + result.length);
        res.send({data:'success',servers: JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find all servers failed' + err);
        res.send({data:err});
    })
});

router.delete('/deleteServer', function (req, res, next) {
    Server.destroy({
        where:{
            id:req.query.id
        }
    }).then(success => {
        console.log('Server delete success'+success);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('Server delete failed: ' + err);
        if (err.name.includes('ForeignKeyConstraintError'))
            res.send({data:'ForeignKeyConstraintError'});
        else
            res.send({data: err});
    })
});

export {router as server};