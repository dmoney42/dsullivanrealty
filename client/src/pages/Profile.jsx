import React, { useEffect } from 'react'
import NavBar from '../components/Nav/NavBar';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import app from '../firebase';
import "../App.css";


const Profile = () => {
    
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const {currentUser, loading, error} = useSelector((state) => state.user);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});

    console.log(formData);

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
        console.log('youre inside of the handleChange function');
        setFormData({...formData, [e.target.id]: e.target.value});
    }


  return (
    <>
        <NavBar />
        <div className="ProfileWrap">
            <h1>Profile</h1> 
            <form action="">
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
                    defaultValue={currentUser.user.username}
                    onChange={handleChange}
                />
                <input type="text" 
                    className="profilePageUserName" 
                    id="email" 
                    placeholder="email" 
                    defaultValue={currentUser.user.email}
                    onChange={handleChange}
                />

                <input type="password" 
                    className="profilePageUserName" 
                    id="password" 
                    placeholder="password"
                    onChange={handleChange}
                />
                <button>Update</button>
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