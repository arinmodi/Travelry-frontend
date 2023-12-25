import React, { useState } from 'react';
import "./Settings.css";
import Header from 'components/Header';
import Diary from 'components/Diary';
import ImageInput from 'components/ImageInput/ImageInput';
import { Button } from '@mui/material';
import TopSection from 'components/Diary/TopSections';

const Settings = ({ close }) => {

    const [diaryName, setDiaryName] = useState("Goa");
    const [color, setColor] = useState("#028C45");
    const [files, setFiles] = useState([]);
	const urls = files.map((file) => URL.createObjectURL(file));
    const [images, setImages] = useState([]);
    const imgUrls = images.map((img) => URL.createObjectURL(img));

    return (
        <>
            <div className="main-container">

                <div className="container">
                    <Header />

                    <div className="flex justify-between">
                        <p className="title">Settings</p>
                        <div className="close" onClick={close}>
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
                            image={urls.length > 0 ? urls[0] : "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/KFVXH4V6SBMMFN56YXWCW7ZNPU.jpg"} 
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
                            fontSize='1rem' color={color} 
                            image={imgUrls[0]}
                        />
                    </div>
                    
                    <div className='color-container'>
                        <p className='color-title'>Color</p>
                        <input
                            type='color'
                            value={color}
                            onChange={(event) => setColor(event.target.value)}
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