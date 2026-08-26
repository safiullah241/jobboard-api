const Job = require("../models/Job");
const { jobSchema } = require("../validation/jobValidation");

const createJob = async (req, res) =>
{
    try
    {
        const { error } = jobSchema.validate(req.body);

        if (error)
        {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const job = await Job.create({
            ...req.body,
            employer: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job
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

const getJobs = async (req, res) =>
{
    try
    {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        const skip = (page - 1) * limit;

        const { search, location, category } = req.query;

        const filter = {};

        if (search)
        {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } }
            ];
        }

        if (location)
        {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        if (category)
        {
            filter.category = {
                $regex: category,
                $options: "i"
            };
        }

        const [jobs, total] = await Promise.all([
            Job.find(filter)
                .populate("employer", "name email")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Job.countDocuments(filter)
        ]);

        res.json({
            success: true,
            pagination:
            {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            jobs
        });
    }
    catch (error)
    {
        console.error("GET JOBS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getJob = async (req, res) =>
{
    try
    {
        const job = await Job.findById(req.params.id)
            .populate("employer", "name email");

        if (!job)
        {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.json({
            success: true,
            job
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

const updateJob = async (req, res) =>
{
    try
    {
        const { error } = jobSchema.validate(req.body);

        if (error)
        {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
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

        if (job.employer.toString() !== req.user.id)
        {
            return res.status(403).json({
                success: false,
                message: "You can only update your own jobs"
            });
        }

        Object.assign(job, req.body);
        await job.save();

        res.json({
            success: true,
            message: "Job updated successfully",
            job
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

const deleteJob = async (req, res) =>
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
                message: "You can only delete your own jobs"
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Job deleted successfully"
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

module.exports = {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob
};