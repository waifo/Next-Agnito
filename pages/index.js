import {Login} from "../components/login/login"
import { Query } from 'react-apollo'
import gql from "graphql-tag";

export const versionQuery = gql`
    query version{
        version{
            version
        }    
    }
`

const Index =  (props)=>{
    return <Query query={versionQuery}>
        {
            ({loading,error,data})=>{
                if(error){return console.log("Error",error)}
                if (loading) return <div>Loading</div>
                 return <div>{data.version.version}</div>
            }
        }
    </Query>
}

export default Index;