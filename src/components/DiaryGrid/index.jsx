import { ImageList, ImageListItem } from "@mui/material";
import Diary from "components/Diary";

export default function DiaryGrid({ itemData, cols=4 }) {
	return (
		<ImageList sx={{ width: "100%", height: "100%", padding : "1rem" }} cols={cols} gap={50}>
			{itemData.map((item) => (
				<ImageListItem key={item}>
					<Diary 
                        image={item.url}
                        name={item.title}
                        marginLeft="0"
                    />
				</ImageListItem>
			))}
		</ImageList>
	);
}
