import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import "./style.css";

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    api
      .getUsers(params.userID)
      .then((data) => {
        setIsLoaded(true);
        setUserInfo(data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="userpage">
      
     
      {(!isLoaded) ? (
    <div className="load">Загрузка...</div>
  ) : (
      <div className="usercard">
        <div className="username">{userInfo?.name}</div>
        <div>
          <img style={{ maxWidth: 600 }} src={userInfo?.avatar} />
        </div>
        <div style={{ display: "flex" }}>
          <div className="desc">Род деятельности:</div> {userInfo?.about}
        </div>
        <div style={{ display: "flex" }}>
          <div className="desc">E-mail: </div>
          {userInfo?.email}
        </div>
      </div>)}
    </div>
  );
};
