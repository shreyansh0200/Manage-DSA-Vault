import { useEffect, useState } from "react";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import QuestionCard from "../components/QuestionCard";

import "../styles/dashboard.css";

function Dashboard() {

const { user } = useAuth();
const [questions, setQuestions] = useState([]);

const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [topicFilter, setTopicFilter] = useState("All");
const [showFavorite, setShowFavorite] = useState(false);
    useEffect(() => {

        fetchQuestions();

    }, []);

    const fetchQuestions = async () => {

        try {

            const res = await API.get("/question");

            setQuestions(res.data.questions);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

 const filteredQuestions = questions.filter((q)=>{

    const searchMatch =

        q.title.toLowerCase().includes(search.toLowerCase())

        ||

        q.topic.toLowerCase().includes(search.toLowerCase());

    const topicMatch =

        topicFilter==="All"

        ||

        q.topic===topicFilter;

    const favoriteMatch =

        !showFavorite

        ||

        q.favorite;

        return searchMatch && topicMatch && favoriteMatch;

});

const easyQuestions = filteredQuestions.filter(
    (q) => q.difficulty === "Easy"
);

const mediumQuestions = filteredQuestions.filter(
    (q) => q.difficulty === "Medium"
);

const hardQuestions = filteredQuestions.filter(
    (q) => q.difficulty === "Hard"
);

const questionLimit = user?.maxQuestions || 200;
const createdCount = user?.createdQuestions || 0;
const progressPercent = Math.min((createdCount / questionLimit) * 100, 100);

    return (

        <>

            <Navbar />

            <div className="dashboard">

                <Sidebar />

                <div className="dashboard-content">

                    <h2>Workspace</h2>
                    <input
                        className="search-box"
                        type="text"
                        placeholder="Search by Title or Topic..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="filters-row">
                        <select
                            className="topic-filter"
                            value={topicFilter}
                            onChange={(e) => setTopicFilter(e.target.value)}
                        >
                            <option>All</option>
                            <option>Array</option>
                            <option>String</option>
                            <option>Linked List</option>
                            <option>Tree</option>
                            <option>Graph</option>
                            <option>DP</option>
                            <option>Heap</option>
                            <option>Trie</option>
                            <option>Backtracking</option>
                        </select>

                        <label className="favorite-filter">
                            <input
                                type="checkbox"
                                checked={showFavorite}
                                onChange={() => setShowFavorite(!showFavorite)}
                            />
                            Show Favorites Only
                        </label>
                    </div>

                    <div className="progress">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${progressPercent}%`
                            }}
                        ></div>
                    </div>

                    <p>{createdCount} / {questionLimit} Questions</p>

                    <div className="stats">
                        <StatsCard
                            title="Easy"
                            value={easyQuestions.length}
                        />
                        <StatsCard
                            title="Medium"
                            value={mediumQuestions.length}
                        />
                        <StatsCard
                            title="Hard"
                            value={hardQuestions.length}
                        />
                        <StatsCard
                            title="Total"
                            value={questions.length}
                        />

                    </div>

                    {loading ? (

                        <h2>Loading...</h2>

                    ) : (

                        <>

                            <section>

                                <h2>Easy Questions</h2>

                                {easyQuestions.length === 0 ? (

                                    <p>No Easy Questions</p>

                                ) : (

                                    easyQuestions.map((question) => (

                                        <QuestionCard
                                            key={question._id}
                                            question={question}
                                        />

                                    ))

                                )}

                            </section>

                            <section>

                                <h2>Medium Questions</h2>

                                {mediumQuestions.length === 0 ? (

                                    <p>No Medium Questions</p>

                                ) : (

                                    mediumQuestions.map((question) => (

                                        <QuestionCard
                                            key={question._id}
                                            question={question}
                                        />

                                    ))

                                )}

                            </section>

                            <section>

                                <h2>Hard Questions</h2>

                                {hardQuestions.length === 0 ? (

                                    <p>No Hard Questions</p>

                                ) : (

                                    hardQuestions.map((question) => (

                                        <QuestionCard
                                            key={question._id}
                                            question={question}
                                        />

                                    ))

                                )}

                            </section>

                        </>

                    )}

                </div>

            </div>

        </>

    );

}

export default Dashboard;