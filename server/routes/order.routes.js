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

router
  .route("/:orderId")
  .delete(auth, async (req, res) => {
    try {
      const { orderId } = req.params;
      const removedOrder = Order.findById(orderId);
      await removedOrder.remove();
      return res.send(null);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const { orderId } = req.params;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
        new: true,
      });
      res.send(updatedOrder);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  });

module.exports = router;
