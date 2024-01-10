import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ActivitySkeleton = ({ amount }) => {
   
    const loadActivity = Array(amount).fill(1);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

    useEffect(() => {
        const handleResize = () => {
           setIsMobile(window.innerWidth < 750);
        };
  
        window.addEventListener("resize", handleResize);
  
        return () => {
           window.removeEventListener("resize", handleResize);
        };
    }, []);

    return loadActivity.map((_, i) => (
        <div className='flex flex-col bg-[white] p-2 md:flex-row md:items-center rounded-sm' style={{ marginTop:"1rem", borderRadius:"0.5rem" }} key={i}>
            
            <div style={{ flex : 1, display:"flex", alignItems:"center" }}>
                <Skeleton circle height="4vh" width="4vh" />
                <Skeleton height="3vh" style={{ marginLeft:"1vw", width:isMobile ? "15vw" : "5vw" }}/>
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