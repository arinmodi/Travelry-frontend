import React from "react";

const NoData = ({ message }) => {
    return (
        <div className='flex items-center justify-center' style={{ height:"25rem" }}>
            <p className='font-bold text-[#8C8C8C]'>{message}</p>
        </div>
    )
}

export default NoData;