import express from 'express';
import {Camera} from "../connectors";

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/addCamera', function (req, res, next) {
    Camera.create({
        model: req.body.model,
        brand: req.body.brand,
        ip: req.body.ip,
        serialNumber: req.body.serialNumber,
        registerTime: req.body.registerTime,
        status: req.body.status,
        roomId: req.body.roomId,
        directStreamId: req.body.directStreamId
    }).then(camera => {
        console.log('camera created.' + JSON.stringify(camera));
        res.send({data: 'success',id: camera.id});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        res.send({data: err});
    });
});

router.put('/bindDirectStream',function (req, res, next) {
    Camera.update({
        directStreamId: null
    },{
        where:{
            directStreamId: req.body.directStreamId
        }
    }).then(result => {
        console.log('unbind stream success.');
        console.log('result type is ' + typeof result + ' and result is '+result);
        Camera.update({
            directStreamId: req.body.directStreamId
        },{
            where: {
                id: req.body.cameraId
            }
        }).then(result => {
            console.log('bind stream success. camera id is '+req.body.cameraId + ' and streamId is '+req.body.directStreamId);
            res.send({data: 'success'});
        }).catch(err => {
            console.log(req.body);
            console.log(' bind stream failed' + err);
            res.send({data:err});
        })
    }).catch(err => {
        console.log(req.body);
        console.log('unbind stream failed' + err);
        res.send({data:err});
    })
});

router.get('/getCameras', function (req,res, next) {
    Camera.findAll().then(result => {
        console.log('camera find all' + result.length);
        res.send({data:'success',cameras: JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find all cameras failed' + err);
        res.send({data:err});
    })
});

router.put('/switchCamera', function (req, res, next) {
    Camera.update({
        status: req.body.status
    },{
        where: {
            id: req.body.cameraId
        }
    }).then(camera => {
        console.log('status modified.' + 'id:'+req.body.cameraId+',new status is' + req.body.status);
        res.send({data:'success',status:req.body.status});
    }).catch(err => {
        console.log(req.body);
        console.log(req.body.cameraId+'switch camera failed' + err);
        res.send({data:err});
    })
});

router.delete('/deleteCamera', function (req, res, next) {
    Camera.destroy({
        where:{
            id:req.query.id
        }
    }).then(success => {
        console.log('camera delete success'+success);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('camera delete failed: ' + err);
        if (err.name.includes('ForeignKeyConstraintError'))
            res.send({data:'ForeignKeyConstraintError'});
        else
            res.send({data: err});
    })
});

export {router as camera};