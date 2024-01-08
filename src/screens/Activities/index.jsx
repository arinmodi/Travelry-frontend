import DiaryGrid from 'components/DiaryGrid';
import LoggedInHeader from 'components/LoggedInHeader';
import React, { useEffect, useState } from 'react';
import "./index.css";
import axios from "config/axiosInstance";
import { BASE_API_URL } from 'utils/constants';
import NoData from 'components/noData';
import Activity from 'components/Activity';
import ActivitySkeleton from 'components/loading/ActivitySkeleton';
import { useLocation } from 'react-router';

const ActivitiesPage = () => {

    const location = useLocation();
    const id = location.state;

    const [filterModal, setFilterModal] = useState(false);
    const [activity, setActivity] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
    const [isMoreActivity, setIsMoreActivity] = useState(false);
    const [offset, setOffset] = useState(10);
    const [isMoreActivityLoading, setIsMoreActivityLoading] = useState(false);
    const [sort, setSort] = useState();

    const getMyActivity = async (sortRequested) => {
        if (sort !== sortRequested) {
            setIsLoading(true);
            try {
                const response = (id === null) ? 
                    await axios.get(BASE_API_URL+`/user/activities?sort=${sortRequested}&limit=11&offset=0`) : 
                    await axios.get(BASE_API_URL+`/user/${id}/activities?sort=${sortRequested}&limit=11&offset=0`)
                ;
                if (response.data.length > 10) {
                    setIsMoreActivity(true);
                    const data = [];
                    for (let i=0; i < 10; i++) {
                        data.push(response.data[i]);
                    }
                    setActivity(data);
                }else {
                    setActivity(response.data);
                }
            } catch(error) {
                console.log(error);
            }
            setIsLoading(false);
            setSort(sortRequested);
        }
	}

    const getMyActivityMore = async () => {
		setIsMoreActivityLoading(true);
		try {
			const response = (id === null) ? 
                await axios.get(BASE_API_URL+`/user/activities?sort=${sort}&limit=6&offset=${offset}`) :
                await axios.get(BASE_API_URL+`/user/${id}/activities?sort=${sort}&limit=6&offset=${offset}`);
            if (response.data.length > 5) {
                setIsMoreActivity(true);
                const data = [];
                for (let i=0; i < 5; i++) {
                    data.push(response.data[i]);
                }
                setActivity([...activity, ...data]);
                setOffset(offset+5);
            }else {
                setIsMoreActivity(false);
			    setActivity([...activity, ...response.data]);
            }
		} catch(error) {
			console.log(error);
		}
		setIsMoreActivityLoading(false);
	}

    const onSortApplied = (s) => {
        getMyActivity(s);
        setFilterModal(false);
    }

    useEffect(() => {
        getMyActivity(-1);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
            <LoggedInHeader 
                filter={true}
                isFilterModal={filterModal}
                setIsFilterModal={(isFilterModal) => setFilterModal(isFilterModal)}
                onSortApplied={(s) => onSortApplied(s)}
                isHeaderColor={true}
                isSearchBar={false}
            />

            <div className='flex flex-col pl-10 pr-10 mb-10'>

                {!isLoading ? (
                    <div className='diary-grid-container'>
                        
                        {activity.length > 0 ? (
                            activity.map((item, key) => (
                                <Activity 
                                    item={item}
                                    key={key}
                                />
                            ))
                        ):(
                            <NoData message="No Activity Found" />
                        )}

                        {isMoreActivityLoading && (
                            <ActivitySkeleton amount={4} />
                        )}

                    </div>
                ):(
                   <ActivitySkeleton amount={9} />
                )}

                {!isLoading && !isMoreActivityLoading && isMoreActivity && 
                    <p className='load-more' onClick={getMyActivityMore}>Load more</p>
                }

            </div>

        </div>
    )
}

export default ActivitiesPage;