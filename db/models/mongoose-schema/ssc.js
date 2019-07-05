const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SscSchema = new Schema({
    name:{type:String , default:'SSC'}
},{ autoIndex: false })

module.exports = SscSchema;