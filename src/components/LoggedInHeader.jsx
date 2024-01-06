import React, { useState } from "react";
import { FaSearch  } from 'react-icons/fa';
import { IoFilterSharp } from "react-icons/io5";
import "./LoggedInHeader.css";
import FilterItem from "./FilterItem";
import { useSelector } from "react-redux";

const LoggedInHeader = ({ filter=false, isFilterModal=false, setIsFilterModal, isUserProfile=false, isHome=false }) => {

    const { userName, profilePhoto } = useSelector((state) => state.user);

    const [filters, setFilters] = useState([
        { id : 0, name : "Title", checked : true },
        { id : 1, name : "Updated", checked : false },
        { id : 2, name : "Created", checked : false }
    ]);

    const setChecked = (id) => {
        const newFilters = [...filters];
        newFilters[id].checked = !newFilters[id].checked;
        setFilters(newFilters)
    }

    return (
        <div className={isHome ? "bg-gradient-to-r from-from to-to pl-10 pr-10 pt-3 pb-3" : "mt-5"}>
            <div className="flex flex-row justify-between">
                <div className="items-center flex flex-row">
                    <img
                        src={require("../assets/logo.png")}
                        height="30rem"
                        width="30rem"
                        style={{ borderRadius : "30rem", border : "1px solid black" }} 
                        alt="logo"
                    />
                    {isHome ? (
                        <p className="ml-5 text-[white] font-bold">Travelry : Journey Journals, Shared Stories</p>
                    ) : (
                        <p className="ml-5 text-[color:#3A60F7] font-bold">Travelry</p>
                    )}
                </div>

                <div className="flex flex-row items-center">
                    {filter && (
                        <div className="filter-container" onClick={() => {
                            setIsFilterModal(!isFilterModal);
                        }}>
                            <IoFilterSharp className="text-[black] h-full"/>
                        </div>
                    )}

                    
                    {isFilterModal && (
                        <div className="filter-modal">
                            <p className="filter-title">Filters:</p>

                            {filters.map((item) => (
                                <FilterItem 
                                    checked={item.checked}
                                    name={item.name}
                                    setChecked={() => setChecked(item.id)}
                                />
                            ))}
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="Search ..."
                        className="p-2 text-sm border rounded-md w-small-input"
                    />

                    <FaSearch className="text-[white] h-full ml-5 bg-[#3A60F7] w-small-con pl-2 pr-2 border rounded-md hover:cursor-pointer" />

                    {isUserProfile && (
                        profilePhoto != null ? (
                            <img
                                src={profilePhoto}
                                className="profile-photo-home" 
                                style={{ objectFit:"cover" }}
                                alt="profile"
                            />
                        ):(
                            <div className="profile-photo-home" style={{ backgroundColor : "#3A60F7", display : "flex", justifyContent:"center", alignItems:"center" }}>
                                <p className="profile-photo-text">{userName[0]}</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoggedInHeader;