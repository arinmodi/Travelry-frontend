import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_API_URL } from "utils/constants";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
    borderRadius:5,
};

const VerificationRequestModal = ({ open, handleClose, email }) => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [isSent, sentIsSent] = useState(false);

    useEffect(() => {
        setTitle("Email Verification Needed!");
        setMessage("We will send verification link to your registered email");
        sentIsSent(false);
    }, []);

    const sendEmailVerification = async () => {
        const data = {
            email : email
        }

        try {
            const response = await axios.post(BASE_API_URL+"/auth/email/sendVerification", data);
            if (response.status === 200) {
                setTitle("Email Sent!");
                setMessage("Click on the verification link, sent over your email")
                sentIsSent(true)
            }
        }catch(error) {
            console.log(error);
            toast("something bad happen!")
        }
    }
    
    return(
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <div className="flex flex-col items-center">
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ marginBottom: "20px" }}
                        className="font-bold"
                    >
                        {title}
                    </Typography>

                    <p>{message}</p>

                    {!isSent ? (
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ margin: "20px" }}
                            className="w-diary"
                            onClick={sendEmailVerification}
                        >Send Email</Button>
                    ):(
                        <img
                            style={{
                                width : "10rem",
                                marginTop : "5rem",
                            }}
                            src={require("../../../assets/emailSent.png")} 
                        />
                    )}
                </div>

            </Box>
        </Modal>
    );
}

export default VerificationRequestModal;