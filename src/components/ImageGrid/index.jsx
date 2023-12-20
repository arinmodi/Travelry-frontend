import { ImageList, ImageListItem } from "@mui/material";

export default function ImageGrid({ itemData }) {
	console.log(itemData);
	return (
		<ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
			{itemData.map((item) => (
				<ImageListItem key={item}>
					<img src={`${item}`} loading="lazy" />
				</ImageListItem>
			))}
		</ImageList>
	);
}
