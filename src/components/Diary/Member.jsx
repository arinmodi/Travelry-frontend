import React from 'react';
import "./Member.css";

const Member = ({ url, name }) => {
    return (
        <div className='member-container'>
            {url ? (
                <img 
                    src={url}
                    className='profile-image'
                    alt='profile'
                />
            ):(
                <div className="profile-image" style={{ display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"#3A60F7" }}>
                    <p className='text-[white] font-bold'>{name[0]}</p>
                </div>
            )}
                
            <p className='ml-5 text-sm font-bold'>{name}</p>
        </div>
    );
}

export default Member;