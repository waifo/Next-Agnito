const mongoose = require('mongoose');
const UsersSchema = require('./mongoose-schema/users');
const ExamsSchema = require('./mongoose-schema/exams');
const QuestionBankSchema  = require('./mongoose-schema/question_bank')

const UsersModelClass = mongoose.model('users',UsersSchema);
const ExamsModelClass = mongoose.model('exams',ExamsSchema);
const QuestionBankClass = mongoose.model('questionBank',QuestionBankSchema)

module.exports = {
    UsersModelClass,
    ExamsModelClass,
    QuestionBankClass
}