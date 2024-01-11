import React, { useEffect, useState } from 'react';
import "./index.css";
import Header from 'components/Header';
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Button } from '@mui/material';
import ImageInput from 'components/ImageInput/ImageInput';
import DiaryGrid from 'components/DiaryGrid';
import Activity from 'components/Activity';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_API_URL } from 'utils/constants';
import axios from "config/axiosInstance";
import DiarySkeleton from 'components/loading/DiarySkeleton';
import ActivitySkeleton from 'components/loading/ActivitySkeleton';
import { toast } from 'react-toastify';
import axiosMultipart from "config/axiosMulipartInstance";
import LoadingModel from 'components/modal/LoadingModal';
import { setUser, setLogout, setDiary as setDiaryState } from 'state/authSlice';
import NoData from 'components/noData';
import { useNavigate } from 'react-router';
import styles from "screens/Diary/UploadImage.module.css";

const Profile = () => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isDiaryLoading, setIsDiaryLoading] = useState(false);
    const [diary, setDiary] = useState([]);
    const [isMoreDiary, setIsMoreDiary] = useState(false);

    
    const [isActivityLoading, setIsActivityLoading] = useState(false);
    const [activity, setActivity] = useState([]);
    const [isMoreActivity, setIsMoreActivity] = useState(false);

    const [isUpdateProfile, setIsUpdateProfile] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [name, setName] = useState(user.userName);

    const [files, setFiles] = useState([]);
	const urls = files.map((file) => URL.createObjectURL(file));
    const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

    useEffect(() => {
        const handleResize = () => {
           setIsMobile(window.innerWidth < 750);
        };
  
        window.addEventListener("resize", handleResize);
  
        return () => {
           window.removeEventListener("resize", handleResize);
        };
    }, []);

    const updateProfile = async () => {
        if (name === user.userName && files.length === 0) {
            setIsUpdateProfile(false);
        }else {
            if (name !== user.userName && name.trim().length <= 1) {
                toast("Enter valid name");
            }else {
                setIsUpdating(true);
                try {
                    const formData = new FormData();
                    formData.append("username", name);
                    if (files.length > 0) {
                        formData.append("profileImage", files[0]);
                    }
                    const response = await axiosMultipart.patch(BASE_API_URL+"/user/", formData);
                    const newUser = {
                        email : user.email,
                        profilePhoto : user.profilePhoto,
                        userName : user.username
                    }

                    if (response.data.viewUrl !== null) {
                        newUser.profilePhoto = response.data.viewUrl
                    }

                    newUser.userName = name;

                    dispatch(
                        setUser({
                            user : newUser
                        })
                    )
                    loadActivity();
                }catch(error) {
                    console.log(error);
                }
                setIsUpdating(false);
                setIsUpdateProfile(false);
            }
        }
    }

    const loadDiary = async () => {
        setIsDiaryLoading(true);
        try {
			const diaryResponse = await axios.get(BASE_API_URL+"/user/diary?sort=-1&limit=3&offset=0");
            if (diaryResponse.data.length > 2) {
                setIsMoreDiary(true);
                const data = []
                for (let i=0; i < 2; i++) {
                    data.push(diaryResponse.data[i]);
                }
                setDiary(data)
            } else {
			    setDiary(diaryResponse.data);
            }
		} catch(error) {
			console.log(error);
		}
        setIsDiaryLoading(false);
    }

    const loadActivity = async () => {
        setIsActivityLoading(true);
		try {
			const response = await axios.get(BASE_API_URL+"/user/activities?sort=-1&limit=4&offset=0");
			if (response.data.length > 3) {
				setIsMoreActivity(true);
				const data = [];
				for (let i=0; i < 3; i++) {
					data.push(response.data[i]);
				}
                setActivity(data);
			} else {
				setActivity(response.data);
			}
		} catch(error) {
			console.log(error);
		}
		setIsActivityLoading(false);
    }

    const onDiaryClick = (diary) => {
		dispatch(
			setDiaryState({
				diary : diary
			})
		)
		navigate(`/diary/${diary.id}`);
    }

    const onMoreClick = () => {
		navigate("/diarys")
	}

	const onMoreActivityClick = () => {
		navigate("/activities")
	}

    useEffect(() => {
        loadDiary();
        loadActivity();
    }, [])

    return (
        <div className="flex flex-col md:flex-row min-h-screen pl-0 pr-0 md:pl-10 md:pr-10 bg-[#F5F5F5]">
            
            <div className={isMobile ? "profile-container-mobile" : `profile-container`}>
                <div className={isMobile ? 'profile-sub-container-mobile' : 'profile-sub-container'}>
                    <Header />

                    <p className='inner-title'>Profile</p>

                    <div className={isMobile ? 'profile-details-container-mobile' : 'profile-details-container'}>
                        <div>
                            <div className='profile-text-container'>
                                <MdEmail className='icon' />
                                <p className='profile-text'>{user.email}</p>
                            </div>

                            <div className='profile-text-container'>
                                <FaUser className='icon' />
                                <p className='profile-text'>{user.userName}</p>
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
                        
                        {user.profilePhoto ? (
                            <div className={isMobile ? 'flex justify-center' : ''}>
                                <img 
                                    src={user.profilePhoto}
                                    className={isMobile ? 'profile-user-img-mobile' : 'profile-user-img'}
                                    alt='profile'
                                />
                            </div>
                        ):(
                            <div className={isMobile ? 'profile-user-img-mobile flex justify-center' : 'profile-user-img'} style={{ display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"#3A60F7" }}>
                                <p className='text-[white] font-bold text-4xl' >{user.userName[0]}</p>
                            </div>
                        )}

                    </div>

                    {isUpdateProfile && <div style={{ margin : "2rem 0rem", border : "1px solid black" }} /> }

                    { isUpdateProfile && (
                        <div>
                            <p className='inner-title'>Update Profile</p>

                            <div className={isMobile ? 'profile-details-container-mobile' : 'profile-details-container'}>
                                <div>
                                    <div className='profile-text-container'>
                                        <FaUser className='icon' />
                                        <input
                                            className='user-name-input'
                                            type='text'
                                            value={name}
                                            onChange={(event) => setName(event.target.value)} />
                                    </div>
        
                                    <div className='profile-text-container'>
                                        <Button
                                            variant='contained'
                                            style={{ marginTop:"1rem" }}
                                            onClick={updateProfile}
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
                                    {files.length === 0 ? (
                                        user.profilePhoto ? (
                                            <div>
                                                <img 
                                                    src={user.profilePhoto}
                                                    className='profile-user-img'
                                                    alt='profile'
                                                />
                                            </div>
                                        ):(
                                            <div className='profile-user-img' style={{ display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"#3A60F7" }}>
                                                <p className='text-[white] font-bold text-4xl' >{user.userName[0]}</p>
                                            </div>
                                        )
                                    ):(
                                        <img 
                                            src={urls[0]}
                                            className='profile-user-img'
                                            alt='profile'
                                        />
                                    )}

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

            <div className={isMobile ? 'profile-main-container-mobile' : 'profile-main-container'}>
                <div className='flex justify-between'>
                    <p className='inner-title'>Your Diaries</p>
                    <div className={styles.close} style={{ width:"fit-content", marginTop:"1.7rem" }} onClick={() => {
                        toast("logged out")
                        dispatch(
                            setLogout()
                        )
                    }}>
                        LOGOUT
                    </div>
                </div>
                
                <div style={{ marginLeft:"1rem", marginTop : "1rem" }}>
                    {!isDiaryLoading ? (
                        diary.length > 0 ? (
                            <DiaryGrid
                                itemData={diary}
                                cols={isMobile ? 1 : 2}
                                diaryClick={(diary) => onDiaryClick(diary)}
                            />
                        ):(
                            <NoData message="No Diary Found" />
                        )
                    ):(
                        <div className='flex flex-col md:flex-row' style={{ marginLeft:isMobile ? "0rem" : "-2rem" }}>
                            <DiarySkeleton amount={2} />
                        </div>
                    )}
                </div>

                {isMoreDiary ?( 
                    <div style={{ display:'flex', justifyContent:"center", marginTop:"2rem" }} onClick={onMoreClick}>
                        <p className='load-more'>more</p>
                    </div>
                ):(
                    <div className='mt-5'></div>
                )}

                <div className="profile-activities-activity">
				    <p className="font-bold">Activities</p>
				    <p className="mt-3"></p>
                    {!isActivityLoading ? (
                        activity.length > 0 ? (
                            activity.map((item, key) => (
                                <Activity 
                                    item={item}
                                    key={key}
                                />
                            ))  
                        ):(
                            <NoData message="No Activity Found" />
                        )  
                    ):(
                        <ActivitySkeleton amount={3} />
                    )}

                    {isMoreActivity && (
                        <div style={{ display:'flex', justifyContent:"center", marginTop:"2rem" }} onClick={onMoreActivityClick}>
                            <p className='load-more'>more</p>
                        </div>
                    )}

                    <LoadingModel 
                        open={isUpdating}
                        message='Updating'
                    />
			    </div>
            </div>

        </div>
    );
}

export default Profile;