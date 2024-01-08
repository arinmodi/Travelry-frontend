import { ImageList, ImageListItem } from "@mui/material";
import './index.css';
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ImageGrid({ itemData, onMediaClick }) {
	console.log(itemData);
	return (
		<ImageList sx={{ width: "100%", height: "100%", padding : "1rem" }} cols={4} gap={5}>
			{itemData.map((item, key) => (
				<ImageListItem key={key}>
					<div className="image-container" onClick={() => onMediaClick(item)}>
						{item.isVideo ? (
							<video
								src={item.url}
								controls
								className="Image" 
							/>
						):(
							<LazyLoadImage src={`${item.url}`} loading="lazy" className="Image" alt="main" />
						)}
						<div className="overlay"></div>
					</div>
				</ImageListItem>
			))}
		</ImageList>
	);
}
