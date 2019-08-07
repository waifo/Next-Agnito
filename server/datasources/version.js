const {RESTDataSource} = require("apollo-datasource-rest");

class Version extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = 'http://localhost:4040/api/';
        // console.log("thisssss",this)
    }

    async getVersion (){
        // return {version:"Hello World"}
        try{

            const response = await this.get('version');
            console.log("response",response)
            return typeof response === "string"
                ? this.versionReducer(response):"";
        }catch(err){
            console.log("Error",err)
        }
       
    }

    versionReducer(version){
        return {
            version:version
        }
    }
}

module.exports = Version;