import { ImageList, ImageListItem } from "@mui/material";
import './index.css';

export default function ImageGrid({ itemData }) {
	console.log(itemData);
	return (
		<ImageList sx={{ width: "100%", height: "100%", padding : "1rem" }} cols={4} gap={5}>
			{itemData.map((item) => (
				<ImageListItem key={item}>
					<div className="image-container">
						{item.isVideo ? (
							<video
								src={item.url}
								controls
								className="Image" 
							/>
						):(
							<img src={`${item.url}`} loading="lazy" className="Image" alt="main" />
						)}
						<div className="overlay"></div>
					</div>
				</ImageListItem>
			))}
		</ImageList>
	);
}
