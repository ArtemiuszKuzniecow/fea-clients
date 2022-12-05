const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId) {
      const user = await User.findById(userId);
      res.status(200).send(user);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something was wrong, try it later.",
    });
  }
});

module.exports = router;
