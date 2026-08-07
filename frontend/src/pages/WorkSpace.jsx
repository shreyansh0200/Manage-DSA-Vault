import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/workspace.css";

function Workspace() {

    const { id } = useParams();

    const [question, setQuestion] = useState(null);

    const [notes, setNotes] = useState("");

    const [code, setCode] = useState("");

    // Added
    const [language, setLanguage] = useState("C++");

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
            const res = await API.get(`/question/${id}`);

            setQuestion(res.data.question);
            setNotes(res.data.question.notes);
            setCode(res.data.question.code);

            // Added
            setLanguage(res.data.question.language || "C++");

        } catch (err) {
            console.log(err);
        }
    };

   const saveData = async () => {

    try {

        await API.put(`/question/${id}`, {

            notes,

            code,

            language

        });

        alert("Saved Successfully");

    }

    catch (err) {

        console.log(err);

        alert("Unable to Save");

    }

};

    if (!question) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Navbar />

            <div className="dashboard">
                <Sidebar />

                <div className="workspace">

                    <h1>{question.title}</h1>

                    <button
                        onClick={() => window.open(question.link)}
                    >
                        Open Question
                    </button>

                    {/* Language Dropdown */}
                    <h2>Language</h2>

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="C++">C++</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                        <option value="JavaScript">JavaScript</option>
                    </select>

                    <h2>Notes</h2>

                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />

                    <h2>Code</h2>

                    <textarea
                        className="code-editor"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    <button
                        onClick={saveData}
                    >
                        Save
                    </button>

                </div>
            </div>
        </>
    );
}

export default Workspace;