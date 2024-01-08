import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import "./LoggedInHeader.css";
import FilterItem from "./FilterItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { MdOutlineMenu } from "react-icons/md";

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

   const [anchorElNav, setAnchorElNav] = React.useState(null);
   const [anchorElUser, setAnchorElUser] = React.useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   const pages = ["Products", "Pricing", "Blog"];
   const settings = ["Profile", "Account", "Dashboard", "Logout"];

   return (
      // <div className={isHeaderColor ? "bg-gradient-to-r from-from to-to pl-10 pr-10 pt-3 pb-3" : "mt-5"}>
      //     <div className="flex flex-row justify-between">
      //         <div className="items-center flex flex-row">
      //             <img
      //                 src={require("../assets/logo.png")}
      //                 height="30rem"
      //                 width="30rem"
      //                 style={{ borderRadius : "30rem", border : "1px solid black" }}
      //                 alt="logo"
      //             />
      //             {isHeaderColor ? (
      //                 <p className="ml-5 text-[white] font-bold">Travelry : Journey Journals, Shared Stories</p>
      //             ) : (
      //                 <p className="ml-5 text-[color:#3A60F7] font-bold">Travelry</p>
      //             )}
      //         </div>

      //         <div className="flex flex-row items-center">
      //             {filter && (
      //                 <div className="filter-container" onClick={() => {
      //                     setIsFilterModal(!isFilterModal);
      //                 }}>
      //                     <IoFilterSharp className="text-[black] h-full"/>
      //                 </div>
      //             )}

      //             {isFilterModal && (
      //                 <div className="filter-modal">
      //                     <p className="filter-title">Sort By:</p>

      //                     {filters.map((item) => (
      //                         <FilterItem
      //                             checked={item.id === checked}
      //                             name={item.name}
      //                             setChecked={() => setChecked(item.id)}
      //                         />
      //                     ))}

      //                     <Button
      //                         variant="contained"
      //                         sx={{ marginTop:"1rem" }}
      //                         onClick={applyClicked}
      //                     >
      //                         APPLY
      //                     </Button>
      //                 </div>
      //             )}

      //             {isSearchBar && (
      //                 <input
      //                     type="text"
      //                     placeholder="Search ..."
      //                     className="p-2 text-sm border rounded-md w-small-input"
      //                     value={searchText}
      //                     onChange={(event) => setSearchText(event.target.value)}
      //                 />
      //             )}

      //             {!isSearch ? (
      //                 <FaSearch className="text-[white] h-full ml-5 bg-[#3A60F7] w-small-con pl-2 pr-2 border rounded-md hover:cursor-pointer" onClick={onSearch}/>
      //             ):(
      //                 <IoMdClose className="text-[white] h-full ml-5 bg-[#FE0800] w-small-con pl-2 pr-2 border rounded-md hover:cursor-pointer" onClick={onSearchCancel}/>
      //             )}

      //             {isUserProfile && (
      //                 profilePhoto != null ? (
      //                     <img
      //                         src={profilePhoto}
      //                         className="profile-photo-home"
      //                         style={{ objectFit:"cover" }}
      //                         alt="profile"
      //                         onClick={() => { navigate("/profile") }}
      //                     />
      //                 ):(
      //                     <div className="profile-photo-home" onClick={() => { navigate("/profile") }} style={{ backgroundColor : "#3A60F7", display : "flex", justifyContent:"center", alignItems:"center" }}>
      //                         <p className="profile-photo-text">{userName[0]}</p>
      //                     </div>
      //                 )
      //             )}
      //         </div>
      //     </div>
      // </div>
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
               <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                     mr: 2,
                     display: { xs: "none", md: "flex" },
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}
               >
                  LOGO
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: "block", md: "none" },
                     }}
                  >
                     {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                           <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                     mr: 2,
                     display: { xs: "flex", md: "none" },
                     flexGrow: 1,
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}
               >
                  LOGO
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                     <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                     >
                        {page}
                     </Button>
                  ))}
               </Box>

               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                           alt="Remy Sharp"
                           src="/static/images/avatar/2.jpg"
                        />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: "45px" }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                           <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};

export default LoggedInHeader;
