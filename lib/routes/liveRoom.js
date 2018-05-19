import express from 'express';
import {LiveRoom} from "../connectors";

const router = express.Router();

router.post('/addLiveRoom', function (req, res, next) {
    LiveRoom.create({
        title: req.body.title,
        description: req.body.description,
        teacherName: req.body.teacherName,
        channelId: req.body.channelId,
        watchingNumber: req.body.watchingNumber
    }).then(liveRoom => {
        console.log('liveRoom created.' + JSON.stringify(liveRoom));
        res.send({data: 'success', id: liveRoom.id});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        res.send({data: err});
    });
});

router.get('/getLiveRooms', function (req,res, next) {
    LiveRoom.findAll().then(result => {
        console.log('liveRoom find all' + result.length);
        res.send({data:'success',liveRooms: JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find all liveRooms failed' + err);
        res.send({data:err});
    })
});

router.get('/getTargetLiveRooms', function (req, res, next) {
    LiveRoom.findAll({
        where:{
            channelId: req.body.channelId
        }
    }).then(result => {
        console.log('liveRoom find where channelId is ' + req.body.channelId +' ,count: '+ result.length);
        res.send({data:'succness',liveRooms:JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find liveRooms where channelId is '+req.body.channelId +' failed' + err);
        res.send({data:err});
    })
});

router.delete('/deleteLiveRoom', function (req, res, next) {
    LiveRoom.destroy({
        where:{
            id:req.query.id
        }
    }).then(success => {
        console.log('liveRoom delete success'+success);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('liveRoom delete failed: ' + err);
        if (err.name.includes('ForeignKeyConstraintError'))
            res.send({data:'ForeignKeyConstraintError'});
        else
            res.send({data: err});
    })
});

export {router as liveRoom};