const express = require("express");
const {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

const protect = require("../middleware/auth");
const authorize = require("../middleware/role");

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJob);

router.post(
    "/",
    protect,
    authorize("employer"),
    createJob
);

router.put(
    "/:id",
    protect,
    authorize("employer"),
    updateJob
);

router.delete(
    "/:id",
    protect,
    authorize("employer"),
    deleteJob
);

module.exports = router;