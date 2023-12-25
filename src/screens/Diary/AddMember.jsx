import Header from 'components/Header';
import React from 'react';
import "./AddMember.css";
import Member from 'components/Diary/Member';

const AddMember = ({ close }) => {
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
                        />

                        <div className='add-button'>
                            Add
                        </div>
                    </div>

                    <p className='inner-title'>Members</p>

                    <Member 
                        url={"https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"}
                        name={"Arin Modi"}
                    />

                    <Member 
                        url={"https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"}
                        name={"Devarsh Mavani"}
                    />

                    <Member 
                        url={"https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"}
                        name={"Aster Andrew"}
                    />
                </div>
            </div>
        </>
    )
}

export default AddMember;