const express = require("express");
const auth = require("../middleware/auth.middleware");
const Lead = require("../models/Lead");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const list = await Lead.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newLead = await Lead.create({
        ...req.body,
      });
      res.status(201).send(newLead);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  });

router
  .route("/:leadId")
  .delete(auth, async (req, res) => {
    try {
      const { leadId } = req.params;
      const removedLead = Lead.findById(leadId);
      await removedLead.deleteOne();
      return res.send(null);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const { leadId } = req.params;
      const updatedLead = await Lead.findByIdAndUpdate(leadId, req.body, {
        new: true,
      });
      res.send(updatedLead);
    } catch (error) {
      res.status(500).json({
        message: "Something was wrong, try it later.",
      });
    }
  });

module.exports = router;
