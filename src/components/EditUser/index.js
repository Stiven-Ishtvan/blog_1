import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import "./index.css";

export const EditUser = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");
  const api=useApi()
  const handleChange = () => {
    api
      .editUser({
        name,
        about,
      })
      .then((data) => {
        setUserInfo(data);
        navigate("/");
      })
      .catch((err) => alert(err));
    api
      .editUserAvatar({
        avatar,
      })
      .then((data) => {
        setUserInfo(data);
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    api.getUserInfo().then((data) => {
      setName(data.name);
      setAbout(data.about);
      setAvatar(data.avatar);
    });
  }, []);

  return (
    <div className="userpage">
      <div className="buttons">
        
      </div>
      <div className="usercard">
        <div className="username">Изменить данные пользователя</div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div className="desc">Имя: </div>
          <input
            name="name"
            placeholder="Имя"
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div className="desc">Фото: </div>
          <input
            name="image"
            className="imagesrc"
            placeholder="Ссылка на картинку"
            value={avatar}
            onChange={({ target }) => {
              setAvatar(target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div className="desc">Почта: </div>
          {userInfo?.email}
        </div>
        <div>
          <img style={{ maxWidth: 600 }} src={avatar} />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div className="desc">Должность:</div>{" "}
          <input
            name="image"
            placeholder="Введите описание"
            value={about}
            onChange={({ target }) => {
              setAbout(target.value);
            }}
          />
        </div>
        
        <button
          onClick={() => {
            handleChange();
            navigate("/");
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
