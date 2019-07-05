const graphql = require('graphql');
const {GraphQLObjectType,GraphQLInputObjectType, GraphQLString,GraphQLList,GraphQLInt} = graphql;
const UserType = require('../models/types/users_types');
const {QuestionBankType,OptionsInputType} = require('../models/types/question_bank_types')
const {signup} = require('../../server/controllers/signUp');
const {signin}=require('../../server/controllers/signIn')
const {addQuestion} = require('../queries/questionsQueries');
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        signup:{
            type:UserType,
            args:{
                userName:{type:GraphQLString},
                firstName:{type:GraphQLString},
                lastName:{type:GraphQLString},
                email:{type:GraphQLString},
                contactNo:{type:GraphQLString},
                dob:{type:GraphQLString},
                password:{type:GraphQLString}

            },
            resolve(parentValue,{userName,firstName,lastName,email,contactNo,dob,password},req){
                return signup({userName,firstName,lastName,email,contactNo,dob,password},req)
            }
        },
        signin:{
            type:UserType,
            args:{
                email:{type:GraphQLString},
                password:{type:GraphQLString}
            },
            resolve (parentValue,{email,password},req){
                return signin({email,password},req)
            }
        },
        logout:{
            type:UserType,
            resolve(parentValue,args,req){
                const {user} = req;
                req.logout();
                return user
            }

        },
        addQuestion:{
            type:QuestionBankType,
            args:{
                question:{type:GraphQLString},
                options:{type:OptionsInputType},
                answer:{type:GraphQLString},
                targetExam:{type:new GraphQLList(GraphQLString)},
                targetSection:{type:GraphQLString},
                targetSubsection:{type:GraphQLString},
                tags:{type:new GraphQLList(GraphQLString)},
                level:{type:GraphQLInt},
                minTime:{type:GraphQLInt}
            },

            resolve(parentValue,args,req){
                return addQuestion(args);
            }
        }
    }
})

module.exports = mutation;

