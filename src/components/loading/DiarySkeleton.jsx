import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DiarySkeleton = ({ amount }) => {
   
    const loadDiary = Array(amount).fill(1);

    return loadDiary.map((_, i) => (
        <div className="w-diary h-diary relative rounded-md overflow-hidden ml-10" key={i}>
            <Skeleton height="100%" width="100%" borderRadius="0.5rem" key={i}/>
        </div>
    ));
}

export default DiarySkeleton;