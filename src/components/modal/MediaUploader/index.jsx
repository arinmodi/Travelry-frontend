import { Box, Button, CircularProgress, Modal } from '@mui/material';
import Member from 'components/Diary/Member';
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

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
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column"
};

const MediaUploader = ({ open, creator, dateAndTime, handleClose, isLoading, deleteMedia }) => {

    const { email } = useSelector((state) => state.user);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={style}
            >
                {!isLoading && creator != null ? (
                    <div>
                        <p className='mb-4 text-[#3A60F7] font-bold'>Media Info</p>

                        <div className='flex flex-row'>
                            <p className='font-bold'>Uploaded By : </p>
                            <div style={{ marginTop : "-2.1rem" }}>
                                <Member 
                                    url={creator.profilePhoto}
                                    name={creator.userName}
                                />
                            </div>
                        </div>

                        <div className='flex flex-row mt-4'>
                            <p className='font-bold'>Uploaded On : </p>
                            <p className='ml-2 text-[#000000]'>{dateAndTime}</p>
                        </div>

                        {creator.email === email && 

                            <div className="close" style={{ width:"fit-content", marginTop:"2rem" }} onClick={deleteMedia}>
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