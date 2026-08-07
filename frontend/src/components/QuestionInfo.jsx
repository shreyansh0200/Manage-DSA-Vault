function QuestionInfo({

    question

}){

    return(

        <div className="question-info">

            <h1>

                {question.title}

            </h1>

            <h3>

                {question.topic}

            </h3>

            <h3>

                {question.difficulty}

            </h3>

        </div>

    )

}

export default QuestionInfo;