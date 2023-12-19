import React from 'react'

const Activity = () => {
    return (
        <div className='flex bg-[white] p-2 flex-row items-center rounded-sm' style={{ borderBottom : "1px solid black" }}>
            <div className='flex flex-row'>
                <img 
                    className='ml-5'
                    src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
                    height="25vw"
                    width="25vw"
                    style={{ borderRadius : "25vw", border : "1px solid black" }} />
                
                <p className='ml-5 text-sm font-bold'>Arin Modi</p>
            </div>

            <p className='text-sm' style={{ marginLeft : "30%", color : "#8C8C8C" }}>Dhurv uploaded image to goa</p>

        </div>
    )
}

export default Activity;