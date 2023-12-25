import React from "react";

const Header = () => {
    return (
        <div className="items-center justify-center flex flex-row">
            <img
                src={require("../assets/logo.png")}
                height="30rem"
                width="30rem" 
                style={{ borderRadius : "30rem", border : "1px solid black" }}
                alt="logo"
            />
            <p className="ml-5 text-[color:#3A60F7]">Travelry</p>
        </div>
    )
}

export default Header;