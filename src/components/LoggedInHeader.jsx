import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import "./LoggedInHeader.css";
import FilterItem from "./FilterItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { MdOutlineMenu } from "react-icons/md";
import { MdCancel } from "react-icons/md";

const LoggedInHeader = ({
   filter = false,
   isFilterModal = false,
   setIsFilterModal,
   isUserProfile = false,
   isHeaderColor = false,
   onSortApplied,
   onSearch,
   onSearchCancel,
   searchText,
   setSearchText,
   isSearch,
   isSearchBar = true,
}) => {
   const { userName, profilePhoto } = useSelector((state) => state.user);
   const navigate = useNavigate();
   const [checked, setChecked] = useState(0);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 750);
   const [isMenuVisible, setIsMenuVisible] = useState(false);

   const [filters, setFilters] = useState([
      { id: 0, name: "Latest" },
      { id: 1, name: "Oldest" },
   ]);

   const applyClicked = () => {
      if (filters[0].id === checked) {
         onSortApplied(-1);
      } else if (filters[1].id === checked) {
         onSortApplied(1);
      }
   };

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 750);
      };

      window.addEventListener("resize", handleResize);

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   return (
      <div
         className={
            isHeaderColor
               ? "bg-gradient-to-r from-from to-to pl-10 pr-10 pt-3 pb-3"
               : "mt-5"
         }
      >
         <div className="flex flex-row justify-between">
            <div className="items-center flex flex-row">
               <img
                  src={require("../assets/logo.png")}
                  height="30rem"
                  width="30rem"
                  style={{ borderRadius: "30rem", border: "1px solid black" }}
                  alt="logo"
               />
               {isHeaderColor ? (
                  <p
                     className="ml-5 text-[white] font-bold"
                     style={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
                  >
                     Travelry : Journey Journals
                  </p>
               ) : (
                  <p className="ml-5 text-[color:#3A60F7] font-bold">
                     Travelry
                  </p>
               )}
            </div>

            {!isMobile ? (
               <div className="flex flex-row items-center">
                  {filter && (
                     <div
                        className="filter-container"
                        onClick={() => {
                           setIsFilterModal(!isFilterModal);
                        }}
                     >
                        <IoFilterSharp className="text-[black] h-full" />
                     </div>
                  )}

                  {isFilterModal && (
                     <div className="filter-modal">
                        <p className="filter-title">Sort By:</p>

                        {filters.map((item) => (
                           <FilterItem
                              checked={item.id === checked}
                              name={item.name}
                              setChecked={() => setChecked(item.id)}
                           />
                        ))}

                        <Button
                           variant="contained"
                           sx={{ marginTop: "1rem" }}
                           onClick={applyClicked}
                        >
                           APPLY
                        </Button>
                     </div>
                  )}

                  {isSearchBar && (
                     <>
                        <input
                           type="text"
                           placeholder="Search ..."
                           className="p-2 text-sm border rounded-md w-small-input"
                           value={searchText}
                           onChange={(event) =>
                              setSearchText(event.target.value)
                           }
                        />

                        {!isSearch ? (
                           <FaSearch
                              className="text-[white] h-full ml-5 bg-[#3A60F7] w-small-con pl-2 pr-2 border rounded-md hover:cursor-pointer"
                              onClick={onSearch}
                           />
                        ) : (
                           <IoMdClose
                              className="text-[white] h-full ml-5 bg-[#FE0800] w-small-con pl-2 pr-2 border rounded-md hover:cursor-pointer"
                              onClick={onSearchCancel}
                           />
                        )}
                     </>
                  )}

                  {isUserProfile &&
                     (profilePhoto != null ? (
                        <img
                           src={profilePhoto}
                           className="profile-photo-home"
                           style={{ objectFit: "cover" }}
                           alt="profile"
                           onClick={() => {
                              navigate("/profile");
                           }}
                        />
                     ) : (
                        <div
                           className="profile-photo-home"
                           onClick={() => {
                              navigate("/profile");
                           }}
                           style={{
                              backgroundColor: "#3A60F7",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                           }}
                        >
                           <p className="profile-photo-text">{userName[0]}</p>
                        </div>
                     ))}
               </div>
            ) : (
               <MdOutlineMenu
                  className="menu-style"
                  onClick={() => setIsMenuVisible(true)}
               />
            )}
         </div>

         {isMobile && isMenuVisible && (
            <div
               className={`slide-out-div bg-gradient-to-l from-from to-to`}
            >
               <MdCancel
                  style={{
                     color: "white",
                     marginTop: "2rem",
                     marginLeft: "60%",
                     fontSize: "1.5rem",
                  }}
                  className="hover:cursor-pointer"
                  onClick={() => {
                     if (filter) {
                        setIsFilterModal(false);
                     }
                     setIsMenuVisible(false);
                  }}
               />

               <div
                  style={{
                     marginTop: "2rem",
                     display: "flex",
                     alignItems: "center",
                  }}
               >
                  {isUserProfile &&
                     (profilePhoto != null ? (
                        <img
                           src={profilePhoto}
                           className="profile-photo-home"
                           style={{ objectFit: "cover" }}
                           alt="profile"
                           onClick={() => {
                              navigate("/profile");
                           }}
                        />
                     ) : (
                        <div
                           className="profile-photo-home"
                           onClick={() => {
                              navigate("/profile");
                           }}
                           style={{
                              backgroundColor: "#3A60F7",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                           }}
                        >
                           <p className="profile-photo-text">{userName[0]}</p>
                        </div>
                     ))}
                  {isUserProfile && (
                     <p className="ml-5 text-[white] text-l font-bold">
                        {userName}
                     </p>
                  )}
               </div>

               <div style={{ width : "fit-content", display:"flex", alignItems:"center" }} className="ml-5">
                  {filter && <p className="text-[white] font-bold">Sort By : </p>}
                  {filter && (
                     <div
                        className="filter-container"
                        onClick={() => {
                           setIsFilterModal(!isFilterModal);
                        }}
                        style={{ marginLeft:"1rem" }}
                     >
                        <IoFilterSharp className="text-[black] h-full" />
                     </div>
                  )}

                  {isFilterModal && (
                     <div className="filter-modal" style={{ marginLeft:"-1rem" }}>
                        <p className="filter-title">Sort By:</p>

                        {filters.map((item) => (
                           <FilterItem
                              checked={item.id === checked}
                              name={item.name}
                              setChecked={() => setChecked(item.id)}
                           />
                        ))}

                        <Button
                           variant="contained"
                           sx={{ marginTop: "1rem" }}
                           onClick={applyClicked}
                        >
                           APPLY
                        </Button>
                     </div>
                  )}
               </div>

               <div>
                  {isSearchBar && (
                     <>
                        <input
                           type="text"
                           placeholder="Search ..."
                           className="p-2 text-sm border rounded-md ml-5 mt-4"
                           style={{ 
                              width:"60%"
                            }}
                           value={searchText}
                           onChange={(event) =>
                              setSearchText(event.target.value)
                           }
                        />

                        {!isSearch ? (
                           <div
                              style={{ width: "fit-content" }}
                              className="text-[white] h-full ml-5 bg-[#3A60F7] p-2 border rounded-md hover:cursor-pointer mt-4"
                              onClick={onSearch}
                           >
                              <p>Search</p>
                           </div>
                        ) : (
                           <div
                              style={{ width: "fit-content" }}
                              className="text-[white] h-full ml-5 bg-[red] p-2 border rounded-md hover:cursor-pointer mt-4"
                              onClick={onSearchCancel}
                           >
                              <p>Cancel</p>
                           </div>
                        )}
                     </>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default LoggedInHeader;
