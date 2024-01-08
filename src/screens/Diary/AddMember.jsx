import Header from 'components/Header';
import React, { useState } from 'react';
import "./AddMember.css";
import Member from 'components/Diary/Member';
import MemberSkeleton from 'components/loading/MemberSkeleton';
import NoData from 'components/noData';

const AddMember = ({ close, isMembersLoading, members, addMember }) => {

    const [email, setEmail] = useState("");

    return (
        <>
            <div className="main-container">
                <div className="container">
                    <Header />

                    <div className="flex justify-between">
                        <p className="title">Add Member</p>
                        <div className="close" onClick={close}>
                            CLOSE
                        </div>
                    </div>

                    <div className='input-container'>
                        <input
                            type='email'
                            className='email-input' 
                            placeholder='enter email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <div className='add-button' onClick={() => addMember(email)}>
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