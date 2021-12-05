const router = require('express').Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Model = require('../models/UserModel');

router.use(bodyParser.json());

router.get('/', (req, res) => {    
    Model.find({}, (err, result) => {
        if (err) {
            res.send({ error: err });
            return;
        }
        res.send({ result: result });
        
    }).populate(['role','status']);
});

router.get('/:id', (req, res) => {
    Model.findById(req.params.id, (err, result) => {
        if (err) {
            res.send({ error: err });
            return;
        }
        res.send({ result: result });

    }).populate(['role','status']);
});

router.post('/search', (req, res) => {
    
    const search = new RegExp(`.*${req.body.name}.*`); //pass to RegExp for case-insensitive search

    Model.find({
        $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ]
    }, (err, result) => {
        if (err) {
            res.send({ error: err });
            return;
        }
        res.send({ result: result });

    }).populate(['role','status']);
});

router.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const newRecord = new Model({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        role: req.body.role,
        status: req.body.status
    });    

    newRecord.save().then(function(savedData){
        // display newly created data
        res.send({result: savedData })
    }).catch(function(err){
        // some error occurred while saving, like any required field missing
        //throw new Error(err.message);
        res.send({ error: err.message.indexOf('duplicate') > -1 ? "Email already exist!" : err.message });
    });
});

router.put('/:id', (req, res) => {    
    Model.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                status: req.body.status
            }
        },
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
        }
    );
});

router.post('/login', (req, res) => {
    Model.findOne({ email: req.body.email }).populate(['role','status']).then( async (foundUser) => {
       if( foundUser ){
           let match = await bcrypt.compare( req.body.password, foundUser.password ); 
    
            if (match) {
                //check if inactive
                if (foundUser.status.name.toLowerCase() === "inactive") {
                    res.send({ error: "Your account is Inactive!" });
                } else {
                    res.send({ result: foundUser });
                }                
            }else{
                res.send({ error: "Authentication Failed!" });
            }
       }else{
           res.send({ error: "Authentication Failed!"});
       } 
    })
});

router.put('/changepass/:id', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);    

    Model.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                password: hashed
            }
        },
        { new: true },
        (err, result) => {
            if (err) {
                res.send({ error: err });
                return;
            }

            res.send({ result: result });            
    });
});

module.exports = router;
