import React, { useState } from 'react';
import "./Settings.css";
import Header from 'components/Header';
import Diary from 'components/Diary';
import ImageInput from 'components/ImageInput/ImageInput';
import { Button } from '@mui/material';
import TopSection from 'components/Diary/TopSections';
import styles from "./UploadImage.module.css";

const Settings = ({ close, diary, update, isMobile }) => {

    const [diaryName, setDiaryName] = useState(diary.name);
    const [color, setColor] = useState(diary.headerColor);
    const [files, setFiles] = useState([]);
	const urls = files.map((file) => URL.createObjectURL(file));
    const [images, setImages] = useState([]);
    const imgUrls = images.map((img) => URL.createObjectURL(img));
    const [iniitalUrl, setInitialUrl] = useState(diary.headerImage);

    return (
        <>
            <div className="main-container">

                <div className="container" style={{ width:isMobile ? "100%" : "40vw" }}>
                    <Header />

                    <div className="flex justify-between">
                        <p className={styles.title}>Settings</p>
                        <div className={styles.close} onClick={close}>
                            CLOSE
                        </div>
                    </div>

                    <p className='inner-title'>Diary Name</p>

                    <input
                        type='text'
                        className='diary-name-input'
                        value={diaryName}
                        onChange={(e) => setDiaryName(e.target.value)}
                    />

                    <div className='cover-container'>
                        <Diary 
                            image={urls.length > 0 ? urls[0] : diary.coverImage} 
                            name={diaryName} 
                            marginLeft="0rem"
                        />

                        <Button
                            variant="contained"
                            component="label"
                            className='change-button'
                            sx={{
                                marginTop:"1rem"
                            }}
                        >
                            Change Image
                            <ImageInput
                                onFilesChange={(selectedFilies) =>
                                    setFiles(selectedFilies)
                                }
                            />
                        </Button>
                    </div>
                    
                    <p className='inner-title'>Diary Top Section</p>

                    <div className='top-section-container'>
                        <TopSection 
                            height='5rem' 
                            marginRight='2rem' 
                            title={diaryName} 
                            fontSize='1rem' 
                            color={color} 
                            image={images.length === 0 ? iniitalUrl : imgUrls[0]}
                        />
                    </div>
                    
                    <div className='color-container'>
                        <p className='color-title'>Color</p>
                        <input
                            type='color'
                            value={color}
                            onChange={(event) => { 
                                setInitialUrl(null);
                                setImages([]);
                                setColor(event.target.value) 
                            }}
                            className='color-input'
                        />
                        <p style={{ margin:"0rem 2rem", fontWeight : "bold" }}>or</p>
                        <Button
                            variant='outlined'
                            sx={{
                                width:"15rem"
                            }}
                            component="label"
                        >
                            Upload Image
                            <ImageInput
                                onFilesChange={(selectedFilies) =>
                                    setImages(selectedFilies)
                                }
                            />
                        </Button>
                    </div>
                    
                    <div className='save-button'>
                        <Button
                            variant='contained'
                            sx={{
                                width:"100%"
                            }}
                            onClick={() => update(diaryName, color, files, images)}
                        >
                            Save
                        </Button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Settings;