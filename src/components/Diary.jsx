import React from 'react';

const Diary = ({image, name, marginLeft="1rem", onDiaryClick}) => {
    return (
        <div className='w-diary h-diary relative rounded-md bg-[white] shadow-md hover:cursor-pointer overflow-hidden' onClick={onDiaryClick} style={{ marginLeft : marginLeft }}>
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