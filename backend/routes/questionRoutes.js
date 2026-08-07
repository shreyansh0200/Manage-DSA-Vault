const express = require("express");

const router = express.Router();

const { auth } = require("../middleware/auth");

const {

    addQuestion,

    getQuestions,

    getQuestion,

    updateQuestion,

    deleteQuestion,

    toggleFavorite,

    getStats

} = require("../controllers/questionController");
router.post("/", auth, addQuestion);

router.get("/", auth, getQuestions);

router.get("/:id", auth, getQuestion);

router.put("/:id", auth, updateQuestion);

router.delete("/:id", auth, deleteQuestion);
router.get("/stats", auth, getStats);
router.put("/:id/favorite", auth, toggleFavorite);
module.exports = router;