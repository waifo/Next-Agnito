const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionBankSchema = new Schema({
    question:String,
    options:Object,
    answer:Object,
    targetExam:Array,
    targetSection:String,
    targetSubsection:String,
    tags:Array,
    level:Number,
    minTime:Number,
    submittedByName:String,
    submittedByEmail:String
},{ autoIndex: false })

module.exports = QuestionBankSchema;