const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./config/database").connect();

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:3001",
            "http://127.0.0.1:3000",
        ],
        credentials: true,
    })
);

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("<h2>Manage DSA Vault Backend is Running 🚀</h2>");
});

app.use("/api/auth", authRoutes);
app.use("/api/question", questionRoutes);

module.exports = app;