import axios from "config/axiosInstance";
import axiosMultipart from "config/axiosMulipartInstance";
import Activity from "components/Activity";
import CreateDiary from "components/CreateDiary";
import Diary from "components/Diary";
import LoggedInHeader from "components/LoggedInHeader";
import CreateActivityModal from "components/modal/CreateActivityModal";
import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "utils/constants";
import "./HomePage.css";
import DiarySkeleton from "components/loading/DiarySkeleton";
import ActivitySkeleton from "components/loading/ActivitySkeleton";
import LoadingModel from "components/modal/LoadingModal";
import { toast } from "react-toastify";
import { getRandomDarkColor } from "utils/helpers";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setDiary as setDiaryState } from "state/authSlice";
import NoData from "components/noData";

const HomePage = () => {
	const [showModal, setShowModal] = useState(false);
	const [diary, setDiary] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isMore, setIsMore] = useState(false);
	const [isMoreLoading, setIsMoreLoading] = useState(false);
	const [isActivityLoading, setIsActivityLoading] = useState(false);
	const [activity, setActivity] = useState([]);
	const [isMoreActivity, setIsMoreActivity] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [searchText, setSearchText] = useState("");
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

	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const getMyDiary = async () => {
		setIsLoading(true);
		try {
			const diaryResponse = await axios.get(BASE_API_URL+"/user/diary?sort=-1&limit=3&offset=0");
			setDiary(diaryResponse.data);
		} catch(error) {
			console.log(error);
		}
		setIsLoading(false);
	}

	const getIsMore = async () => {
		setIsMoreLoading(true);
		try {
			const diaryResponse = await axios.get(BASE_API_URL+"/user/diary?sort=-1&limit=3&offset=3");
			console.log(diaryResponse)
			if (diaryResponse.data.length > 0) {
				setIsMore(true);
			}
		} catch(error) {
			console.log(error);
		}
		setIsMoreLoading(false);
	}

	const getActivities = async () => {
		setIsActivityLoading(true);
		try {
			const response = await axios.get(BASE_API_URL+"/user/activities?sort=-1&limit=6&offset=0");
			if (response.data.length > 5) {
				setIsMoreActivity(true);
				const data = [];
				for (let i=0; i <= 4; i++) {
					data.push(response.data[i]);
				}
				setActivity(data);
			} else {
				setActivity(response.data);
			}
		} catch(error) {
			console.log(error);
		}
		setIsActivityLoading(false);
	}
	
	useEffect(() => {
		const homePageLoad = () => {
			getMyDiary();
			getIsMore();
			getActivities();
		}
		homePageLoad();
	}, []);

	const verifyDiaryInputs = (files, title) => {
		if (files.length <= 0) {
			toast("please select cover image");
		} else if (title.trim().length < 2) {
			toast("please select valid title")
		} else {
			creatDiary(files, title);
		}
	}

	const creatDiary = async (files, title) => {
		setShowModal(false);
		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append('coverImage', files[0]);
			formData.append('diaryName', title);
			const color = getRandomDarkColor();
			formData.append('color', color);
			const response = await axiosMultipart.post(BASE_API_URL+"/diary/", formData);
			console.log(response.data);
			getMyDiary();
			getIsMore();
		}catch(error) {
			console.log(error);
		}
		setIsUploading(false);
	}

	const onDiaryClick = (id, diary) => {
		dispatch(
			setDiaryState({
				diary : diary
			})
		)
		navigate(`/diary/${id}`);
	}

	const onMoreClick = () => {
		navigate("/diarys")
	}

	const onMoreActivityClick = () => {
		navigate("/activities")
	}

	return (
		<div className="flex flex-col bg-[#F5F5F5] min-h-screen">
			<LoggedInHeader 
				isUserProfile={true} 
				isHeaderColor={true} 
				searchText={searchText} 
				setSearchText={(text) => setSearchText(text)} 
				onSearch={() => { 
					if (searchText.trim().length !== 0) {
						navigate("/diarys", { state : searchText })
					}
				}}
			/>

			<div className="mt-10 flex flex-col md:flex-row pl-10 pr-10">
				<CreateDiary onCreateDiary={() => {
                    setShowModal(true)
                }} />

				{showModal && (
					<CreateActivityModal open={true} onCreate={(files, title) => verifyDiaryInputs(files, title)} handleClose={() => {
                        setShowModal(false)
                    }} />
				)}

				{!isLoading ? (
					<div className="flex flex-col md:flex-row">
						{diary.length > 0 ? (
							diary.map((item, key) => (
								<Diary 
									key={key}
									image={item.coverImage}
									name={item.name}
									marginLeft="2rem"
									onDiaryClick={() => onDiaryClick(item.id, item)}
								/>
							))
						):(
							<div style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"40vw" }}>
								<p className="font-bold text-[#8C8C8C]">No Diary Found</p>
							</div>
						)}

						{(!isMoreLoading && isMore && diary.length > 0) && (
							<div 
								onClick={() => onMoreClick()}
								className='h-diary-md w-full md:w-more md:h-diary relative rounded-md bg-[white] shadow-md hover:cursor-pointer overflow-hidden' 
								style={{ marginLeft : isMobile ? "0rem" : "2rem", marginTop : isMobile ? "1rem" : "0rem" }}
							>
								<div className="home-more-container">
									<p className="home-more">more</p>
								</div>
							</div>
						)}
					</div>
				) : (
					<DiarySkeleton amount={3}/>
				)}
			</div>

			<div className="mt-10 pl-10 pr-10">
				<p className="font-bold">Recent Activities</p>
				<p className="mt-3"></p>

				{!isActivityLoading ? (
					<div>
						{activity.length > 0 && activity.map((item, key) => (
							<Activity item={item} key={key}/>
						))}

						{activity.length === 0 && (
							<NoData message={"No Activity Found"} />
						)}

						{isMoreActivity && (
							<div className="flex mt-5 mb-5 justify-center" onClick={onMoreActivityClick}>
								<p className="text-[blue] font-bold hover:cursor-pointer">More</p>
							</div>
						)}
					</div>
				):(
					<ActivitySkeleton amount={4} />
				)}
			</div>

			<LoadingModel
				open={isUploading}
				message="Creating"
			/>
		</div>
	);
};

export default HomePage;
