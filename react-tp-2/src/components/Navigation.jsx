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
  <h1>React Router</h1>
  <nav>
    <NavLink  to="/" style={style} >Home</NavLink> {" | "}
    <NavLink to="/create" style={style}  >Créer un article</NavLink>
  </nav>
  </header>

  <main style={{border: "1px solid black", padding: "5rem 0", textAlign:"center"}}>
    <Outlet />
  </main>
  <Footer/>
</>
)
};