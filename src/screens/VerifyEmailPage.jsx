import { Button } from '@mui/material';
import axios from 'axios';
import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
import { BASE_API_URL } from 'utils/constants';

const VerifyEmailPage = () => {
    const [message, setMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [color, setColor] = useState();

    const queryParameters = new URLSearchParams(window.location.search)
    const token = queryParameters.get("token");

    const verifyToken = async () => {
        try {
            const response = await axios.get(BASE_API_URL + "/auth/verify/" + token);
            if (response.status === 200) {
                setMessage("Email Successfully Verified!")
                setIsVerified(true);
                setColor("green");
            }else {
                setMessage("Email Verification Failed!")
                setIsVerified(false);
                setColor("red");
            }
        } catch (error) {
            console.log(error)
            setMessage("Email Verification Failed!")
            setIsVerified(false);
            setColor("red");
        }
    }

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="h-screen pl-10 pr-10 pt-5 bg-[white]">
            <Header />

            <div className='flex flex-col items-center mt-10'>

                <h1 style={{ color : color, fontSize : "20px", fontWeight : 'bold' }}>{message}</h1>

                <img 
                    style={{
                        width : "15rem",
                        marginTop : "5rem",
                    }}
                    alt="image"
                    src={isVerified ? require("../assets/emailVerified.png") : require("../assets/emailFailed.png")} 
                />

                <Button
                    variant="contained"
                    component="label"
                    className="w-diary"
                    sx = {{ marginTop : "2rem" }}
                >{isVerified ? "continue" : "Resend Email"}</Button>

            </div>
        </div>
    )
}

export default VerifyEmailPage;