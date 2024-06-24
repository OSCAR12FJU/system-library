// import React from "react";

//  function Seccion(){
//     return(
//         <div className="row">

//         {/*  <!-- Earnings (Monthly) Card Example --> */}
//         <div className="col-xl-3 col-md-6 mb-4">
//             <div className="card border-left-primary shadow h-100 py-2">
//                 <div className="card-body">
//                     <div className="row no-gutters align-items-center">
//                         <div className="col mr-2">
//                             <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
//                                 Earnings (Monthly)</div>
//                             <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
//                         </div>
//                         <div className="col-auto">
//                             <i className="fas fa-calendar fa-2x text-gray-300"></i>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/*  <!-- Earnings (Monthly) Card Example --> */}
//         <div className="col-xl-3 col-md-6 mb-4">
//             <div className="card border-left-success shadow h-100 py-2">
//                 <div className="card-body">
//                     <div className="row no-gutters align-items-center">
//                         <div className="col mr-2">
//                             <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
//                                 Earnings (Annual)</div>
//                             <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
//                         </div>
//                         <div className="col-auto">
//                             <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/*  <!-- Earnings (Monthly) Card Example --> */}
//         <div className="col-xl-3 col-md-6 mb-4">
//             <div className="card border-left-info shadow h-100 py-2">
//                 <div className="card-body">
//                     <div className="row no-gutters align-items-center">
//                         <div className="col mr-2">
//                             <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
//                             </div>
//                             <div className="row no-gutters align-items-center">
//                                 <div className="col-auto">
//                                     <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
//                                 </div>
//                                 <div className="col">
//                                     <div className="progress progress-sm mr-2">
//                                         <div className="progress-bar bg-info a1" role="progressbar"
//                                         ></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-auto">
//                             <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/*  <!-- Pending Requests Card Example --> */}
//         <div className="col-xl-3 col-md-6 mb-4">
//             <div className="card border-left-warning shadow h-100 py-2">
//                 <div className="card-body">
//                     <div className="row no-gutters align-items-center">
//                         <div className="col mr-2">
//                             <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
//                                 Pending Requests</div>
//                             <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
//                         </div>
//                         <div className="col-auto">
//                             <i className="fas fa-comments fa-2x text-gray-300"></i>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     )
// }
// export default Seccion


///Logica de nav de filtrado y limitador.
    // const [filterProperty, setFilterProperty] = useState("");
    // const [limit, setLimit] = useState(10);
    
 // const handleFilterPropertyChange = (e) => {
    //     setFilterProperty(e.target.value);
    // };

    // const handleLimitChange = (e) => {
    //     setLimit(Number(e.target.value));
    // };

    // const filteredBooks = search 
    //     ? books.filter((book) =>
    //         book.toLowerCase().includes(search.toLowerCase())
    //       ) 
    //     : books;

    // const limitedBooks = filteredBooks.slice(0, limit);

    //Estructura
    //  {/*Sección de buscador pero filtrador */}
    //                         {/* <div className="table-filter custom-container"> */}

                            // <div className="table-filter text-center">
                            //     <div className="row">
                            //         <div className="col-sm-5 ">
                            //             <div className="filter-group">
                            //                 <label>Ubicación</label>
                            //                 <select className="form-control" id="location" onchange="load(1);">
                            //                     <option value="">Todos</option>
                            //                     <option value="Berlin">Berlin</option>
                            //                     <option value="London">London</option>
                            //                     <option value="Madrid">Madrid</option>
                            //                     <option value="New York">New York</option>
                            //                     <option value="Paris">Paris</option>
                            //                 </select>
                            //             </div>

                            //             <div className="filter-group">
                            //                 <label>Estado</label>
                            //                 <select className="form-control" id="status" onchange={#}>
                            //                     <option value="">Todos</option>
                            //                     <option value="Entregado">Entregado</option>
                            //                     <option value="Enviada">Enviada</option>
                            //                     <option value="Pendiente">Pendiente</option>
                            //                     <option value="Cancelado">Cancelado</option>
                            //                 </select>
                            //             </div>

                            //         </div>

                            //         <div className="col-sm-3 ps-5 text-right">
                            //             <div className="show-entries">
                            //                 <span>Mostrar</span>
                            //                 <select className="form-control" id="per_page" onchange={handleLimitChange}>
                            //                     <option>5</option>
                            //                     <option>10</option>
                            //                     <option selected="">15</option>
                            //                     <option>20</option>
                            //                 </select>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>
