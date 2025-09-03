import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { Footer } from "./Footer.jsx";

export const Navigation = () => {
  const style = ({isActive}) => ({
    fontWeight: isActive ? "bold" : "normal"
  })
  
  return (
    <>
<header>
  <h1>React Router (Y2K's version)</h1>
  <nav>
    <NavLink  to="/" style={style} >Home</NavLink> {" | "}
    <NavLink to="/create" style={style}  >Créer un article</NavLink>
  </nav>
  </header>

  <main>
    <Outlet />
  </main>
  <Footer/>
</>
)
};