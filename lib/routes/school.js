import express from 'express';
import {School} from "../connectors";

const router = express.Router();

router.post('/addSchool', function (req, res, next) {
    School.create({
        name: req.body.name
    }).then(school => {
        console.log('school created.' + JSON.stringify(school));
        res.send({data: 'success', id: school.id});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        res.send({data: err});
    });
});

router.get('/getSchools', function (req,res, next) {
    School.findAll().then(result => {
        console.log('school find all' + result.length);
        res.send({data:'success',schools: JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find all schools failed' + err);
        res.send({data:err});
    })
});

router.delete('/deleteSchool', function (req, res, next) {
    School.destroy({
        where:{
            id:req.query.id
        }
    }).then(success => {
        console.log('School delete success'+success);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('School delete failed: ' + err);
        if (err.name.includes('ForeignKeyConstraintError'))
            res.send({data:'ForeignKeyConstraintError'});
        else
            res.send({data: err});
    })
});

export {router as school};