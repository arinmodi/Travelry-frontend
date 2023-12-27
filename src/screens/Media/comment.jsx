import React from 'react';
import "./comment.css";

const Comment = ({ message }) => {
    return (
        <div className={message.isSelfMessage ? 'message-container-self' : 'message-container'}>

            {!message.isSelfMessage && (
                <div className='user-container'>
                    <img
                        alt='profile'
                        src={message.profileImage}
                        className='user-image' />

                    <p className='msg-username'>{message.username}</p>
                </div>
            )}

            <div className={message.isSelfMessage ? 'message-self' : 'message'}>
                <p className={message.isSelfMessage ? 'message-content-self' : 'message-content'}>{message.message}</p>
            </div>

        </div>
    );
}

export default Comment;