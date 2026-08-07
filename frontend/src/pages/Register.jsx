import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/auth.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        fullname: "",

        email: "",

        password: ""

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

            await API.post("/auth/register", form);

            alert("Registration Successful");

            navigate("/login");

        }

        catch (error) {

            alert(error.response?.data?.message || "Registration Failed");

        }

    };

    return (

        <div className="auth-container">

            <form className="auth-card" onSubmit={handleSubmit}>

                <h2>Create Account</h2>

                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={form.fullname}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    Register

                </button>

                <p>

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Register;