const User = require("../model/user");

const Question = require("../models/Question");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");



exports.register = async (req, res) => {

    try {

        const {
            fullname,
            email,
            password
        } = req.body;



        // Check existing user

        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "User already exists"

            });

        }



        // Hash password

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );



        // Create User

        const user = await User.create({

            fullname,

            email,

            password: hashedPassword

        });


        // Copy default questions to new user

const defaultQuestions = await Question.find({

    isDefaultQuestion: true,
    console.log(
            "Default Questions Found:",
    defaultQuestions.length,
    )

});


const userQuestions = defaultQuestions.map((q)=>({

    user: user._id,

    title: q.title,

    link: q.link,

    difficulty: q.difficulty,

    topic: q.topic,

    notes: "",

    code: "",

    language: "C++",

    favorite: false

}));


if(userQuestions.length > 0){

    await Question.insertMany(userQuestions);

}


        // ================================
        // LOAD DEFAULT DSA QUESTIONS HERE
        // ================================


        const defaultQuestions = await Question.find({

            isDefaultQuestion: true

        });



        const userQuestions = defaultQuestions.map((q) => ({

            user: user._id,

            title: q.title,

            link: q.link,

            difficulty: q.difficulty,

            topic: q.topic,

            notes: "",

            code: "",

            language: "C++",

            favorite: false

        }));



        if (userQuestions.length > 0) {

            await Question.insertMany(userQuestions);

        }



        // Generate JWT token

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

            message: "User Registered Successfully",

            user: {

                id: user._id,

                fullname: user.fullname,

                email: user.email

            },

            token

        });



    }

    catch (error) {


        console.log(error);


        res.status(500).json({

            success: false,

            message: "Registration Failed",

            error: error.message

        });


    }

};