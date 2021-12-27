const router = require("express").Router();
const bodyParser = require("body-parser");
const Model = require("../models/TicketModel");
const cors = require('cors');

router.use(cors());

router.use(bodyParser.json());

router.get("/", (req, res) => {
  Model.find({}, (err, result) => {
    if (err) {
      res.send({ error: err });
      return;
    }
    res.send({ result: result });
  }).populate(["category", "assignedTech", "status"]);
});

router.get("/openTicket", (req, res) => {
  Model.find({}, (err, result) => {
    if (err) {
      res.send({ error: err });
      return;
    }

    res.send({
      result: result.filter(
        (data) => data?.status?.name?.toLowerCase() === "open"
      ),
    });
  }).populate(["category", "assignedTech", "status"]);
});

router.get("/:id", (req, res) => {
  Model.findById(req.params.id, (err, result) => {
    if (err) {
      res.send({ error: err });
      return;
    }
    res.send({ result: result });
  }).populate(["category", "assignedTech", "status"]);
});

router.post("/search", (req, res) => {
  const search = new RegExp(`.*${req.body.search}.*`); //pass to RegExp for case-insensitive search

  Model.find(
    {
      $or: [
        { ticketNo: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
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
  ).populate(["category", "assignedTech", "status"]);
});

router.post("/", async (req, res) => {
  const newRecord = new Model({
    name: req.body.name,
    email: req.body.email,
    category: req.body.category,
    subject: req.body.subject,
    message: req.body.message,
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
        category: req.body.category,
        subject: req.body.subject,
        message: req.body.message,
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
  ).populate(["category", "assignedTech", "status"]);
});

router.put("/SetStatus/:id", (req, res) => {
  Model.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        status: req.body.status,
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
  ).populate(["category", "assignedTech", "status"]);
});

router.put("/AssignedTech/:id", (req, res) => {
  Model.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        assignedTech: req.body.assignedTech,
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
  ).populate(["category", "assignedTech", "status"]);
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

router.post("/viewTicket", (req, res) => {
  Model.find(
    { ticketNo: req.body.ticketNo, email: req.body.email },
    (err, result) => {
      if (err) {
        res.send({ error: err });
        return;
      }
      res.send({ result: result });
    }
  ).populate(["category", "assignedTech", "status"]);
});

module.exports = router;
