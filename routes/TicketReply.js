const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const bodyParser = require('body-parser');
const Model = require('../models/TicketReplyModel');

router.use(bodyParser.json());

router.get('/Ticket/:ticketID', (req, res) => {
    
    Model.find({ ticketId: ObjectId(req.params.ticketID) }, (err, result) => {
        console.log(err);
        console.log(result);
        if (err) {
            res.send({ error: err });
            return;
        }
        res.send({ result: result });
        
    }).populate('ticketId');
});

router.get('/:id', (req, res) => {
    Model.findById(req.params.id, (err, result) => {
        if (err) {
            res.send({ error: err });
            return;
        }
        res.send({ result: result });

    }).populate(['category','assignedTech','status']);
});

router.post('/', async (req, res) => {   

    const newRecord = new Model({
        ticketId: req.body.ticketId,
        name: req.body.name,
        email: req.body.email, 
        message: req.body.message
    });

    newRecord.save(err => {
        if (err) {
            res.send({ error: err.message });
        } else {
            res.send({ result: req.body });
        }
    });
});

module.exports = router;
