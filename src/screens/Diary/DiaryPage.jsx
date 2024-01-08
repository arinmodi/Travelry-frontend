import Buttons from 'components/Diary/Buttons';
import TopSection from 'components/Diary/TopSections';
import ImageGrid from 'components/ImageGrid';
import React, { useEffect, useState } from 'react';
import "./DiaryPage.css";
import UploadImage from './UploadImage';
import AddMember from './AddMember';
import Settings from './Settings';
import { useDispatch, useSelector } from 'react-redux';
import axios from "config/axiosInstance";
import { BASE_API_URL } from 'utils/constants';
import MediaSkeleton from 'components/loading/MediaSkeleton';
import LoadingModel from 'components/modal/LoadingModal';
import { toast } from 'react-toastify';
import axiosMultipart from "config/axiosMulipartInstance";
import { checkEmail } from 'utils/helpers';
import { setDiary } from 'state/authSlice';
import { useNavigate } from 'react-router';

const DiaryPage = () => {

    const diary = useSelector((state) => state.diary);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [uploadImage, setUploadImage] = useState(false);
    const [addMember, setAddMember] = useState(false);
    const [settings, setSettings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [media, setMedia] = useState([]);
    const [isUpload, setIsUploading] = useState(false);
    const [isMore, setIsMore] = useState(false);
    const [offset, setOffset] = useState(12);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [isMembersLoading, setIsMembersLoading] = useState(false);
    const [members, setMembers] = useState([]);
    const [isMemberAdding, setIsMemberAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const uploadImageClick = () => {
        setUploadImage(true);
    }

    const closeUploadImage = () => {
        setUploadImage(false);
    }

    const addMemberClick = () => {
        setAddMember(true);
    }

    const closeAddMember = () => {
        setAddMember(false);
    }

    const settingsClick = () => {
        setSettings(true);
    }

    const closeSettings = () => {
        setSettings(false);
    }

    const loadMedias = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(BASE_API_URL+`/diary/media/${diary.id}?sort=-1&limit=13&offset=0`);
            if (response.data.length > 12) {
                const newData = [];
                for (let i=0; i < 12; i++) {
                    newData.push(response.data[i]);
                }
                setMedia(newData);
                setIsMore(true);
                setOffset(12);
            } else {
                setMedia(response.data)
            }
        }catch(error) { 
            console.log(error);
        }
        setIsLoading(false);
    }

    const loadNextMedias = async () => {
        setIsMoreLoading(true);
        try {
            const response = await axios.get(BASE_API_URL+`/diary/media/${diary.id}?sort=-1&limit=9&offset=${offset}`);
            if (response.data.length > 8) {
                const newData = [];
                for (let i=0; i < 8; i++) {
                    newData.push(response.data[i]);
                }
                setMedia([...media, ...newData]);
                setIsMore(true);
            } else {
                setMedia([...media, ...response.data]);
                setIsMore(false);
            }
            setOffset(offset+8);
        }catch(error) { 
            console.log(error);
        }
        setIsMoreLoading(false);
    }

    const upload = async (files) => {
        console.log(files);
        if (files.length > 0) {
            try {
                setIsUploading(true);
                const formData = new FormData();
                files.forEach((file) => {
                    formData.append(`multipartFiles`, file);
                });
                formData.append("diaryName", (diary.id + ""));
                await axiosMultipart.post(BASE_API_URL+"/diary/media/upload", formData);
                loadMedias();
            } catch(error) {
                console.log(error);
            }
        } else {
            toast("No media choosen")
        }
        setIsUploading(false);
    }

    const getMembers = async () => {
        setIsMembersLoading(true);
        try {
            const response = await axios.get(BASE_API_URL+`/diary/${diary.id}/members`);
            setMembers(response.data.members);
        }catch(error) { 
            console.log(error);
        }
        setIsMembersLoading(false);
    }

    const addMemberToDiary = async (email) => {
        if (checkEmail(email)) {
            setIsMemberAdding(true);
            try {
                const data = {
                    id : diary.id,
                    email : email
                }
                await axios.post(BASE_API_URL+"/diary/addMember", data);
                getMembers();
            }catch(error) {
                console.log(error);
                toast(error.response.data.message);
            }
            setIsMemberAdding(false);
        } else {
            toast("Enter valid email")
        }
    }

    const settingsUpdate = async (name, color, cover, header) => {
        setIsUpdating(true);
        if (name === diary.name && color === diary.headerColor && cover.length === 0 && header.length === 0) {
            setSettings(false);
        } else {
            try {
                const formData = new FormData();
                formData.append("id", diary.id);
                if (cover.length > 0) {
                    formData.append("coverImage", cover[0]);
                }
                if (color !== diary.headerColor) {
                    formData.append("color", color);
                }
                if (header.length > 0) {
                    formData.append("header", header[0]);
                }
                formData.append("diaryName", name);
                const response = await axiosMultipart.patch(BASE_API_URL+"/diary/", formData);
                console.log(response);
                const coverImageUrl = response.data.uploadedMedias[0].viewUrl;
                const headerImageUrl = response.data.uploadedMedias[1].viewUrl;

                const newDiary = {
                    id : diary.id,
                    name : name,
                    coverImage : diary.coverImage,
                    headerImage : diary.headerImage,
                    headerColor : color,
                    createdDate : diary.createdDate,
                    creatorEmail : diary.creatorEmail,
                    creatorImage : diary.creatorImage,
                    creatorUserName : diary.creatorUserName
                }

                if (coverImageUrl !== null) newDiary.coverImage = coverImageUrl;
                if (headerImageUrl !== null) newDiary.headerImage = headerImageUrl;

                if (color !== diary.headerColor && headerImageUrl === null) {
                    newDiary.headerImage = null;
                }

                dispatch(
                    setDiary({
                        diary : newDiary
                    })
                )
                setSettings(false);
            }catch(error) {
                console.log(error);
                toast("something bad happen!")
            }
        }
        setIsUpdating(false);
    }

    const onMediaClick = (media) => {
        navigate(`/diary/${diary.id}/media/${media.id}`, { state : media })
    }

    useEffect(() => {
        loadMedias();
        getMembers();
    }, []);

    return (
        <div className='flex flex-col'>
            
            <TopSection 
                title={diary.name}
                color={diary.headerColor}
                image={diary.headerImage}
            />

            <Buttons 
                uploadImageClick={uploadImageClick}
                addMemberClick={addMemberClick}
                settingsClick={settingsClick}
                activityClick={() => { navigate("/activities", { state : diary.id }) }}
            />

            {!isLoading ? (
                <>
                    {media.length > 0 ? (
                        <>
                            <ImageGrid 
                                itemData={media}
                                onMediaClick={(media) => onMediaClick(media)}
                            />

                            {isMoreLoading && (
                                <div className='mr-3 mb-3'>
                                    <div className='flex'>
                                        <MediaSkeleton amount={4} />
                                    </div>

                                    <div className='flex mt-3'>
                                        <MediaSkeleton amount={4} />
                                    </div>
                                </div>
                            )}
                        </>
                    ):(
                        <div className='flex items-center justify-center' style={{ height:"25rem" }}>
                            <p className='font-bold text-[#8C8C8C]'>No Media Found</p>
                        </div>
                    )}

                    
                    {isMore && (
                        <div className='flex justify-center' onClick={loadNextMedias}>
                            <p className='load-more'>more</p>
                        </div>
                    )}
                </>
            ):(
                <div className='mr-3 mb-3'>
                    <div className='flex'>
                        <MediaSkeleton amount={4} />
                    </div>

                    <div className='flex mt-3'>
                        <MediaSkeleton amount={4} />
                    </div>
                </div>
            )}

            {uploadImage && (
                <UploadImage 
                    close={closeUploadImage}
                    upload={(files) => upload(files)}
                />
            )}

            {addMember && (
                <AddMember 
                    close={closeAddMember}
                    isMembersLoading={isMembersLoading}
                    members={members}
                    addMember={(email) => addMemberToDiary(email)}
                />
            )}

            {settings && (
                <Settings
                    close={closeSettings}
                    diary={diary}
                    update={(name, color, cover, header) => settingsUpdate(name, color, cover, header)}
                /> 
            )}

            <LoadingModel 
                open={isUpload}
                message='uploading'
            />

            <LoadingModel
                open={isMemberAdding}
                message='adding' 
            />

            <LoadingModel
                open={isUpdating}
                message='updating' 
            />

        </div>
    );

}

export default DiaryPage;