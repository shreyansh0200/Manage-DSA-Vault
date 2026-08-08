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
        // Allow dynamic origins (handles Vercel preview domains). For stricter
        // control, set an ALLOWED_ORIGINS env var and validate against it.
        origin: true,
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