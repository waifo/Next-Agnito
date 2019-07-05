const model = require('../models/models');
const QuestionBank = model.QuestionBankClass;

exports.addQuestion = (args)=>{
    const question = new QuestionBank(args);
    return question.save();
}

exports.findAllQuestions = ()=>{
    return QuestionBank.find({})
}