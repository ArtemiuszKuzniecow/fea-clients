const express = require("express");
const auth = require("../middleware/auth.middleware");
const OrderComment = require("../models/OrderComment");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const list = await OrderComment.find();
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newOrderComment = await OrderComment.create({ ...req.body });
      req.status(201).send(newOrderComment);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  });

router
  .route("/:orderCommentId")
  .delete(auth, async (req, res) => {
    try {
      const { orderCommentId } = req.params;
      const removedOrderComment = OrderComment.findById(orderCommentId);
      await removedOrderComment.remove();
      return res.send(null);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const { orderCommentId } = req.params;
      const updatedOrderComment = await OrderComment.findByIdAndUpdate(
        orderCommentId,
        req.body,
        { new: true }
      );
      res.send(updatedOrderComment);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  });

module.exports = router;
