const graphql = require('graphql');
const {GraphQLObjectType,GraphQLInputObjectType ,GraphQLInterfaceType,GraphQLID,GraphQLString,GraphQLList,GraphQLInt} = graphql


const QuestionBankType = new GraphQLObjectType({
    name:'QuestionBankType',
    fields:()=>({
        _id:{type:GraphQLID},
        question:{type:GraphQLString},
        options:{type:OptionsType},
        answer:{type:GraphQLString},
        targetExam:{type:new GraphQLList(GraphQLString)},
        targetSection:{type:GraphQLString},
        targetSubsection:{type:GraphQLString},
        tags:{type:new GraphQLList(GraphQLString)},
        level:{type:GraphQLInt},
        minTime:{type:GraphQLInt}

    })
})
const OptionsType = new GraphQLObjectType({
    name:'OptionsType',
    fields:()=>({
        A:{type:GraphQLString},
        B:{type:GraphQLString},
        C:{type:GraphQLString},
        D:{type:GraphQLString},
    })
})
const OptionsInputType = new GraphQLInputObjectType({
    name:'OptionsInputType',
    fields:()=>({
        A:{type:GraphQLString},
        B:{type:GraphQLString},
        C:{type:GraphQLString},
        D:{type:GraphQLString},
    })
})

module.exports.QuestionBankType = QuestionBankType
module.exports.OptionsType = OptionsType
module.exports.OptionsInputType = OptionsInputType