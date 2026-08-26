const express = require("express");
const upload = require("../middleware/upload");

const {
    createApplication,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
} = require("../controllers/applicationController");

const protect = require("../middleware/auth");
const authorize = require("../middleware/role");

const router = express.Router();

router.post(
    "/jobs/:id/applications",
    protect,
    authorize("user"),
    upload.single("resume"),
    createApplication
);

router.get(
    "/applications/my",
    protect,
    authorize("user"),
    getMyApplications
);

router.get(
    "/jobs/:id/applications",
    protect,
    authorize("employer"),
    getJobApplications
);

router.patch(
    "/applications/:id/status",
    protect,
    authorize("employer"),
    updateApplicationStatus
);

module.exports = router;