import Header from 'components/Header';
import React, { useState } from 'react';
import "./AddMember.css";
import Member from 'components/Diary/Member';
import MemberSkeleton from 'components/loading/MemberSkeleton';
import NoData from 'components/noData';
import styles from "./UploadImage.module.css";

const AddMember = ({ close, isMembersLoading, members, addMember, isMobile }) => {

    const [email, setEmail] = useState("");

    return (
        <>
            <div className="main-container">
                <div className="container" style={{ width:isMobile ? "100%" : "40vw" }}>
                    <Header />

                    <div className="flex justify-between">
                        <p className={styles.title}>Add Member</p>
                        <div className={styles.close} onClick={close}>
                            CLOSE
                        </div>
                    </div>

                    <div className='input-container' style={{ flexDirection: isMobile?"column":'row' }}>
                        <input
                            type='email'
                            className='email-input' 
                            placeholder='enter email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            style={{ width: isMobile?"100%":"22.5rem" }}
                        />

                        <div className='add-button' onClick={() => addMember(email)} style={{ width : isMobile ? "fit-content" : undefined, marginLeft : isMobile ? "0rem" : "1rem", marginTop : isMobile ? '1rem' : "0rem" }}>
                            Add
                        </div>
                    </div>

                    <p className='inner-title'>Members</p>

                    {!isMembersLoading ? (
                        <>
                            {members.map((item, key) => (
                                <Member 
                                    url={item.profilePhoto}
                                    name={item.userName}
                                />
                            ))}

                            {members.length === 0 && (
                                <NoData message="No Members Found" />
                            )}
                        </>
                    ):(
                        <div>
                            <MemberSkeleton />
                            <MemberSkeleton />
                            <MemberSkeleton />
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default AddMember;