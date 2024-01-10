import { Box, Button, CircularProgress, Modal } from '@mui/material';
import Member from 'components/Diary/Member';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from "screens/Diary/UploadImage.module.css";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "fit-content",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 6,
    borderRadius:5,
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
};

const MediaUploader = ({ open, creator, dateAndTime, handleClose, isLoading, deleteMedia, isMobile }) => {

    const { email } = useSelector((state) => state.user);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={{...style, ...{
                    width: isMobile ? "90%":"fit-content",
                }}}
            >
                {!isLoading && creator != null ? (
                    <div>
                        <p className='mb-4 text-[#3A60F7] font-bold'>Media Info</p>

                        <div className='flex flex-col md:flex-row'>
                            <p className='font-bold'>Uploaded By : </p>
                            <div style={{ marginTop : isMobile ? "-1.1rem" : "-2.1rem" }}>
                                <Member 
                                    url={creator.profilePhoto}
                                    name={creator.userName}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row mt-4'>
                            <p className='font-bold'>Uploaded On : </p>
                            <p className='text-[#000000]' style={{ marginTop : isMobile ? "1rem" : "0rem", marginLeft:"2rem" }}>{dateAndTime}</p>
                        </div>

                        {creator.email === email && 

                            <div className={styles.close} style={{ width:"fit-content", marginTop:"2rem" }} onClick={deleteMedia}>
                                DELETE THIS MEDIA
                            </div>
                        
                        }

                    </div>
                ):(
                    <CircularProgress color='primary' />
                )}
            </Box>
        </Modal>
    );
}

export default MediaUploader;