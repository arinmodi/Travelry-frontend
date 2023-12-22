import { Button } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_API_URL } from "utils/constants";
import { checkEmail, checkPassword, checkUserName } from "utils/helpers";

const RegisterPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [UserName, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
            const data = {
                email : email,
                password : password, 
                username : UserName
            }

            try {
                const response = await axios.post(BASE_API_URL + "/auth/signup", data);
                console.log(response)
            } catch (error) {
                console.log(error)
                toast(error.response.data.message)
            }
        }
    }

    return(
        <div className="p-5">

            <Header />

            <div className="flex flex-col md:flex-row">

                <div className="md:flex-1 h-screeen flex items-center justify-center">
                    <div>
                        <h2 className="font-bold text-black text-center">Create Account</h2>
                        <h2 className="mt-2 text-center">Get Started with Travelry</h2>

                        <input 
                            type="text"
                            placeholder="Email"
                            className="mt-5 p-2 text-sm border rounded-md w-input"
                            onChange={ e => setEmail(e.target.value)}
                        />
                        <br/>
                        <input 
                            type="text"
                            placeholder="UserName"
                            className="mt-5 p-2 text-sm border rounded-md w-input"
                            onChange={ e => setUserName(e.target.value)}
                        />
                        <br/>
                        <input 
                            type="password"
                            placeholder="Password"
                            className="mt-5 p-2 text-sm border rounded-md w-input"
                            onChange={ e => setPassword(e.target.value)}
                        />
                        <br/>
                        <input 
                            type="password"
                            placeholder="Confirm Password"
                            className="mt-5 p-2 text-sm border rounded-md w-input"
                            onChange={ e => setConfirmPassword(e.target.value)}
                        />
                        <br/>
                        <Button 
                            variant="contained"
                            sx={{ marginTop : "30px" }}
                            onClick={handleSubmit}
                            className="w-input"
                        >
                            Register Now
                        </Button>
                        <p className="mt-4">Already Have Travelry Account ? <a className="text-[color:blue]" href="">Login Here</a></p>
                    </div>
                </div>

                                
                <div className="md:flex-1 h-screen flex items-center justify-center">
                    <img
                        src={require("../assets/registerPageillu.png")}
                        alt="Your Image"
                        className="max-w-full max-h-full"
                    />
                </div>

            </div>
        </div>
    );
}

export default RegisterPage;