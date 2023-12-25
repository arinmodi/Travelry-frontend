import React from 'react';
import "./Member.css";

const Member = ({ url, name }) => {
    return (
        <div className='member-container'>
            <img 
                src={url}
                className='profile-image'
                alt='profile'
            />
                
            <p className='ml-5 text-sm font-bold'>{name}</p>
        </div>
    );
}

export default Member;