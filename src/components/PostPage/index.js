import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";
import dayjs from "dayjs";
import "./index.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import PostContext from "../Contexts/postContext";
import UserContext from "../Contexts/userContext";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";


export const PostPage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  
  const navigateToEditPage = () => {
    navigate(`edit`)
  }

  useEffect(() => {
    api
      .getPosts(params.postID)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => alert(err));
  }, []);

  
  
  useEffect(() => {
    api
      .getComments(params.postID)
      .then((data) => setComments(data))
      .catch((err) => alert(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      target: { new_comment },
    } = event;
    api
      .addComment(
        {
          text: new_comment.value,
        },
        params.postID
      )
      .then((data) => api.getComments(params.postID))
      .then((data) => {setComments(data);event.target.new_comment.value=''})
      .catch((err) => alert("Вы ничего не написали"));
  };

  const deleteComment = (commentID) => {
    api
      .deleteComment(params.postID, commentID)
      .then((res) => {
        setComments((prevState) => {
          return prevState.filter((item) => item._id !== commentID);
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="page">
      <div className="post">
        <h1>{post?.title}</h1>
        <p className="date">
          {dayjs(post?.created_at).format("DD.MM.YYYY, HH:mm:ss")}
        </p>
        <div className="author">{post?.author.name}</div>
        <img  class="wrapper" src={post?.image} />
        <p>{post?.text}</p>
        <div>
          {userInfo._id == post?.author._id && (
            <IconButton onClick={navigateToEditPage}>
              <EditIcon />
            </IconButton>
          )}
        </div>  
      </div>
      <div className="comments">
        {comments?.map((el) => (
          <div key={el._id}>
            <div style={{ display: "flex" }}>
              <img className="avatar" src={`${el.author.avatar}`} />
              <div>
                <div className="author">{el.author.name}</div>
                <div className="date">
                  {dayjs(el.created_at).format("DD.MM.YYYY, HH:mm:ss")}
                </div>
              </div>  
            </div>
            <p> {el.text}</p>
            <hr />
            {comments?.map((el) => (
            <div key={el._id}>
              {userInfo._id == el.author._id && (
                <IconButton onClick={() => deleteComment(el._id)}>
                <DeleteOutlinedIcon sx={{ fontSize: 28
                }} />
                </IconButton>
              )}
              </div>
            ))}
          </div>
        ))}
        <div>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="new_comment"
              placeholder="Напишите что-нибудь"
            />
            <button>Ответить</button>
          </form>
        </div>
        
                
      </div>
    </div>
  );
};
