const router = require('express').Router();
const bodyParser = require('body-parser');
const Model = require('../models/SettingModel');

router.use(bodyParser.json());

router.get('/', (req, res) => {    
    Model.find({}, (err, result) => {
        if (err) {
            res.send({ error: err });
            return;
        }

        res.send({ result: result });
    });
});

router.get('/:id', (req, res) => {
    Model.findById(req.params.id, (err, result) => {
        if (err) {
            res.send({ error: err });
            return;
        }

        res.send({ result: result });
    });
});

router.post('/search', (req, res) => {  

    const search = new RegExp(`.*${req.body.name}.*`); //pass to RegExp for case-insensitive search

    Model.find({ name: { $regex: search, $options: "i" } } , (err, result) => {
        if (err) {
            res.send({ error: err });
            return;
        }

        res.send({ result: result });
    });
});

router.post('/', (req, res) => {
    const newRecord = new Model(req.body);

    newRecord.save(err => {
        if (err) {
            res.send({ error: err.message.indexOf('duplicate') > -1 ? "Data already exist!" : err.message });
        } else {
            res.send({ result: req.body });
        }
    });
});

router.put('/:id', (req, res) => {
    Model.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        (err, result) => {
            if (err) {
                res.send({ error: err });
                return;
            }

            res.send({ result: result });            
    });
});

router.delete('/:id', (req, res) => {
    Model.findByIdAndRemove(
        req.params.id,
        (err, result) => {
            if (err) {
                res.send({ error: err });
                return;
            }

            res.send({ result: result });            
    });
});

module.exports = router;
