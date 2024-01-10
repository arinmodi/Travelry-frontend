import { Box, Button } from "@mui/material";
import React from "react";
import { MdOutlineMenu } from "react-icons/md";

const Buttons = ({
   uploadImageClick,
   addMemberClick,
   settingsClick,
   activityClick,
   isMobile,
   setIsMenuVisible
}) => {
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "row",
            padding: "1rem",
            justifyContent: "space-between",
         }}
      >
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
            }}
         >
            <img
               src={require("../../assets/logo.png")}
               height="30rem"
               width="30rem"
               style={{ borderRadius: "30rem", border: "1px solid black" }}
               alt="logo"
            />
            <p className="ml-3 text-[color:#3A60F7] font-bold">Travelry</p>
         </Box>

         {!isMobile ? (
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
               }}
            >
               <Button variant="contained" onClick={uploadImageClick}>
                  Upload Media
               </Button>

               <Button
                  variant="contained"
                  sx={{
                     marginLeft: "1rem",
                  }}
                  onClick={addMemberClick}
               >
                  Add Member
               </Button>

               <Button
                  variant="contained"
                  sx={{
                     marginLeft: "1rem",
                  }}
                  onClick={settingsClick}
               >
                  Settings
               </Button>

               <Button
                  variant="contained"
                  sx={{
                     marginLeft: "1rem",
                  }}
                  onClick={activityClick}
               >
                  Activities
               </Button>
            </Box>
         ):(
            <MdOutlineMenu
                style={{ color:"black", fontSize:"1.5rem", alignSelf:"center" }}
                onClick={() => setIsMenuVisible(true)}
            />
         )}
      </Box>
   );
};

export default Buttons;
