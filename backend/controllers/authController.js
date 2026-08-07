const User = require("../models/User");
const Question = require("../models/Question");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================
// Register
// ======================

exports.register = async (req, res) => {

    try {

        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        const defaultQuestions = await Question.find({ isDefaultQuestion: true });

        if (defaultQuestions.length > 0) {
            const userQuestions = defaultQuestions.map((q) => ({
                user: user._id,
                title: q.title,
                link: q.link,
                difficulty: q.difficulty,
                topic: q.topic,
                notes: "",
                code: "",
                language: q.language || "C++",
                favorite: false
            }));

            await Question.insertMany(userQuestions);
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({
            success: true,
            message: "Registration Successful",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                maxQuestions: user.maxQuestions,
                createdQuestions: user.createdQuestions
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }

};

// ======================
// Login
// ======================

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: "All fields are required"

            });

        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email"

            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid Password"

            });

        }

        const payload = {

            id: user._id,

            email: user.email

        };

        const token = jwt.sign(

            payload,

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                fullname: user.fullname,

                email: user.email,

                maxQuestions: user.maxQuestions,

                createdQuestions: user.createdQuestions

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};