import React from 'react';
import "./comment.css";

const Comment = ({ message }) => {

    return (
        <div>
            {message.isShow && (
                <div className='date-container'>
                    <p>{message.date}</p>
                </div>
            )}
            <div className={message.isSelfMessage ? 'message-container-self' : 'message-container'}>

                {!message.isSelfMessage && (
                    <div className='user-container'>
                        {message.profilePhoto ? (
                        <img
                            alt='profile'
                            src={message.profileImage}
                            className='user-image' />
                        ):(
                            <div className='user-avatar'>
                                <p className='text-[white] font-bold text-sm'>A</p>
                            </div>
                        )}

                        <p className='msg-username'>{message.userName}</p>
                    </div>
                )}

                <div className={message.isSelfMessage ? 'message-self' : 'message'}>
                    <p className={message.isSelfMessage ? 'message-content-self' : 'message-content'}>{message.content}</p>
                </div>
                
                <p className='time'>{message.time}</p>
            </div>
        </div>
    );
}

export default Comment;