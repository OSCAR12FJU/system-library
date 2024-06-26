import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


function Sidebar(){

    const [style, setStyle] = useState("navbar-nav  sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style === "navbar-nav  sidebar sidebar-dark accordion") {
            setStyle("navbar-nav  sidebar sidebar-dark accordion toggled");
        }
        else {
            setStyle("navbar-nav  sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style === "navbar-nav  sidebar sidebar-dark accordion") {
            setStyle("navbar-nav  sidebar sidebar-dark accordion toggled1");
        }
        else {
            setStyle("navbar-nav  sidebar sidebar-dark accordion")
        }
    };

    return(
        <>
    <ul className={style} id="accordionSidebar">

                        {/*  <!-- Sidebar - Brand --> */}
                        <div className="sidebar-brand d-flex align-items-center justify-content-center">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-regular fa-book"></i>
                            </div>
                            <div className="sidebar-brand-text mx-2">BS System <sup>2.0</sup></div>
                            <div className="text-center d-none d-md-inline">
                                <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                            </div>
                            
                        </div>
                        {/* <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                            <div className="text-center d-none d-md-inline">
                                <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                            </div>
                        </a> */}

                        {/*   <!-- Divider --> */}
                        <hr className="sidebar-divider my-0" />

                        {/* <!-- Nav Item - Dashboard --> */}
                        <li className="nav-item active">
                            <Link to="http://localhost:3000/Inicio#" className="nav-link" style={{paddingBottom: 0}}>
                                <i className="fas fa-regular fa-house-user"></i> 
                                <span>Biblioteca</span>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="#" className="nav-link" style={{paddingBottom: 0}}>
                                <i className="fas fa-regular fa-folder-plus"></i>
                                <span>Añadir Libro</span>
                            </Link> 
                        </li>
                        <li className="nav-item active">
                            <Link to="#" className="nav-link" style={{paddingBottom: 0}}>
                                <i className="fas fa-regular fa-calendar-check"></i>
                                <span>Prestamos</span>
                            </Link>
                        </li>
                        
                        {/*  <!-- Divider --> */}
                        <hr className="sidebar-divider" />
                        <hr className="sidebar-divider" />
                        <hr className="sidebar-divider" />

                        <li className="nav-item active">
                            <Link to="#" className="nav-link" style={{paddingBottom: 0}}>
                                <i className="fas fa-regular fa-id-badge"></i> 
                                <span>Contactanos</span>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="#" className="nav-link" style={{paddingBottom: 0}}>
                                <i className="fas fa-regular fa-door-open"></i>  
                                <span>Salir</span>
                            </Link>
                        </li>
                    

                        {/* <!-- Divider --> */}
                        <hr className="sidebar-divider d-none d-md-block" />
                    </ul></>)
}
export default Sidebar