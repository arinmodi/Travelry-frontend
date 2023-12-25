import Buttons from 'components/Diary/Buttons';
import TopSection from 'components/Diary/TopSections';
import ImageGrid from 'components/ImageGrid';
import React, { useState } from 'react';
import "./DiaryPage.css";
import UploadImage from './UploadImage';
import AddMember from './AddMember';
import Settings from './Settings';

const DiaryPage = () => {

    const [uploadImage, setUploadImage] = useState(false);
    const [addMember, setAddMember] = useState(false);
    const [settings, setSettings] = useState(false);

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

    const dummyData = [
        { url : "https://media.istockphoto.com/id/535168027/photo/india-goa-palolem-beach.jpg?s=612x612&w=0&k=20&c=iGV1Ue0Efj87dQirWnUpZVG1dNobUjfVvMGdKHTJ7Qg=", isVideo : false }, 
        { url : "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hfGVufDB8fDB8fHww", isVideo : false }, 
        { url : "https://media.timeout.com/images/105983980/750/562/image.jpg", isVideo : false }, 
        { url : "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isVideo : false },
        { url : "https://media.easemytrip.com/media/Blog/India/637245472281678954/6372454722816789543img5H.png", isVideo : false }, 
        { url : "https://images.unsplash.com/photo-1558960214-f4283a743867?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdvYXxlbnwwfHwwfHx8MA%3D%3D", isVideo : false },
        { url : "https://images.unsplash.com/photo-1558894930-0e1f89b9f0ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdvYXxlbnwwfHwwfHx8MA%3D%3D", isVideo : false },
        { url : "https://firebasestorage.googleapis.com/v0/b/ssip-2022.appspot.com/o/orders%2Fmedia%2FVID20220911114932_1664009063219.mp4?alt=media&token=664495ce-c530-4537-a32d-8461cef763b3", isVideo : true }
    ];

    return (
        <div className='flex flex-col'>
            
            <TopSection 
                title={"Goa"}
                color={"green"}
            />

            <Buttons 
                uploadImageClick={uploadImageClick}
                addMemberClick={addMemberClick}
                settingsClick={settingsClick}
            />

            <ImageGrid 
                itemData={dummyData}
            />

            {uploadImage && (
                <UploadImage 
                    close={closeUploadImage}
                />
            )}

            {addMember && (
                <AddMember 
                    close={closeAddMember}
                />
            )}

            {settings && (
                <Settings
                    close={closeSettings}
                /> 
            )}

        </div>
    );

}

export default DiaryPage;