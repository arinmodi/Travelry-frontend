import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLogin } from 'state/authSlice';
import { BASE_API_URL } from 'utils/constants';

const VerifyEmailPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [color, setColor] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [res, setRes] = useState({});

    const queryParameters = new URLSearchParams(window.location.search)
    const token = queryParameters.get("token");

    const verifyToken = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(BASE_API_URL + "/auth/verify/" + token);
            if (response.status === 200) {
                setMessage("Email Successfully Verified!")
                setIsVerified(true);
                setColor("green");
                setRes(response);
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
        setIsLoading(false);
    }

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="h-screen pl-10 pr-10 pt-5 bg-[white]">
            <Header />

            {isLoading ? (
                <div className='flex flex-col items-center mt-10'>
                    <CircularProgress color='primary' />
                </div>
            ) : (
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
                        onClick={() => {
                            if (isVerified) {
                                localStorage.setItem("token", res.data.token);
                                dispatch(
                                    setLogin({
                                        user : res.data.user,
                                        token : res.data.token,
                                    })
                                );
                            } else {
                                navigate("/");
                            }
                        }}
                    >{isVerified ? "continue" : "Resend Email"}</Button>

                </div>
            )}
        </div>
    )
}

export default VerifyEmailPage;