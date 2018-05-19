import express from 'express';
import {DirectStream} from "../connectors";

const router = express.Router();

router.post('/addDirectStream', function (req, res, next) {
    DirectStream.create({
        liveServerId: req.body.liveServerId,
        url: req.body.url,
        liveRoomId: req.body.liveRoomId,
        status: req.body.status,
    }).then(directStream => {
        console.log('directStream created.' + JSON.stringify(directStream));
        res.send({data: 'success',id: directStream.id});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        res.send({data: err});
    });
});

router.get('/getDirectStreams', function (req,res, next) {
    DirectStream.findAll().then(result => {
        console.log('directStream find all' + result.length);
        res.send({data:'success',directStreams: JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find all directStreams failed' + err);
        res.send({data:err});
    })
});

router.delete('/deleteDirectStream', function (req, res, next) {
    DirectStream.destroy({
        where:{
            id:req.query.id
        }
    }).then(success => {
        console.log('directStream delete success'+success);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('directStream delete failed: ' + err);
        if (err.name.includes('ForeignKeyConstraintError'))
            res.send({data:'ForeignKeyConstraintError'});
        else
            res.send({data: err});
    })
});

router.put('/bindLiveRoom', function (req, res, next) {
    DirectStream.update({
        liveRoomId:req.body.liveRoomId

    },{
        where:{
            id:req.body.directStreamId
        }
    }).then(success => {
        console.log('bind liveRoom success ,streamId is '+req.body.directStreamId+' , liveRoomId is '+req.body.liveRoomId);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('bind liveRoom failed' + err);
        res.send({data:err});
    })
});

export {router as directStream};