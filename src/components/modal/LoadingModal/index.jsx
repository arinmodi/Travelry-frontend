import { Box, CircularProgress, Modal } from '@mui/material';
import React from 'react';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 300,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
    borderRadius:5,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column"
};

const LoadingModel = ({ open, message="Loading" }) => {
    return (
        <Modal
            open={open}
        >
            <Box
                sx={style}
            >
                <CircularProgress 
                    color={"primary"}
                />

                <p
                    style={{ marginTop:"1rem", fontSize:"1rem", fontWeight:"bold" }}
                >{message}</p>

                <p
                    style={{ marginTop:"0.5rem", fontSize:"1rem", fontStyle:"italic" }}
                >please wait ...</p>
            </Box>
        </Modal>
    );
}

export default LoadingModel;