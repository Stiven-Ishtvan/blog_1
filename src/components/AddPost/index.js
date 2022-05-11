import React from "react";
import api from "../../utils/api";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import "./index.css";

export const AddPost = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      target: { image, name, description },
    } = event;
    api
      .createPost({
        title: name.value,
        image: image.value,
        text: description.value,
      })
      .then((data) => navigate("/"))
      .catch((err) => alert("Заполните все поля"));
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h3>Введите ссылку на картинку:</h3>

        <TextField
          id="outlined-basic"
          variant="outlined"
          name="image"
          placeholder="Ссылка на картинку"
        />
        <h3>Добавте название поста:</h3>

        <TextField
          id="outlined-basic"
          variant="outlined"
          name="name"
          placeholder="Название поста"
        />
        <h3>Добавте текст поста:</h3>

        <TextField
          id="outlined-basic"
          variant="outlined"
          name="description"
          placeholder="Введите текст"
        />
        <button className="createButton">Отправить пост</button>
      </form>
    </div>
  );
};
