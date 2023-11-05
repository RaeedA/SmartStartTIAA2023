import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";

// Navbar element, top thingy

const Navbar = () => {
    const navigate = useNavigate();

    const navigateTo = (route) => {
        navigate(route);
    };

    return (
        <>
            <Nav>
                <NavMenu>
                    <button 
                        onClick={() => navigateTo("/game")}
                        className="nav-button"> Start! </button>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;
