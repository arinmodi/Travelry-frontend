import { Button } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import LoadingModel from "components/modal/LoadingModal";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { BASE_API_URL } from "utils/constants";
import { checkEmail, checkPassword, checkUserName } from "utils/helpers";
import styles from "./LoginPage.module.css";

const RegisterPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [UserName, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!checkEmail(email)) {
            toast("Enter valid email");
        } else if (!checkUserName(UserName)) {
            toast("Enter valid username, numbers not allowed");
        }else if (!checkPassword(password)) {
            toast("at least 6 length, 1 Uppercase, 1 lowercase, 1 special character and 1 number required");
        } else if (confirmPassword !== password) {
            toast("Confirm Password and Password not matching");
        } else {
            setIsLoading(true);
            const data = {
                email : email,
                password : password, 
                username : UserName
            }

            try {
                await axios.post(BASE_API_URL + "/auth/signup", data);
                setIsLoading(false);
                toast("Registred Successfully...")
                navigate("/");
            } catch (error) {
                setIsLoading(false);
                console.log(error)
                toast(error.response.data.message)
            }
        }
    }

    return(
        <div className="p-5">

            <Header />

            <div className="flex flex-col-reverse md:flex-row">

                <div className={`md:flex-1 flex items-center justify-center ${styles.customMargin}`}>
                    <div style={{ maxWidth:"400px" }}>
                        <h2 className="font-bold text-black text-center">Create Account</h2>
                        <h2 className="mt-2 text-center">Get Started with Travelry</h2>

                        <input 
                            type="text"
                            placeholder="Email"
                            className="mt-5 p-2 text-sm border rounded-md w-full"
                            onChange={ e => setEmail(e.target.value)}
                        />
                        <br/>
                        <input 
                            type="text"
                            placeholder="UserName"
                            className="mt-3 p-2 text-sm border rounded-md w-full"
                            onChange={ e => setUserName(e.target.value)}
                        />
                        <br/>
                        <input 
                            type="password"
                            placeholder="Password"
                            className="mt-3 p-2 text-sm border rounded-md w-full"
                            onChange={ e => setPassword(e.target.value)}
                        />
                        <br/>
                        <input 
                            type="password"
                            placeholder="Confirm Password"
                            className="mt-3 p-2 text-sm border rounded-md w-full"
                            onChange={ e => setConfirmPassword(e.target.value)}
                        />
                        <br/>
                        <Button 
                            variant="contained"
                            sx={{ marginTop : "30px" }}
                            onClick={handleSubmit}
                            className="w-full"
                        >
                            Register Now
                        </Button>
                        <p className="mt-4">Already Have Travelry Account ? <a className="text-[color:blue]" href="/">Login Here</a></p>
                    </div>
                </div>

                                
                <div className="md:flex-1 flex items-center justify-center">
                    <img
                        src={require("../assets/registerPageillu.png")}
                        alt="Your Image"
                        style={{ objectFit:"contain", height:"35rem", width:"50rem" }}
                    />
                </div>

                {isLoading && (
                    <LoadingModel 
                        open={isLoading}
                        message="saving"
                    />
                )}

            </div>
        </div>
    );
}

export default RegisterPage;