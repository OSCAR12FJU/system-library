import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Sidebar from './sideBar';
import CardBooks from './forms/components/card-books';
import { Link } from 'react-router-dom';

function Dashboard() {

    const [style, setStyle] = useState("navbar-nav  sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav  sidebar sidebar-dark accordion") {
            setStyle("navbar-nav  sidebar sidebar-dark accordion toggled");
        }
        else {
            setStyle("navbar-nav  sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style == "navbar-nav  sidebar sidebar-dark accordion") {
            setStyle("navbar-nav  sidebar sidebar-dark accordion toggled1");
        }
        else {
            setStyle("navbar-nav  sidebar sidebar-dark accordion")
        }
    };


    const [search, setSearch] = useState("")
    const [books, setBooks] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/get-books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error al solicitar la información', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const filterData = books.filter((book) => 
        book.name.toLowerCase().includes(search.toLowerCase()) 
    )
   
    const searcher = (e) =>{
        setSearch(e.target.value)
        console.log(e.target.value)
    }
    console.log('books:', books);
    console.log('search:', search);



    return (
        <div>
            <body id="page-top">
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                {/*  <!-- Sidebar Toggle (Topbar) --> */}
                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
                                    <i className="fa fa-bars"></i>
                                </button>

                                {/*  <!-- Buscador en la barra de navegación. --> */}
                                <form
                                    className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control bg-light border-0 small" placeholder="Buscar libro..."
                                            aria-label="Search" aria-describedby="basic-addon2" value={search} onChange={searcher} />
                                    </div>
                                </form>
                                {/*  <!-- Topbar Navbar --> */}
                                <ul className="navbar-nav ml-auto">

                                    {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                                    <li className="nav-item dropdown no-arrow d-sm-none">
                                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-search fa-fw"></i>
                                        </a>
                                        {/*   <!-- Dropdown - Messages --> */}
                                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                            aria-labelledby="searchDropdown">
                                            <form className="form-inline mr-auto w-100 navbar-search">
                                                <div className="input-group">
                                                    <input type="text" className="form-control bg-light border-0 small"
                                                        placeholder="Buscar libro..." aria-label="Search"
                                                        aria-describedby="basic-addon2" value={search} onChange={searcher}/>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary" type="button">
                                                            <i className="fas fa-search fa-sm"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </li>


                                    <div className="topbar-divider d-none d-sm-block"></div>
                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Oscar Flores</span>
                                            <img className="img-profile rounded-circle"
                                                src="img/undraw_profile.svg" />
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                            aria-labelledby="userDropdown">
                                            <a className="dropdown-item" href="#">
                                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Profile
                                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Logout
                                            </a>
                                        </div>
                                    </li>

                                </ul>

                            </nav>
                           
                            {/* <!--Aca vamos a colocar los libros.--> */}

                            <div className="container-fluid">

                                {/*  <!-- Page Heading --> */}
                                <div className="d-sm-flex align-items-center justify-content-between mt-4 mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                </div>

                                {/*  <!-- Content Row --> */}
                                <div className="row">
                                    {filterData.map((book)=>(
                                        <CardBooks 
                                        key={book.book_id}
                                        name={book.name}
                                        author={book.author}    
                                        image={book.image}
                                        />                                        
                                    ))}
                         
                                </div>


                            </div>


                        </div>

                        { /* <!-- Footer --> */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Proyect Oscar-Flores 2024
                                    </span>
                                </div>
                            </div>
                        </footer>
                        {/* <!-- End of Footer --> */}

                    </div>
                    {/*  <!-- End of Content Wrapper --> */}

                </div>
                {/*  <!-- End of Page Wrapper -->

                                <!-- Boton de Scroll--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

                {/*  <!-- Logout Modal--> */}
                <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>

                </div>
            </body>
        </div>
    )
}

export default Dashboard;

