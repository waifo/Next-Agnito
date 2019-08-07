module.exports = {
    Query:{
        version:async (a,b,{dataSources},d)=>(await dataSources.version.getVersion())
    }
}
