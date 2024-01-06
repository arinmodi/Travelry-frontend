import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Input } from "@mui/material";
import Diary from "components/Diary";
import ImageGrid from "components/ImageGrid";
import ImageFileInput from "components/ImageInput";
import ImageInput from "components/ImageInput/ImageInput";
import { useState } from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	borderRadius: 5,
	display:"flex",
	flexDirection:"column",
	alignItems:"center",
};
export default function CreateActivityModal({ open, handleClose, onCreate }) {
	const [files, setFiles] = useState([]);
	const [title, setTitle] = useState("");
	const urls = files.map((file) => URL.createObjectURL(file));
	return (
		<Modal open={open} onClose={handleClose} >
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					variant="h6"
					component="h2"
					sx={{ marginBottom: "20px", fontWeight:"bold" }}
					className="font-bold"
				>
					Create Diary
				</Typography>
				<div
					className="d-flex justify-content-center align-items-center flex-column"
					sx={{ marginBottom: "20px" }}
				>
					{files.length > 0 ? (
						<Diary image={urls[0]} name={title} marginLeft="0rem"/>
					) : (
						<ImageFileInput
							onFilesChange={(selectedFilies) =>
								setFiles(selectedFilies)
							}
							text="Upload Image"
						/>
					)}
					<Input
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						placeholder={"Enter title of your diary"}
						sx={{ marginBottom: "20px", marginTop: "20px", border : "1px solid black", padding : "0.2rem 0.5rem", borderRadius:"0.5rem" }}
						className="w-diary"
						disableUnderline="true"
					/>
					<div
						className="d-flex justify-content-center align-items-center"
						style={{ marginBottom: "20px" }}
					>
						{files.length > 0 ? (
							<Button
								variant="contained"
								component="label"
								sx={{ marginRight: "20px" }}
							>
								Change Image
								<ImageInput
									onFilesChange={(selectedFilies) =>
										setFiles(selectedFilies)
									}
								/>
							</Button>
						) : null}
						<Button
							variant="contained"
							sx={{ marginLeft: "20px" }}
							onClick={() => onCreate(files, title)}
						>
							Create
						</Button>
					</div>
				</div>
			</Box>
		</Modal>
	);
}
