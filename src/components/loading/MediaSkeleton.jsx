import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MediaSkeleton = ({ amount }) => {
   
    const loadMedia = Array(amount).fill(1);

    return loadMedia.map((_, i) => (
        <div className="w-media-skeleton h-media-skeleton relative rounded-md overflow-hidden ml-5" key={i}>
            <Skeleton height="100%" width="100%" borderRadius="0.5rem" key={i}/>
        </div>
    ));
}

export default MediaSkeleton;