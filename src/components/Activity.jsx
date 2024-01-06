import React from 'react'
import { useSelector } from 'react-redux';

const Activity = ({ item }) => {

    const { email } = useSelector((state) => state.user);

    const dateOptions = { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'Asia/Kolkata' 
    };

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12:true,
        timeZone: 'Asia/Kolkata',
    };

    const date = new Date(item.created).toLocaleString('en-us', dateOptions);
    const today = new Date().toLocaleString('en-us', dateOptions);
    const time = new Date(item.created).toLocaleString('en-us', timeOptions);

    const dateAndTime = (date == today ? "today, " : (date + ", ")) + time;

    const message = item.message.replace(email, "you");

    return (
        <div className='flex bg-[white] p-2 flex-row items-center rounded-sm' style={{ marginTop:"1rem", borderRadius:"0.5rem" }}>
            <div className='flex flex-row items-center' style={{ flex:1 }}>
                {item.profilePhoto ? (
                    <img 
                        className='ml-5'
                        src={item.profilePhoto}
                        height="25vw"
                        width="25vw"
                        style={{ borderRadius : "25vw", border : "1px solid black" }} />
                ):(
                    <div className="ml-5" style={{ backgroundColor : "#3A60F7", display : "flex", justifyContent:"center", alignItems:"center", height:"2vw", width:"2vw", borderRadius:"2vw", border : "1px solid black" }}>
                        <p className="profile-photo-text">{item.userName[0]}</p>
                    </div>
                )}
                <p className='ml-5 text-sm font-bold'>{item.userName}</p>
            </div>

            <p className='text-sm' style={{ color : "#8C8C8C", flex:2 }}>{message} {item.diaryName}</p>

            <div className='flex' style={{ flex:1, justifyContent:"flex-end", marginRight:"1rem" }}>
                <p className='text-sm' style={{ color : "#8C8C8C" }}>{dateAndTime}</p>
            </div>
        </div>
    )
} 

export default Activity;