const graphql = require('graphql');
const {GraphQLObjectType,GraphQLID,GraphQLList,GraphQLError} = graphql;
const UsersType = require('./users_types');
const ExamsType = require('./exams_types');
const {QuestionBankType} = require('./question_bank_types');
const {findAll} = require('../../queries/findUser')
const {findAllExams} = require('../../queries/findExams')
const {findAllQuestions} = require('../../queries/questionsQueries')

const RootQueryType = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        dummyField:{type:GraphQLID},
        users:{
            type:new GraphQLList(UsersType),
            resolve(parentValue,args,req){
                if(req.user.valid){return findAll(res=>res.data)}
                let errors=[{
                    key:req.user.error.name,
                    message:req.user.error.message
                }]
                throw new GraphQLError(errors)
                
            }
        },
        exams:{
            type:new GraphQLList(ExamsType),
            resolve(parentValue,args,req){
                if(req.user.valid){return findAllExams(res=>res.data) }
            }
        },
        questions:{
            type: new GraphQLList(QuestionBankType),
            resolve(parentValue,args,req){
                if(req.user.valid){return findAllQuestions(res=>res.data) }
            }
        }
    }
});

module.exports = RootQueryType;