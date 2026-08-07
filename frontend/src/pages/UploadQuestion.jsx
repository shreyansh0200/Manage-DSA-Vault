import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/upload.css";

function UploadQuestion() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        title: "",

        link: "",

        difficulty: "Easy",

        topic: "Array"

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/question", form);

            alert("Question Added Successfully");

            navigate("/dashboard");

        }

        catch (error) {

            alert(error.response?.data?.message || "Failed");

        }

    };

    return (

        <>

            <Navbar />

            <div className="dashboard">

                <Sidebar />

                <div className="upload-container">

                    <form

                        className="upload-form"

                        onSubmit={handleSubmit}

                    >

                        <h2>Add New Question</h2>

                        <input

                            type="text"

                            name="title"

                            placeholder="Question Title"

                            required

                            onChange={handleChange}

                        />

                        <input

                            type="url"

                            name="link"

                            placeholder="Question Link"

                            required

                            onChange={handleChange}

                        />

                        <select

                            name="difficulty"

                            onChange={handleChange}

                        >

                            <option>Easy</option>

                            <option>Medium</option>

                            <option>Hard</option>

                        </select>

                        <select

                            name="topic"

                            onChange={handleChange}

                        >

                            <option>Array</option>

                            <option>String</option>

                            <option>Linked List</option>

                            <option>Stack</option>

                            <option>Queue</option>

                            <option>Tree</option>

                            <option>BST</option>

                            <option>Graph</option>

                            <option>Heap</option>

                            <option>HashMap</option>

                            <option>Binary Search</option>

                            <option>Greedy</option>

                            <option>DP</option>

                            <option>Backtracking</option>

                            <option>Trie</option>

                            <option>Sliding Window</option>

                            <option>Bit Manipulation</option>

                        </select>

                        <button>

                            Save Question

                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default UploadQuestion;