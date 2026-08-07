import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";

import "../styles/auth.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({

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

            const res = await API.post("/auth/login", form);

            login(res.data.user, res.data.token);

            navigate("/dashboard");

        }

        catch (error) {

            alert(error.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div className="auth-container">

            <form className="auth-card" onSubmit={handleSubmit}>

                <h2>Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    Login

                </button>

                <p>

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;