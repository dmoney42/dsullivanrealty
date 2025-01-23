import React from 'react'
import NavBar from '../components/Nav/NavBar';
import { useSelector } from 'react-redux';
import "../App.css";


const Profile = () => {

    const {currentUser} = useSelector((state) => state.user);
  return (
    <>
            <NavBar />
        <div className="ProfileWrap">
            <h1>Profile</h1> 
            <form action="">
                <img className="profilePageImage" src={currentUser.user.avatar} alt="avatar" />
                <input type="text" className="profilePageUserName" id="username" placeholder="username" defaultValue={currentUser.user.username}/>
                <input type="text" className="profilePageUserName" id="email" placeholder="email" defaultValue={currentUser.user.email}/>
                <input type="password" className="profilePageUserName" id="password" placeholder="password"/>
                <button>Submit</button>
            </form>


            <div className="ProfileWapBottom">
                <span className="">Delete account</span>
                <span>Sign Out</span>
            </div>

        </div>





    </>
  )
}

export default Profile