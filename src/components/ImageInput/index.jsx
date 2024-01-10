import { Box } from "@mui/material";
import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";

const ImageFileInput = ({ text, onFilesChange, multiple=false, isVideo=false }) => {

	const inputRef = useRef();

	const handleBoxClick = () => {
		inputRef.current.click();
	};

	return (
		<Box
			sx={{
				height:"10rem",
				borderRadius:"0.5rem",
				display:"flex",
				alignItems:"center",
				justifyContent:"center",
				flexDirection:"column",
			}}
			className="w-full bg-[#F5F5F5] hover:cursor-pointer hover:bg-[#FAFAFA]"
			onClick={() => handleBoxClick()}
		>
				<IoMdAdd className="text-[blue] text-2xl" />

				<p
					style={{
						marginTop:"1rem",
						fontWeight:"bold",
					}}
				>{text}</p>

				<input
					type="file"
					ref={inputRef}
					multiple={multiple}
					hidden
					accept={isVideo ? "image/*,video/*" : "image/*"} // only accept image file types
					onChange={(e) => {
						// this gives us the data on what files are selected
						// however, it's of type `FileList` which is hard to modify.
						const fileList = e.target.files;
						// let's convert `FileList` into a `File[]`
						if (fileList) {
							const files = [...fileList]; // now we have `File[]` type
							// This only works on es6 version make sure to set your tsconfig.json "target" to "es6"
							onFilesChange(files);
						}
					}}
					className="bg-gray-100"
				/>
		</Box>
	);
};

export default ImageFileInput;
