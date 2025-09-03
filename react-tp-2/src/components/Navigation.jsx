import React from 'react';
import { NavLink, Outlet } from "react-router-dom";

export const Navigation = () => {
  const style = ({isActive}) => ({
    fontWeight: isActive ? "bold" : "normal"
  })
  
  return (
<>
  <h1>React Router</h1>
  <nav>
    <NavLink  to="/" style={style} >Home</NavLink> {" | "}
    <NavLink to="/create" style={style}  >Créer un article</NavLink>
  </nav>

  <main style={{border: "1px solid black", padding: "5rem 0", textAlign:"center"}}>
    <Outlet />
  </main>
</>
)
};