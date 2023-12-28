import React, { useState } from 'react';
import "./index.css";
import Header from 'components/Header';
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Button } from '@mui/material';
import ImageInput from 'components/ImageInput/ImageInput';
import DiaryGrid from 'components/DiaryGrid';
import Activity from 'components/Activity';

const Profile = () => {

    const [isUpdateProfile, setIsUpdateProfile] = useState(false);

    const [files, setFiles] = useState([]);
	const urls = files.map((file) => URL.createObjectURL(file));

    const dummyData = [
        { url : "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hfGVufDB8fDB8fHww", title : "Goa" },
        { url : "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=600", title : "Maldivs" },
    ]

    return (
        <div className="flex h-screen pl-10 pr-10 bg-[#F5F5F5]">
            
            <div className='profile-container'>
                <div className='profile-sub-container'>
                    <Header />

                    <p className='inner-title'>Profile</p>

                    <div className='profile-details-container'>
                        <div>
                            <div className='profile-text-container'>
                                <MdEmail className='icon' />
                                <p className='profile-text'>arinmodi2306@gmail.com</p>
                            </div>

                            <div className='profile-text-container'>
                                <FaUser className='icon' />
                                <p className='profile-text'>Arin Modi</p>
                            </div>

                            {!isUpdateProfile && (
                                <Button
                                    variant='outlined'
                                    style={{ marginTop:"2rem" }}
                                    onClick={() => setIsUpdateProfile(true)}
                                >
                                    UPDATE PROFILE
                                </Button>
                            )}
                        </div>

                        <div>
                            <img 
                                src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
                                className='profile-user-img'
                                alt='profile'
                            />
                        </div>

                    </div>

                    <div style={{ margin : "2rem 0 rem", border : "1px solid black" }} />

                    { isUpdateProfile && (
                        <div>
                            <p className='inner-title'>Update Profile</p>

                            <div className='profile-details-container'>
                                <div>
                                    <div className='profile-text-container'>
                                        <FaUser className='icon' />
                                        <input
                                            className='user-name-input'
                                            type='text'
                                            value="Arin Modi" />
                                    </div>
        
                                    <div className='profile-text-container'>
                                        <Button
                                            variant='contained'
                                            style={{ marginTop:"1rem" }}
                                        >
                                            SAVE
                                        </Button>

                                        <Button
                                            variant='outlined'
                                            style={{ marginTop:"1rem", marginLeft:"1rem" }}
                                            color='error'
                                            onClick={() => setIsUpdateProfile(false)}
                                        >
                                            CANCEL
                                        </Button>
                                    </div>
                                </div>
        
                                <div style={{ alignItems:"center", display:"flex", flexDirection:"column" }}>
                                    <img 
                                        src={ files.length === 0 ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D':urls[0] }
                                        className='profile-user-img'
                                        alt='profile'
                                    />

                                    <Button
                                        variant='outlined'
                                        sx={{
                                            width:"10rem",
                                            marginTop:"1rem"
                                        }}
                                        component="label"
                                    >
                                        Change Image
                                        <ImageInput
                                            onFilesChange={(selectedFilies) =>
                                                setFiles(selectedFilies)
                                            }
                                        />
                                    </Button>
                                </div>
        
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='profile-main-container'>
                <p className='inner-title'>Your Diaries</p>
                
                <div style={{ marginLeft:"1rem", marginTop : "1rem" }}>
                    <DiaryGrid
                        itemData={dummyData}
                        cols={2}
                    />
                </div>

                <div style={{ display:'flex', justifyContent:"center", marginTop:"2rem" }}>
                    <p className='load-more'>Load more</p>
                </div>

                <div className="profile-activities-activity">
				    <p className="font-bold">Activities</p>
				    <p className="mt-3"></p>
				    <Activity />
			    </div>
            </div>

        </div>
    );
}

export default Profile;