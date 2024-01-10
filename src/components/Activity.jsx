import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDateAndTime } from 'utils/dateUtils';

const Activity = ({ item }) => {

    const { email } = useSelector((state) => state.user);

    const dateTime = getDateAndTime(item.created);
    const dateAndTime = dateTime[0] + ", " + dateTime[1];

    const message = item.message.replace(email, "you");

    const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

    useEffect(() => {
        const handleResize = () => {
           setIsMobile(window.innerWidth < 750);
        };
  
        window.addEventListener("resize", handleResize);
  
        return () => {
           window.removeEventListener("resize", handleResize);
        };
     }, []);

    return (
        <div className='flex bg-[white] p-2 flex-col md:flex-row md:items-center rounded-sm' style={{ marginTop:"1rem", borderRadius:"0.5rem" }}>
            <div className='flex flex-row items-center' style={{ flex:1, marginTop:isMobile ? "1rem" : "0rem" }}>
                {item.profilePhoto ? (
                    <div style={{ 
                        display : "flex", 
                        justifyContent:"center", 
                        alignItems:"center", 
                        height: isMobile ? "8vw" : "2vw", 
                        width: isMobile ? "8vw" : "2vw", 
                        borderRadius:isMobile ? "4vw" : "2vw", 
                        border : "1px solid black", 
                        overflow:"hidden",
                        marginLeft:isMobile ? "3vw" : "1vw"
                    }}>
                        <img 
                            src={item.profilePhoto}
                            className='h-full'
                            alt='profile'
                            style={{ objectFit:"cover" }} />
                    </div>
                ):(
                    <div style={{ 
                        backgroundColor : "#3A60F7", 
                        display : "flex", 
                        justifyContent:"center", 
                        alignItems:"center", 
                        height: isMobile ? "8vw" : "2vw", 
                        width: isMobile ? "8vw" : "2vw", 
                        borderRadius:isMobile ? "4vw" : "2vw", 
                        border : "1px solid black",
                        marginLeft:isMobile ? "3vw" : "1vw"
                    }}>
                        <p className="profile-photo-text">{item.userName[0]}</p>
                    </div>
                )}
                <p className='ml-5 text-sm font-bold'>{item.userName}</p>
            </div>

            <p 
                style={{ 
                    color : "#000000", 
                    flex:2,
                    marginTop: isMobile ? "0.5rem" : "0rem",
                    marginLeft : isMobile ? "3vw" : "0",
                    fontSize: isMobile ? "1rem" : "0.9rem",
                }}>
                    {message} {item.diaryName}
            </p>

            <div className='flex' style={{ flex:1, justifyContent:isMobile ? "flex-start" : "flex-end", marginRight:"1rem", marginTop: isMobile ? "0.5rem" : "0rem",
                    marginLeft : isMobile ? "3vw" : "0" }}>
                <p style={{ color : "#8C8C8C", fontSize: isMobile ? "1rem" : "0.8rem" }}>{dateAndTime}</p>
            </div>
        </div>
    )
} 

export default Activity;