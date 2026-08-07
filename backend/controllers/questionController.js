const Question = require("../models/Question");
const User = require("../models/User");
const { canCreateQuestion } = require("../utils/questionLimit");

exports.updateQuestion = async (req, res) => {
    try {
        const { notes, code, language } = req.body;

        const question = await Question.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        question.notes = notes;
        question.code = code;
        question.language = language;

        await question.save();

        res.status(200).json({
            success: true,
            message: "Question Updated",
            question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ============================
// Add Question
// ============================
exports.addQuestion = async (req, res) => {

    try {

        const { title, link, difficulty, topic } = req.body;

        if (!title || !link || !difficulty || !topic) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        if (!canCreateQuestion(user)) {

            return res.status(403).json({
                success: false,
                message: "Question limit reached"
            });

        }

        const question = await Question.create({

            user: user._id,

            title,

            link,

            difficulty,

            topic

        });

        user.createdQuestions++;

        await user.save();

        res.status(201).json({

            success: true,

            message: "Question Added",

            question

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

// ============================
// Get All Questions
// ============================

exports.getQuestions = async (req, res) => {

    try {

        const questions = await Question.find({

            user: req.user.id

        }).sort({

            difficulty: 1,

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            questions

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }
};

exports.getStats = async (req, res) => {
    try {
        const total = await Question.countDocuments({ user: req.user.id });
        const easy = await Question.countDocuments({ user: req.user.id, difficulty: "Easy" });
        const medium = await Question.countDocuments({ user: req.user.id, difficulty: "Medium" });
        const hard = await Question.countDocuments({ user: req.user.id, difficulty: "Hard" });

        res.status(200).json({
            success: true,
            stats: { easy, medium, hard, total }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ============================
// Get Single Question
// ============================

exports.getQuestion = async (req, res) => {

    try {

        const question = await Question.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!question) {

            return res.status(404).json({

                success: false,

                message: "Question not found"

            });

        }

        res.status(200).json({

            success: true,

            question

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};



exports.toggleFavorite = async (req, res) => {

    try {

        const question = await Question.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!question) {

            return res.status(404).json({

                success: false,

                message: "Question not found"

            });

        }

        question.favorite = !question.favorite;

        await question.save();

        res.status(200).json({

            success: true,

            favorite: question.favorite

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

// ============================
// Delete Question
// ============================

exports.deleteQuestion = async (req, res) => {

    try {

        const question = await Question.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!question) {

            return res.status(404).json({

                success: false,

                message: "Question not found"

            });

        }

        await Question.findByIdAndDelete(req.params.id);

        await User.findByIdAndUpdate(req.user.id, {

            $inc: {

                createdQuestions: -1

            }

        });

        res.status(200).json({

            success: true,

            message: "Question Deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};