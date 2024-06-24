import React from "react";

function CardBooks({book_id,name,author, image}){


    return(
        <>
            {/*  <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-sm-4 col-md-6 mb-4" style={{cursor:'pointer'}}>
            <div classname="card wd-18 ">
            <img src={image} class="card-img-top" alt={name} />
            <div className="card-body">
                <h3 className="h5 mt-2 mb-0">{name}</h3>
                <h4 className="h6 mt-2 mb-0">{author}</h4>   
            </div>
            </div>
            </div>
        </>

    )

}
export default CardBooks;