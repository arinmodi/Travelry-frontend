import React from "react";
import { FaSearch  } from 'react-icons/fa';

const LoggedInHeader = () => {
    return (
        <div className="mt-5 flex flex-row justify-between">
            <div className="items-center flex flex-row">
                <img
                    src={require("../assets/logo.png")}
                    height="30rem"
                    width="30rem"
                    style={{ borderRadius : "30rem", border : "1px solid black" }} 
                />
                <p className="ml-5 text-[color:blue]">Travelry</p>
            </div>

            <div className="flex flex-row">
                <input
                    type="text"
                    placeholder="Search ..."
                    className="p-2 text-sm border rounded-md w-small-input"
                />

                <FaSearch className="text-[white] h-full ml-5 bg-[blue] w-small-con pl-2 pr-2 border rounded-md hover:cursor-pointer" />
            </div>
        </div>
    )
}

export default LoggedInHeader;