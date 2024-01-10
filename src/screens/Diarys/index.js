import DiaryGrid from 'components/DiaryGrid';
import LoggedInHeader from 'components/LoggedInHeader';
import React, { useEffect, useState } from 'react';
import "./index.css";
import axios from "config/axiosInstance";
import { BASE_API_URL } from 'utils/constants';
import DiarySkeleton from 'components/loading/DiarySkeleton';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { setDiary as setDiaryState } from "state/authSlice";
import NoData from 'components/noData';

const DiarysPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const search = location.state;

    const [filterModal, setFilterModal] = useState(false);
    const [diary, setDiary] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
    const [isMoreDiary, setIsMoreDiary] = useState(false);
    const [offset, setOffset] = useState(8);
    const [isMoreDiaryLoading, setIsMoreDiaryLoading] = useState(false);
    const [sort, setSort] = useState();
    const [searchText, setSearchText] = useState(search !== null ? search : "");
    const [isSearch, setIsSearch] = useState(search !== null);
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

    const getMyDiary = async (sortRequested, force = 0) => {
        if (sort !== sortRequested || force) {
            setIsLoading(true);
            try {
                const diaryResponse = await axios.get(BASE_API_URL+`/user/diary?sort=${sortRequested}&limit=9&offset=0`);
                if (diaryResponse.data.length > 8) {
                    setIsMoreDiary(true);
                    const data = [];
                    for (let i=0; i < 8; i++) {
                        data.push(diaryResponse.data[i]);
                    }
                    setDiary(data);
                }else {
                    setDiary(diaryResponse.data);
                }
            } catch(error) {
                console.log(error);
            }
            setIsLoading(false);
            setSort(sortRequested);
        }
	}

    const getMyDiaryMore = async () => {
		setIsMoreDiaryLoading(true);
		try {
			const diaryResponse = await axios.get(BASE_API_URL+`/user/diary?sort=${sort}&limit=5&offset=${offset}`);
            if (diaryResponse.data.length > 4) {
                setIsMoreDiary(true);
                const data = [];
                for (let i=0; i < 4; i++) {
                    data.push(diaryResponse.data[i]);
                }
                setDiary([...diary, ...data]);
                setOffset(offset+4);
            }else {
                setIsMoreDiary(false);
			    setDiary([...diary, ...diaryResponse.data]);
            }
		} catch(error) {
			console.log(error);
		}
		setIsMoreDiaryLoading(false);
	}

    const onDiaryClick = (diary) => {
		dispatch(
			setDiaryState({
				diary : diary
			})
		)
		navigate(`/diary/${diary.id}`);
    }

    const onSortApplied = (s) => {
        setSearchText("");
        if (isSearch) {
            setSort(0);
        }
        setIsSearch(false);
        getMyDiary(s);
        setFilterModal(false);
    }

    const onSearchClicked = async () => {
        if (searchText.trim().length > 0) {
            setIsLoading(true);
            try {
                const diaryResponse = await axios.get(BASE_API_URL+`/user/diary/search?search=${searchText}`);
                setDiary(diaryResponse.data);
                setIsSearch(true);
            } catch(error) {
                console.log(error);
                setSearchText("");
            }
            setIsLoading(false);
        }
    }

    const onSearchCancel = () => {
        setSearchText("");
        setIsSearch(false);
        const s = sort;
        console.log(s);
        setSort(0);
        getMyDiary(s, true);
    }

    useEffect(() => {
        if (search === null) {
            getMyDiary(-1);
        } else {
            onSearchClicked();
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
            <LoggedInHeader 
                filter={true}
                isFilterModal={filterModal}
                setIsFilterModal={(isFilterModal) => setFilterModal(isFilterModal)}
                onSortApplied={(s) => onSortApplied(s)}
                isHeaderColor={true}
                onSearch={() => onSearchClicked()}
                searchText={searchText}
                setSearchText={(text) => setSearchText(text)}
                isSearch={isSearch}
                onSearchCancel={onSearchCancel}
            />

            <div className='flex flex-col pl-10 pr-10'>

                {!isLoading ? (
                    <div className='diary-grid-container'>
                        
                        {diary.length > 0 ? (
                            <DiaryGrid 
                                itemData={diary}
                                diaryClick={(diary) => onDiaryClick(diary)}
                                cols={isMobile ? 1 : 4}
                            />
                        ):(
                            <NoData message="No Diary Found" />
                        )}

                        {isMoreDiaryLoading && (
                            <div className='flex flex-row mt-5' style={{ marginLeft:"-2rem" }}>
                                <DiarySkeleton amount={4} />
                            </div>
                        )}

                    </div>
                ):(
                    <div>
                        <div className='flex flex-col md:flex-row mt-5' style={{ marginLeft:"-2rem" }}>
                            <DiarySkeleton amount={4} />
                        </div>

                        <div className='flex flex-col md:flex-row mt-5' style={{ marginLeft:"-2rem" }}>
                            <DiarySkeleton amount={4} />
                        </div>
                    </div>
                )}

                {!isLoading && !isMoreDiaryLoading && isMoreDiary && !isSearch && 
                    <p className='load-more' onClick={getMyDiaryMore}>Load more</p>
                }

            </div>

        </div>
    )
}

export default DiarysPage;