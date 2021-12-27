const router = require("express").Router();
const bodyParser = require("body-parser");
const Model = require("../models/KnowledgebaseModel");

router.use(bodyParser.json());

router.get("/", (req, res) => {
  Model.find({}, (err, result) => {
    if (err) {
      res.send({ error: err });
      return;
    }
    res.send({ result: result });
  }).populate(["createdBy"]);
});

router.get("/:id", (req, res) => {
  Model.findById(req.params.id, (err, result) => {
    if (err) {
      res.send({ error: err });
      return;
    }
    res.send({ result: result });
  }).populate(["createdBy"]);
});

router.post("/search", (req, res) => {
  //pass to RegExp for case-insensitive search
  const search = new RegExp(`.*${req.body.search}.*`); //pass to RegExp for case-insensitive search

  Model.find(
    {
      $or: [
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ],
    },
    (err, result) => {
      if (err) {
        res.send({ error: err });
        return;
      }

      res.send({ result: result });
    }
  ).populate(["createdBy"]);
});

router.post("/", async (req, res) => {
  const newRecord = new Model({
    subject: req.body.subject,
    message: req.body.message,
    createdBy: req.body.createdBy,
  });

  newRecord
    .save()
    .then(function (savedData) {
      // display newly created data
      res.send({ result: savedData });
    })
    .catch(function (err) {
      //throw new Error(err.message);
      res.send({
        error:
          err.message.indexOf("duplicate") > -1
            ? "Email already exist!"
            : err.message,
      });
    });
});

router.put("/:id", (req, res) => {
  Model.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        subject: req.body.subject,
        message: req.body.message,
        createdBy: req.body.createdBy,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        res.send({ error: err });
        return;
      }

      res.send({ result: result });
    }
  ).populate(["createdBy"]);
});

router.delete("/:id", (req, res) => {
  Model.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.send({ error: err });
      return;
    }

    res.send({ result: result });
  });
});

module.exports = router;
