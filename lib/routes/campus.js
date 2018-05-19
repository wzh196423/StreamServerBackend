import express from 'express';
import {Campus} from "../connectors";

const router = express.Router();

router.post('/addCampus', function (req, res, next) {
    Campus.create({
        name: req.body.name,
        schoolId: req.body.schoolId
    }).then(campus => {
        console.log('campus created.' + JSON.stringify(campus));
        res.send({data: 'success', id: campus.id});
    }).catch(err => {
        console.log(req.body);
        console.log('failed: ' + err);
        res.send({data: err});
    });
});

router.get('/getCampuses', function (req,res, next) {
    Campus.findAll().then(result => {
        console.log('campus find all' + result.length);
        res.send({data:'success',campuses: JSON.stringify(result)});
    }).catch(err => {
        console.log(req.body);
        console.log('find all campuses failed' + err);
        res.send({data:err});
    })
});

router.delete('/deleteCampus', function (req, res, next) {
    Campus.destroy({
        where:{
            id:req.query.id
        }
    }).then(success => {
        console.log('campus delete success'+success);
        res.send({data: 'success'});
    }).catch(err => {
        console.log(req.body);
        console.log('campus delete failed: ' + err);
        if (err.name.includes('ForeignKeyConstraintError'))
            res.send({data:'ForeignKeyConstraintError'});
        else
            res.send({data: err});
    })
});

export {router as campus};