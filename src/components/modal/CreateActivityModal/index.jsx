import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Input } from "@mui/material";
import Diary from "components/Diary";
import ImageGrid from "components/ImageGrid";
import ImageFileInput from "components/ImageInput";
import { useState } from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	textAlign: "center",
	width: 600,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};
export default function CreateActivityModal({ open, handleClose }) {
	const [files, setFiles] = useState([]);
	const [title, setTitle] = useState("");
	const urls = files.map((file) => URL.createObjectURL(file));
	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					variant="h6"
					component="h2"
					sx={{ marginBottom: "8px" }}
				>
					Create a diary
				</Typography>
				<div
					className="d-flex justify-content-center align-items-center flex-column"
					sx={{ marginBottom: "8px" }}
				>
					{files.length > 0 ? (
						<Diary image={urls[0]} name={title} />
					) : (
						<Button
							variant="contained"
							component="label"
							sx={{ marginBottom: "8px" }}
						>
							Upload Image
							<ImageFileInput
								onFilesChange={(selectedFilies) =>
									setFiles(selectedFilies)
								}
							/>
						</Button>
					)}
					<Input
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						placeholder={"Enter title of your diary"}
						sx={{ marginBottom: "8px", marginTop: "8px" }}
					/>
					<div
						className="d-flex justify-content-center align-items-center"
						style={{ marginBottom: "8px" }}
					>
						{files.length > 0 ? (
							<Button
								variant="contained"
								component="label"
								sx={{ marginRight: "8px" }}
							>
								Change Image
								<ImageFileInput
									onFilesChange={(selectedFilies) =>
										setFiles(selectedFilies)
									}
								/>
							</Button>
						) : null}
						<Button
							variant="contained"
							endIcon={<SendIcon />}
							sx={{ marginLeft: "8px" }}
						>
							Create
						</Button>
					</div>
				</div>
			</Box>
		</Modal>
	);
}
