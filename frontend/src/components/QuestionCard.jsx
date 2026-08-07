import { useNavigate } from "react-router-dom";

import API from "../services/api";

function QuestionCard({ question }) {

    const navigate = useNavigate();


    const toggleFavorite = async () => {

        try {

            await API.put(

                `/question/${question._id}/favorite`

            );

            window.location.reload();

        }

        catch (err) {

            console.log(err);

        }

    };



    const deleteQuestion = async () => {

        const ok = window.confirm(
            "Delete this question?"
        );

        if (!ok) return;

        try {

            await API.delete(`/question/${question._id}`);

            window.location.reload();

        }

        catch (error) {

            alert("Unable to delete.");

        }

    };

    return (

        <div className="question-card">

        <h3>

        <button

            className="favorite-btn"

            onClick={toggleFavorite}

            >

            {

            question.favorite

            ?

            "⭐"

            :

            "☆"

            }

        </button>

        {" "}

        {question.title}

        </h3>
            <p>

                Topic : {question.topic}

            </p>

            <p>

                Difficulty : {question.difficulty}

            </p>

            <p>

                Updated :

                {

                new Date(question.updatedAt)

                .toLocaleDateString()

                }

            </p>

            <div className="card-buttons">

                <button
                    onClick={() => window.open(question.link)}
                >
                    Open
                </button>

                <button
                    onClick={() => navigate(`/workspace/${question._id}`)}
                >
                    Notes / Code
                </button>

                <button
                    onClick={deleteQuestion}
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default QuestionCard;