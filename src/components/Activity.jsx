import React from 'react'
import { useSelector } from 'react-redux';
import { getDateAndTime } from 'utils/dateUtils';

const Activity = ({ item }) => {

    const { email } = useSelector((state) => state.user);

    const dateTime = getDateAndTime(item.created);
    const dateAndTime = dateTime[0] + ", " + dateTime[1];

    const message = item.message.replace(email, "you");

    return (
        <div className='flex bg-[white] p-2 flex-row items-center rounded-sm' style={{ marginTop:"1rem", borderRadius:"0.5rem" }}>
            <div className='flex flex-row items-center' style={{ flex:1 }}>
                {item.profilePhoto ? (
                    <div className="ml-5" style={{ display : "flex", justifyContent:"center", alignItems:"center", height:"2vw", width:"2vw", borderRadius:"2vw", border : "1px solid black", overflow:"hidden" }}>
                        <img 
                            src={item.profilePhoto}
                            className='h-full'
                            style={{ objectFit:"cover" }} />
                    </div>
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