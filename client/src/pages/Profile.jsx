import React, { useEffect } from 'react'
import NavBar from '../components/Nav/NavBar';
import { useRef, useState } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import app from '../firebase';
import "../App.css";
//redux imports
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

/*we import our backend URL and vite will auto choose the backend url (localhost or production) depending if
were developing locally or live */
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
    
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const { currentUser, loading, error } = useAppSelector((state) => state.user);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(JSON.stringify(formData));
    console.log("Updated currentUser:", currentUser.user.username);


    useEffect(()=>{
        if(file){
            handleFileUpload(file);
        }
    },[file])


    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);



        uploadTask.on(
            'state_changed',
            (snapshot) =>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress))
            },
            (error) =>{
                setFileUploadError(error);
            },

            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL)=>{
                    setFormData({...formData, avatar: downloadURL})
                });//end of then()
            }
          
        );
    }

    const handleChange = (e) => {
        console.log("You're inside of the handlechange function");
        setFormData({...formData, [e.target.id]: e.target.value});
    };



    const handleSubmit = async (e) => {
        console.log("you're inside the handlesubmit function");
        e.preventDefault();

        console.log("Form Data being sent to backend:", formData);


        try {
            dispatch(updateUserStart());
            
            const response = await fetch (`http://localhost:3000/api/user/update/${currentUser.user._id}`,{
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                },
                credentials: "include",  // Ensure cookies are sent
                body: JSON.stringify(formData),

            });

            const data = await response.json();

            if(!data.success) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));


            console.log("Updated Redux state:", data);

        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };


    const handleDeleteUser = async () => {
        console.log("You clicked the delete account link on the front end");

        console.log("The current user is: " + JSON.stringify(currentUser));
        console.log("The other current user variable is: " + JSON.stringify(currentUser.user._id));

        if (!currentUser || !currentUser.user._id) {
            console.error('No user ID available for deletion!');
            return;
        }


        try {
            dispatch(deleteUserStart());
            const response = await fetch(`${backendURL}/api/user/delete/${currentUser.user._id}`,{
                method: "DELETE",
                credentials: "include",  // Ensure cookies are sent
            });
            const data = await response.json();
            if(data.success === false){
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }

    };


    const handleSignOut = async () => {
        console.log("The frontend has requested to signout of the account");
        try {
            const response = await fetch(`${backendURL}/api/user/signout`,{
                method: "POST",
                credentials: "include"
            });

            if (!response){
                throw new Error("Failed to sign out");
            }

            dispatch(signInSuccess(null)); //clears user state of being signed in
            navigate("/sign-in");

            console.log("Signed out successfully");

        } catch (error) {
            dispatch(signInFailure(error.message));
            console.error("Error during sign out:", error.message);
        }

    };


  return (
    <>
        <NavBar />
        <div className="ProfileWrap">
            <h1>Profile</h1> 
            <form onSubmit={handleSubmit} action="">
                <input 
                onChange={(e)=>{setFile(e.target.files[0])}}
                type="file" accept="image/" ref={fileRef} hidden/>
                <img 
                onClick={()=>fileRef.current.click()}
                className="profilePageImage" src={formData.avatar || currentUser.user.avatar} alt="avatar" />

                <p className='profile-image-upload-message'>{fileUploadError ? (
                        <span className="profile-image-upload-error-message">Error uploading the image (image must be less than 2MB)</span>
                    ): filePerc > 0 && filePerc < 100 ? (
                        <span className="profile-image-uploading-progress-message">{`Uploading ${filePerc}%`}</span>
                    ): filePerc === 100 ? (
                        <span className="profile-image-upload-success-message">Image successfully uploaded!</span>
                    ):(
                        ''
                    )
                }
                </p>

                <input 
                    type="text" 
                    className="profilePageUserName" 
                    id="username" placeholder="username" 
                    value={formData.username || currentUser.user.username}
                    onChange={handleChange}
                />
                <input type="text" 
                    className="profilePageUserName" 
                    id="email" 
                    placeholder="email" 
                    value={formData.email || currentUser.user.email}
                    onChange={handleChange}
                />

                <input type="password" 
                    className="profilePageUserName" 
                    id="password" 
                    placeholder="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                />
                <button disabled={loading}>
                    {
                        loading ? "Loading..." : "Update"
                    }
                </button>
            </form>
            <p>{error ? error : ''}</p>
            <p>{updateSuccess ? "Profile updated" : ''}</p>

            <div className="ProfileWapBottom">
                <span onClick={handleDeleteUser} className="">Delete account</span>
                <span onClick={handleSignOut}>Sign Out</span>
            </div>

        </div>





    </>
  )
}

export default Profile