import react,{useState} from "react";

export const Login = ()=>{
    const [email,setEmail] = useState(null);
    const [pwd,setPwd] = useState(null);

    return (
        <div>
            <input type="email" onChange={(event)=>setEmail(event.target.value)}/>
            <input type="password" onChange={(event)=>setPwd(event.target.value)}/>
            <button>Sign In</button>
        </div>
    )
}