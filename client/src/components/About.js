import { React, useEffect, useState } from 'react'
import dp from "../Images/dp.jpg"
import { useHistory } from 'react-router-dom'

const About = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserData(data);
            console.log("in about page");
            console.log(data);
            if (!res.status === 200) {
                throw new Error(res.error);
            }

        } catch (error) {
            console.log(error);
            history.push('/login');

        }
    }
    useEffect(() => {
        callAboutPage();
    }, [])


    return (
        <>
            <div className="container emp-profile">
                <form method="GET">
                    <div className="row margin">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={dp} alt="profilepic" className="dpimg" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                {/* <h5>name</h5> */}
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className="profile-rating mt-3 mb-5">
                                    Rankings:1/10</p>

                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab" href="#home">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link  timeline" id="profile-tab" data-toggle="tab" role="tab" href="#profile">Timeline</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" id="" />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>work link</p>
                                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">Youtube</a><br />
                                <a href="https://www.google.com/" target="_blank" rel="noreferrer">google</a><br />
                                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">facebook</a><br />
                                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><br />
                            </div>
                            <div className="col-md-8 pl-5 about-info" >
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label >User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.name}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.email}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.work}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label >User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>74839</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>my_name</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>my_name</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>my_name</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>my_name</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>


        </>
    )
}

export default About
