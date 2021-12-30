import React,{useEffect,useState} from 'react'

const Contact = () => {


    // const history=useHistory();
    const [userData,setUserData]=useState({
        name:"",
        email:"",
        phone:"",
        message:""
    });

    const callContactPage=async()=>{
        try {
            const res=await fetch('/getdata',{
                method:"GET",
                headers:{
                    // Accept:"application/json"
                    "Content-Type":"application/json"
                }
                // credentials:"include"
            });
            const data=await res.json();
            console.log(data);

            // setUserData({...userData,name:data.name,email:data.email,phone:data.phone});
            // // setUserData(data);
            // console.log("in contact page");
            // console.log(userData);
            // if(!res.status===200){
            //     throw new Error(res.error);
            // }
            setUserData((prevalue)=>{
                return{
                    ...prevalue,
                    name:data.name,
                    email:data.email,
                    phone:data.phone,
                    message:""

                }
            })
            console.log(userData);
            
        } catch (error) {
            console.log(error);
            // history.push('/login');
            
        }
    }
    useEffect(()=>{
        callContactPage();
    },[])

//    getting message from user
    const handleInputs=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        console.log(userData.message);
        setUserData((prevalue)=>{
            return{
                ...prevalue,
                [name]:value
            }

        })


    }

    // sending data to backend
    const contactForm=async(e)=>{
        e.preventDefault();
        console.log(userData);
        const {name,email,phone,message}=userData;
        const res=await fetch('/contact',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                name,email,phone,message

            })

        })
        // console.log('reached here');
        const data=await res.json();
        if(!data){
            alert("Message not sent");
        }
        else{
            alert("Message sent");
            setUserData((prevalue)=>{
                return {
                    ...prevalue,
                    message:""
                }

            })
        }

    }


    return (
        <>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                {/* <img src="" alt="phone"  /> */}
                                <div className="contact_info_content">
                                    <div className="content_info_title">
                                        Phone
                                    </div>
                                    <div className="content_info_text">
                                        +111-36363-4747
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                {/* <img src="" alt="phone"  /> */}
                                <div className="contact_info_content">
                                    <div className="content_info_title">
                                        Email
                                    </div>
                                    <div className="content_info_text">
                                        demo@gmail.com
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                {/* <img src="" alt="phone"  /> */}
                                <div className="contact_info_content">
                                    <div className="content_info_title">
                                        Address
                                    </div>
                                    <div className="content_info_text">
                                        unknown city
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">
                                    Get in touch
                                </div>
                                <form method="POST" id="contact_form">
                                    <div className="contact_form_name d-flex justify-content-between align-items-between">
                                        <input type="text" name="name" id="contact_form_name" className="contact_form_name input_field"
                                            placeholder="Your Name" value={userData.name} onChange={handleInputs} required="true" />

                                        <input type="email" name="email" id="contact_form_email" className="contact_form_email input_field"
                                            placeholder="Your Email" value={userData.email}  onChange={handleInputs} required="true" />

                                        <input type="number" name="phone" id="contact_form_phone" className="contact_form_phone input_field"
                                            placeholder="Your phone" value={userData.phone} onChange={handleInputs} required="true" />
                                    </div>

                                    <div className="contact_form_text mt-5">
                                        <textarea className="text_field contact_form_message" name="message" value={userData.message} onChange={handleInputs} placeholder="Message" cols="30" rows="10"></textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button type="submit" className="button_submit_button" onClick={contactForm}>Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Contact
