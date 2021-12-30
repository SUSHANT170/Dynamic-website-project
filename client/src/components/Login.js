import {React,useState} from 'react'
import loginpic from "../Images/loginpic.png";
import { NavLink,useHistory } from 'react-router-dom';

const Login = () => {
    const history=useHistory();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const loginUser=async(e)=>{
        e.preventDefault();
       const res=await fetch("/signin",{
           method:"POST",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               email:email,password
           })
       })
       const data=await res.json();
       console.log(data);
       console.log(res.status);
       if(res.status===400 || !data){
           window.alert("invalid credentials");

       }
       else{
           window.alert("login successfully");
           history.push("/");
       }

    }
    return (
        <>

            <section className="sign-in">
                <div className="container mt-5">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure>
                                <img src={loginpic} alt="loginpic" className="loginpic" />
                            </figure>
                            <NavLink to='/signup' className="signin-image-link">Create an account</NavLink>

                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Login in</h2>
                            <form method="POST" className="register-form" id="register-form">
                                
                                <div className="form-group-sign">
                                    <label htmlFor="email"></label>
                                    <input type="email" name="email" id="email" autoComplete="off" value={email}
                                     onChange={(e)=>{
                                        setEmail(e.target.value)
                                    }} placeholder="Your email" />
                                </div>
                               
                                <div className="form-group-sign">
                                    <label htmlFor="password"></label>
                                    <input type="password" name="password" id="password" autoComplete="off" value={password}
                                     onChange={(e)=>{
                                        setPassword(e.target.value)
                                    }} placeholder="Your password" />
                                </div>
                               
                                <div className="form-group-sign form button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Login in" 
                                        onClick={loginUser}
                                    />

                                </div>
                            </form>
                        </div>


                    </div>

                </div>

            </section>



        </>
    )
}

export default Login
