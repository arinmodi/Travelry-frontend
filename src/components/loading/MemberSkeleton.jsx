import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MemberSkeleton = ({ amount }) => {
   
    const loadMember = Array(amount).fill(1);

    return loadMember.map((_, i) => (
        <div className='member-container'>
            <Skeleton
                circle
                className='profile-image'
            />
                
            <Skeleton className='ml-5 text-sm font-bold' style={{ width : "5rem" }} />
        </div>
    ));
}

export default MemberSkeleton;