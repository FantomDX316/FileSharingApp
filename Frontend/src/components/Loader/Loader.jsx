import React from 'react';
import LoaderGif from "../../assets/images/Loader.gif";

const Loader = () => {
  return (
    <div className="loadgif col-md-12 d-flex justify-content-center align-items-center" style={{height:"60vh"}}>
      <div className="gif col-md-4 d-flex justify-content-center">
        <img src={LoaderGif} alt="Loading..." className='col-md-6' />
      </div>
    </div>
  )
}

export default Loader;
