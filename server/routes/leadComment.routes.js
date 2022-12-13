const express = require("express");
const auth = require("../middleware/auth.middleware");
const LeadComment = require("../models/LeadComment");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const list = await LeadComment.find();
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newLeadComment = await LeadComment.create({ ...req.body });
      res.status(201).send(newLeadComment);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  });

router
  .route("/:leadCommentId")
  .delete(auth, async (req, res) => {
    try {
      const { leadCommentId } = req.params;
      const removedLeadComment = LeadComment.findById(leadCommentId);
      await removedLeadComment.deleteOne();
      return res.send(null);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const { leadCommentId } = req.params;
      const updatedLeadComment = await LeadComment.findByIdAndUpdate(
        leadCommentId,
        req.body,
        { new: true }
      );
      res.send(updatedLeadComment);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  });
module.exports = router;
