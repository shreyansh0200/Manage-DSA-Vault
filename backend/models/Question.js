const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema(

{
    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: false,

    },


    title: {

        type: String,

        required: true,

        trim: true,

    },


    link: {

        type: String,

        required: true,

        trim: true,

    },


    difficulty: {

        type: String,

        enum: ["Easy", "Medium", "Hard"],

        required: true,

    },


    topic: {

        type: String,

        required: true,

        trim: true,

    },


    notes: {

        type: String,

        default: "",

    },


    code: {

        type: String,

        default: "",

    },


    language: {

        type: String,

        default: "C++"

    },


    favorite: {

        type: Boolean,

        default: false,

    },


    // NEW FIELD FOR LOADER SYSTEM

    isDefaultQuestion: {

        type: Boolean,

        default: false,

    }

},

{

    timestamps: true,

}

);


module.exports = mongoose.model("Question", questionSchema);