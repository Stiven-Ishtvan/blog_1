import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Logo from '../Logo';


export const Header = ({ userInfo }) => {
  const navigate=useNavigate()
  
  return (
    
    
    <div className="header">
      <Logo/>
      
      <div className="">
        <h2></h2>
      </div>
      <nav>
      <div className="links">
        <button onClick={()=>navigate('/')}>Главная</button>
        <button  className='createButton' onClick={()=>{navigate('create')}}>Создать пост</button>
        
      </div>
      </nav>

      <div style={{ lineHeight: "0%", cursor:'pointer'}}>
        <p style={{ color: "black", fontWeight: "600", fontSize:'18px'}}>{userInfo.name}</p>
        <p style={{color:'white'}}>{userInfo.email}</p>
        <p>{userInfo.about}</p>
      </div>
    </div>
  );
};
