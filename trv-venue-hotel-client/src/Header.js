import React,{useEffect,useState} from 'react';


function Header()
{

    return (
        <div className="navbar navbar-inverse">
           <div className="applicationname">
           <img  style={{marginTop:'4px'}}  src="/trivago.svg"></img>
           </div>
            <ul className="">
              <li><img className="image" src="/user.svg"></img> 
              <span style={{marginTop:'0px',position:'absolute',marginLeft:'5px'}}>Jon Doe</span></li>
            </ul>
        </div>
    );
}

export default Header;