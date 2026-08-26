const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { signupSchema, loginSchema } = require("../validation/authValidation");

const signup = async (req, res) =>
{
    try
    {
        const { error } = signupSchema.validate(req.body);

        if (error)
        {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser)
        {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user:
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
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

const login = async (req, res) =>
{
    try
    {
        const { error } = loginSchema.validate(req.body);

        if (error)
        {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
        {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch)
        {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user:
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
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

const getMe = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.user.id).select("-password");

        if (!user)
        {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
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
    signup,
    login,
    getMe
};