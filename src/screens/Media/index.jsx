import React, { useEffect, useRef, useState } from 'react';
import "./index.css";
import Header from 'components/Header';
import { Button } from '@mui/material';
import Comment from './comment';

const Media = () => {
    const [mediaLink, setMediaLink] = useState();
    const [isVideo, setIsVideo] = useState(false);
    const comments = useRef();

    const message = {
        username : "Devarsh Mavani",
        profileImage : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        isSelfMessage : false,
        message : "This is cool!"
    }

    const selfMessage = {
        username : "Arin Modi",
        profileImage : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        isSelfMessage : true,
        message : "yup"
    }

    useEffect(() => {
        setMediaLink("https://firebasestorage.googleapis.com/v0/b/ssip-2022.appspot.com/o/orders%2Fmedia%2FVID20220911114932_1664009063219.mp4?alt=media&token=664495ce-c530-4537-a32d-8461cef763b3");
        setIsVideo(true)
        comments.current.scrollTop = comments.current.scrollHeight;
    }, []);

    return (
        <div className='media-container'>
            
            <div className='media-sub-container'>
                {isVideo ? (
                    <video 
                        height="100%"
                        width="100%"
                        style={{ objectFit : "contain" }}
                        src={mediaLink}
                        controls
                    />
                ) : (
                    <img
                        height="100%"
                        width="100%"
                        style={{ objectFit : "contain" }}
                        src={mediaLink}
                        alt='media'
                    />
                )}
            </div>

            <div className='comment-container'>
                <div className='comment-sub-container'>

                    <Header />

                    <div className='comments' ref={comments}>
                        <Comment 
                            message={message}
                        />

                        <Comment 
                            message={selfMessage}
                        />

                        <Comment 
                            message={message}
                        />

                        <Comment 
                            message={message}
                        />

                        <Comment 
                            message={message}
                        />

                        <Comment 
                            message={selfMessage}
                        />

                        <Comment 
                            message={selfMessage}
                        />
                    </div>

                    <div className='comment-input-container'>
                        
                        <input 
                            type='text'
                            placeholder='Enter message'
                            className='message-input' />

                        <Button
                            variant='contained'
                            className='button-style'
                        >
                            Send
                        </Button>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Media;