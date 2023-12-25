import { Box, Button } from '@mui/material';
import React from 'react';

const Buttons = ({ uploadImageClick, addMemberClick, settingsClick }) => {
    return (
        <Box
            sx={{
                display:"flex",
                flexDirection:"row",
                padding : "1rem",
                justifyContent:"space-between"
            }}
        >
            <Box
                sx={{
                    display:"flex",
                    alignItems:"center"
                }}
            >
                <img
                    src={require("../../assets/logo.png")}
                    height="30rem"
                    width="30rem"
                    style={{ borderRadius : "30rem", border : "1px solid black" }}
                    alt='logo' 
                />
                <p className="ml-3 text-[color:#3A60F7] font-bold">Travelry</p>
            </Box>
            
            <Box
                sx={{ 
                    display:"flex",
                    alignItems:"center"              
                }}
            >
                <Button
                    variant="contained"
                    onClick={uploadImageClick}
                >Upload Media</Button>

                <Button
                    variant="contained"
                    sx={{
                        marginLeft:"1rem"
                    }}
                    onClick={addMemberClick}
                >Add Member</Button>

                <Button
                    variant="contained"
                    sx={{
                        marginLeft:"1rem"
                    }}
                    onClick={settingsClick}
                >Settings</Button>
            </Box>

        </Box>
    )
}

export default Buttons;