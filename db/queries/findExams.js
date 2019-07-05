const model = require('../models/models');
const Exams = model.ExamsModelClass;

const findAllExams = ()=>{
    return Exams.find({})
}

module.exports ={
    findAllExams
}