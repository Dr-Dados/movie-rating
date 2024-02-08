import React, { useState } from "react";


const Navbar = ({ children }) => {
  return (
    <div>
      <nav className="nav-bar">
        {children}
      </nav>
    </div>
  );
};

export default Navbar;
