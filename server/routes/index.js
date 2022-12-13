const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/lead", require("./lead.routes"));
router.use("/leadComments", require("./leadComment.routes"));
router.use("/order", require("./order.routes"));
router.use("/orderComments", require("./orderComment.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
