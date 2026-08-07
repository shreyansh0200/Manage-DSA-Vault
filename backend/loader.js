require("dotenv").config();

const { connect } = require("./config/database");

const Question = require("./models/Question");

const questions = require("./seed/question");


const loadQuestions = async()=>{


try{


await connect();


await Question.deleteMany({
    user:null
});


const data = questions.map(q=>({

...q,

user:null,

isDefaultQuestion:true

}));


await Question.insertMany(data);


console.log("Questions Loaded");


process.exit();


}

catch(error){

console.log(error);

process.exit();

}


}


loadQuestions();