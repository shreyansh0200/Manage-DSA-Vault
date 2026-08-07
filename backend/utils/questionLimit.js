exports.canCreateQuestion = (user) => {
    return user.createdQuestions < user.maxQuestions;
};