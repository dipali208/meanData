module.exports = app => {
    const quiz = require("../controllers/question.controller.js");
    
    var router = require("express").Router();
  
    router.post('/addQuestion', quiz.addQuestion);
    router.get("/getQuizName", quiz.getQuizName);
    router.get("/getCategoryName", quiz.getCategoryName);
    router.get("/getTypeName", quiz.getTypeName);
    app.use('/api/quiz', router);

  };