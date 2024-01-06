import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ActivitySkeleton = ({ amount }) => {
   
    const loadActivity = Array(amount).fill(1);

    return loadActivity.map((_, i) => (
        <div className='flex bg-[white] p-2 flex-row items-center rounded-sm' style={{ marginTop:"1rem", borderRadius:"0.5rem" }} key={i}>
            
            <div style={{ flex : 1, display:"flex", alignItems:"center" }}>
                <Skeleton circle height="4vh" width="4vh" />
                <Skeleton height="3vh" width="5vw" style={{ marginLeft:"1vw" }}/>
            </div>

            <div style={{ flex:2 }}>
                <Skeleton height="100%" width="90%" />
            </div>

            <div style={{ flex : 1 }}>
                <Skeleton height="100%" width="40%" />
            </div>

        </div>
    ));
}

export default ActivitySkeleton;