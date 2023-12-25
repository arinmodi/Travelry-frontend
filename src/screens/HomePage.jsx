import Activity from "components/Activity";
import CreateDiary from "components/CreateDiary";
import Diary from "components/Diary";
import LoggedInHeader from "components/LoggedInHeader";
import CreateActivityModal from "components/modal/CreateActivityModal";
import React, { useState } from "react";

const HomePage = () => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className="flex flex-col h-screen pl-10 pr-10 bg-[#F5F5F5]">
			<LoggedInHeader />

			<div className="mt-10 flex">
				<CreateDiary onCreateDiary={() => {
                    setShowModal(true)
                }} />

				{showModal && (
					<CreateActivityModal open={true} handleClose={() => {
                        setShowModal(false)
                    }} />
				)}

				<Diary
					image="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/KFVXH4V6SBMMFN56YXWCW7ZNPU.jpg"
					name="Goa"
				/>
			</div>

			<div className="mt-10">
				<p className="font-bold">Recent Activities</p>
				<p className="mt-3"></p>
				<Activity />
			</div>
		</div>
	);
};

export default HomePage;
