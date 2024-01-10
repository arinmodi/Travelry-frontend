import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DiarySkeleton = ({ amount }) => {

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
   
    const loadDiary = Array(amount).fill(1);

    return loadDiary.map((_, i) => (
        <div className="h-diary-md w-full md:w-diary md:h-diary relative rounded-md overflow-hidden" key={i} style={{ marginLeft : isMobile ? "0rem" : "2rem", marginTop : isMobile ? "1rem" : "0rem" }}>
            <Skeleton height="100%" width="100%" borderRadius="0.5rem" key={i}/>
        </div>
    ));
}

export default DiarySkeleton;