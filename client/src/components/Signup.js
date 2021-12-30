import React from 'react'
import image from "../Images/image.png"
import { NavLink ,useHistory} from 'react-router-dom'
import { useState } from 'react'

const Signup = () => {
    const history=useHistory();
    const[user,setUser]=useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
        cpassword:""
    })
    let name,value;
    const handleInputs=(e)=>{
        e.preventDefault();
        name=e.target.name;
        value=e.target.value;
        setUser(()=>{
            return{
            ...user,
            [name]:value}
        })

    }
    const PostData=async(e)=>{
        e.preventDefault();
        const{name,email,phone,work,password,cpassword}=user;
        const res=await fetch("/register",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name:name,email,phone,work,password,cpassword

            })
            
        })
        const data=await res.json();
        console.log(data);
        console.log(data.status);
        if(data.status===422|| data.error){
            window.alert("invalid registration");
            console.log("invalid through react");
        }
        else{
            window.alert(" registration successfull");
            console.log("valid through react");
            history.push("/login");


        }

    }

    return (
        <>
            <section className="signup">
                <div className="container mt-8">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="name"></label>
                                    <input type="text" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"></label>
                                    <input type="email" name="email" id="email" autoComplete="off" value={user.email} onChange={handleInputs} placeholder="Your email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone"></label>
                                    <input type="number" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInputs} placeholder="Your phone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="work"></label>
                                    <input type="text" name="work" id="work" autoComplete="off" value={user.work} onChange={handleInputs} placeholder="Your Profession" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"></label>
                                    <input type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder="Your password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword"></label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off" value={user.cpassword} onChange={handleInputs} placeholder="Confirm Password" />
                                </div>
                                <div className="form-group form button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="register" onClick={PostData}/>

                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img src={image} alt="signpic" className="signpic" />
                            </figure>
                            <NavLink to='/login' className="signup-image-link">Already Registered</NavLink>
                        </div>

                    </div>

                </div>

            </section>



        </>
    )
}

export default Signup
