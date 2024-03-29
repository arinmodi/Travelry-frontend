import React from "react";
import { IoMdAdd } from "react-icons/io";

const CreateDiary = ({ onCreateDiary }) => {
	return (
		<div
			onClick={onCreateDiary}
			className="h-diary-sm w-full md:h-diary md:w-diary rounded-md bg-[white] shadow-md hover:cursor-pointer hover:bg-[#FAFAFA]"
		>
			<div className="flex h-full items-center justify-center flex-col">
				<IoMdAdd className="text-[black] text-2xl" />
				<p className="mt-2+ text-[black] font-bold">Create Diary</p>
			</div>
		</div>
	);
};

export default CreateDiary;
