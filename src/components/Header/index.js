import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import { ReactComponent as CloseSearch } from '../../closeInput.svg';



export const Header = ({
  userInfo,
  token,
  setUserInfo,
  handleChange
}) => {

  const [searchText, setSearchText] = useState('')

  const handleClick = () => {
    setSearchText('')
  }

  useEffect(() => {
    handleChange(searchText)

  }, [searchText])

  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className="header">
      <div className="logo">
        <h1 onClick={() => navigate("/")}>Блог</h1>
      </div>
      {token && (
        <div className="search">
          <TextField
            variant="outlined"
            size="small"
            sx={{ minWidth: 250 }}
            value={searchText}
            placeholder="Поиск"
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        <button className="search__btn">{searchText && <CloseSearch onClick={handleClick} />}</button>
        
        <button className='createButton' onClick={()=>navigate('/')}>Главная</button>
        <button className='createButton' onClick={()=>{navigate('create')}}>Создать пост</button>
        
      
      
        </div>
      )}


      {token && (
        <div style={{ width: "400px" }}>
          <div className="user" onClick={() => navigate(`user/edit`)}>
            <img src={userInfo.avatar} />
            <div className="userInfo">
              <div
                style={{ color: "black", fontWeight: "400", fontSize: "18px" }}
              >
                {userInfo.name}
              </div>
              <div style={{ color: "black" }}>{userInfo.email}</div>
            </div>
          </div>
        </div>
      )}
      <div>
        <div style={{ display: "flex" }}>

          {token && (
            <button className='createButton'
              onClick={() => {
                localStorage.removeItem("token");
                setUserInfo([]);
              }}
            >
              Выход
            </button>
          )}
         
        </div>
      </div>
    </div>
  );
};