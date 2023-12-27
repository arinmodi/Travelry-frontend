import { Button } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import VerificationRequestModal from "components/modal/VerificationRequestModal";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_API_URL } from "utils/constants";
import { checkEmail, checkPassword } from "utils/helpers";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async () => {
        if (!checkEmail(email)) {
            toast("Enter valid email");
        } else if (!checkPassword(password)) {
            toast("at least 6 length, 1 Uppercase, 1 lowercase, 1 special character and 1 number required");
        } else {
            const data = {
                email : email,
                password : password           
            }

            try {
                const response = await axios.post(BASE_API_URL + "/auth/login", data);
                console.log(response)
                setShowModal(true)
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
                        <h2 className="font-bold text-black text-center">LOGIN</h2>
                        <h2 className="mt-2 text-center">how to get started with Travelry ?</h2>

                        <input 
                            type="text"
                            placeholder="Email"
                            className="mt-5 p-2 text-sm border rounded-md w-input"
                            onChange={ e => setEmail(e.target.value)}
                        />
                        <br/>
                        <input 
                            type="password"
                            placeholder="Password"
                            className="mt-3 p-2 text-sm border rounded-md w-input"
                            onChange={ e => setPassword(e.target.value)}
                        />

                        <br/>
                        <Button 
                            variant="contained"
                            sx={{ marginTop : "30px" }}
                            onClick={handleSubmit}
                            className="w-input"
                        >                            
                            Login Now
                        </Button>
                        <p className="mt-4">Don't Have Travelry Account ? <a className="text-[color:blue]" href="">Create Here</a></p>
                    </div>
                </div>

                <div className="md:flex-1 h-screen flex items-center justify-center">
                    <img
                        src={require("../assets/loginPageillu.png")}
                        alt="Your Image"
                        className="max-w-full max-h-full"
                    />
                </div>

                {showModal && (
                    <VerificationRequestModal open={true} email={email} handleClose={() => {
                        setShowModal(false)
                    }} />
                )}

            </div>
        </div>
    );
}

export default LoginPage;