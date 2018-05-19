import express from 'express';
import {Room} from "../connectors";

const router = express.Router();

router.post('/addRoom', function (req, res, next) {
    Room.create({
        name: req.body.name,
        campusId: req.body.campusId
    }).then(room => {
        console.log('room created.' + JSON.stringify(room));
        res.send({data: 'success', id: room.id});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        res.send({data: err});
    });
});

router.get('/getRooms', function (req,res, next) {
    Room.findAll().then(result => {
        console.log('room find all' + result.length);
        res.send({data:'success',rooms: JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find all rooms failed' + err);
        res.send({data:err});
    })
});

router.delete('/deleteRoom', function (req, res, next) {
    Room.destroy({
        where:{
            id:req.query.id
        }
    }).then(success => {
        console.log('room deleted success'+success);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        if (err.name.includes('ForeignKeyConstraintError'))
            res.send({data:'ForeignKeyConstraintError'});
        else
            res.send({data: err});
    })
});

export {router as room};