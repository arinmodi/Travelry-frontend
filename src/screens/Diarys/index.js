import DiaryGrid from 'components/DiaryGrid';
import LoggedInHeader from 'components/LoggedInHeader';
import React, { useState } from 'react';
import "./index.css"

const DiarysPage = () => {

    const [filterModal, setFilterModal] = useState(false);

    const dummyData = [
        { url : "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hfGVufDB8fDB8fHww", title : "Goa" },
        { url : "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=600", title : "Maldivs" },
    ]

    return (
        <div className="flex flex-col h-screen pl-10 pr-10 bg-[#F5F5F5]">
            <LoggedInHeader 
                filter={true}
                isFilterModal={filterModal}
                setIsFilterModal={(isFilterModal) => setFilterModal(isFilterModal)}
            />

            <div className='diary-grid-container'>

                <DiaryGrid 
                    itemData={dummyData}
                />

            </div>

            <p className='load-more'>Load more</p>
        </div>
    )
}

export default DiarysPage;