import React from 'react';
import { IoMdAdd } from 'react-icons/io';

const Diary = ({image, name}) => {
    return (
        <div className='w-diary h-diary relative rounded-md bg-[white] shadow-md hover:cursor-pointer ml-10 overflow-hidden'>
            <img
                src={image}
                height="h-full"
                width="w-full" />
            <div className="absolute top-0 left-0 w-full h-full flex bg-[black] opacity-40 rounded items-center justify-center">
                <p className='text-[white] font-bold'>{name}</p>
            </div>
        </div>
    )
}

export default Diary;