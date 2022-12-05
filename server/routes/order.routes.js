const express = require("express");
const auth = require("../middleware/auth.middleware");
const Order = require("../models/Order");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const list = await Order.find();
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newOrder = await Order.create({
        ...req.body,
      });
      res.status(201).send(newOrder);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  });

module.exports = router;
