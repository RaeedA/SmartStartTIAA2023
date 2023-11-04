import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";

// Navbar element, top thingy
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/example" activeStyle>
                        Example
                    </NavLink>
                    <NavLink to="/game" activeStyle>
                        Game Page
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;
