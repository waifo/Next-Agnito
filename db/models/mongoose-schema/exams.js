const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const SscShema = require('./ssc');

const ExamsSchema = new Schema({
    examName:String,
    mockTests:[Schema.Types.Mixed]
},{ autoIndex: false })

module.exports = ExamsSchema;