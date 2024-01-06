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
			} else {
				setActivity(response.data);
			}
		} catch(error) {
			console.log(error);
		}
		setIsActivityLoading(false);
	}
	
	useEffect(() => {
		homePageLoad();
	}, []);

	const homePageLoad = () => {
		getMyDiary();
		getIsMore();
		getActivities();
	}

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
		}catch(error) {
			console.log(error);
		}
		setIsUploading(false);
	}

	return (
		<div className="flex flex-col h-screen bg-[#F5F5F5]">
			<LoggedInHeader isUserProfile={true} isHome={true}/>

			<div className="mt-10 flex pl-10 pr-10">
				<CreateDiary onCreateDiary={() => {
                    setShowModal(true)
                }} />

				{showModal && (
					<CreateActivityModal open={true} onCreate={(files, title) => verifyDiaryInputs(files, title)} handleClose={() => {
                        setShowModal(false)
                    }} />
				)}

				{!isLoading ? (
					<div className="flex">
						{diary.map((item, key) => (
							<Diary 
								image={item.coverImage}
								name={item.name}
								marginLeft="2rem"
							/>
						))}

						{(!isMoreLoading && isMore) && (
							<div 
								className='w-more h-diary relative rounded-md bg-[white] shadow-md hover:cursor-pointer overflow-hidden' 
								style={{ marginLeft : "2rem" }}
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
						{activity.map((item, key) => (
							<Activity item={item} key={key}/>
						))}

						{isMoreActivity && (
							<div className="flex mt-5 justify-center">
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
