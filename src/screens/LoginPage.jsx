import Header from "components/Header";
import React from "react";

const LoginPage = () => {
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
                        />
                        <br/>
                        <input 
                            type="password"
                            placeholder="Password"
                            className="mt-5 p-2 text-sm border rounded-md w-input"
                        />

                        <br/>
                        <button className="w-input mt-10 flex items-center justify-center p-2 bg-[#47CFEE] rounded-lg text-[color:black]">
                            Login Now
                        </button>
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

            </div>
        </div>
    );
}

export default LoginPage;