import { ImageList, ImageListItem } from "@mui/material";
import Diary from "components/Diary";

export default function DiaryGrid({ itemData, cols=4, diaryClick }) {
	return (
		<ImageList sx={{ width: "100%", height: "100%", padding : "1rem" }} cols={cols} gap={50}>
			{itemData.map((item, key) => (
				<ImageListItem key={key}>
					<Diary 
                        image={item.coverImage}
                        name={item.name}
                        marginLeft="0"
						onDiaryClick={() => diaryClick(item)}
                    />
				</ImageListItem>
			))}
		</ImageList>
	);
}
