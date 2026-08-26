const Application = require("../models/Application");
const Job = require("../models/Job");

const createApplication = async (req, res) =>
{
    try
    {
        const { coverLetter } = req.body;

        if (!coverLetter || coverLetter.trim().length < 10)
        {
            return res.status(400).json({
                success: false,
                message: "Cover letter must be at least 10 characters"
            });
        }

        const job = await Job.findById(req.params.id);

        if (!job)
        {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        const existingApplication = await Application.findOne({
            job: req.params.id,
            applicant: req.user.id
        });

        if (existingApplication)
        {
            return res.status(409).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        const application = await Application.create({
    job: req.params.id,
    applicant: req.user.id,
    coverLetter,
    resume: req.file ? req.file.filename : null
});

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application
        });
    }
    catch (error)
    {
        console.error("CREATE APPLICATION ERROR:", error);

    res.status(500).json({
        success: false,
        message: error.message
        });
    }
};

const getMyApplications = async (req, res) =>
{
    try
    {
        const applications = await Application.find({
            applicant: req.user.id
        })
            .populate("job")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: applications.length,
            applications
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getJobApplications = async (req, res) =>
{
    try
    {
        const job = await Job.findById(req.params.id);

        if (!job)
        {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.employer.toString() !== req.user.id)
        {
            return res.status(403).json({
                success: false,
                message: "You can only view applications for your own jobs"
            });
        }

        const applications = await Application.find({
            job: req.params.id
        })
            .populate("applicant", "name email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: applications.length,
            applications
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateApplicationStatus = async (req, res) =>
{
    try
    {
        const { status } = req.body;

        if (!["pending", "accepted", "rejected"].includes(status))
        {
            return res.status(400).json({
                success: false,
                message: "Invalid application status"
            });
        }

        const application = await Application.findById(req.params.id)
            .populate("job");

        if (!application)
        {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        if (application.job.employer.toString() !== req.user.id)
        {
            return res.status(403).json({
                success: false,
                message: "You can only update applications for your own jobs"
            });
        }

        application.status = status;
        await application.save();

        res.json({
            success: true,
            message: "Application status updated successfully",
            application
        });
    }
    catch (error)
{
    console.error("CREATE APPLICATION ERROR:", error);

    res.status(500).json({
        success: false,
        message: error.message
    });
}
};

module.exports = {
    createApplication,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
};