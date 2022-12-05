const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/signUp", async (res, req) => {});
router.post("/signInWithPassword", async (res, req) => {});
router.post("/token", async (res, req) => {});

module.exports = router;
