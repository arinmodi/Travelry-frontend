import React, { useEffect, useState } from 'react';

const Diary = ({image, name, marginLeft="1rem", onDiaryClick}) => {
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
        <div className='h-diary-md w-full md:w-diary md:h-diary relative rounded-md bg-[white] shadow-md hover:cursor-pointer overflow-hidden' onClick={onDiaryClick} style={{ marginLeft : isMobile ? "0rem" : marginLeft, marginTop : isMobile ? "1rem" : "0rem" }}>
            <img
                src={image}
                style={{
                    width:"100%",
                    height:"100%",
                    objectFit:"cover"
                }}
                alt='diary'
            />
            <div className="absolute top-0 left-0 w-full h-full flex bg-[black] opacity-50 rounded items-center justify-center">
                <p className='text-[white] font-bold'>{name}</p>
            </div>
        </div>
    )
}

export default Diary;