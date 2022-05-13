import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import dayjs from "dayjs";
import "./index.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import PostContext from "../Contexts/postContext";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import UserContext from "../Contexts/userContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
export const PostPage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const api = useApi();
  const deletePost = () => {
    api
      .deletePosts(params.postID)
      .then((res) => {
        setPosts((prevState) => {
          return prevState.filter((item) => item._id !== params.postID);
        });
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  const navigateToEditPage = () => {
    navigate(`edit`);
  };

  useEffect(() => {
    api
      .getPosts(params.postID)
      .then((data) => {
        setIsLoaded(true);
        setPost(data);
      })
      .catch((err) => {
        setIsLoaded(true);
        alert(err);
      });
  }, []);

  useEffect(() => {
    api
      .getComments(params.postID)
      .then((data) => {
        setComments(data);
      })
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
      .then((data) => {
        setComments(data);
        event.target.new_comment.value = "";
      })
      .catch((err) => alert("Заполните поле комментария"));
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!isLoaded ? (
        <div className="load">Загрузка...</div>
      ) : (
        <div className="container">
          
          <div className="postpage">
            <div className="page">
              <div className="post">
                <div className="title">{post?.title}</div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="author">
                    <img className="avatar" src={`${post?.author.avatar}`} />
                    <div>
                      <div
                        className="author_name"
                        
                      >
                        {post?.author.name}
                      </div>

                      <p className="date">
                        {dayjs(post?.created_at).format("DD.MM.YYYY, HH:mm:ss")}
                      </p>
                    </div>
                  </div>
                  <div>
                    {userInfo._id == post?.author._id && (
                      <IconButton onClick={deletePost} title="Удалить пост">
                        <DeleteOutlinedIcon />
                      </IconButton>
                    )}

                    {userInfo._id == post?.author._id && (
                      <IconButton onClick={navigateToEditPage}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
                <div>
                  <img className="image" src={post?.image} />
                </div>
                <div className="post_text">{post?.text}</div>
              </div>
              <div className="comments">
                {comments?.map((el) => (
                  <div key={el._id}>
                    <div style={{ display: "flex" }}>
                      <div className="author">
                        <img className="avatar" src={`${el.author.avatar}`} />
                        <div>
                          <div
                            className="author_name"
                            onClick={() => navigate(`/users/${el?.author._id}`)}
                          >
                            {el.author.name}
                          </div>
                          <div className="date">
                            {dayjs(el.created_at).format(
                              "DD.MM.YYYY, HH:mm:ss"
                            )}
                          </div>
                        </div>
                      </div>
                      {userInfo._id == el.author._id && (
                        <IconButton onClick={() => deleteComment(el._id)}>
                          <DeleteOutlinedIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                      )}
                    </div>
                    <div className="post_text">{el.text}</div>
                    <hr />
                  </div>
                ))}
                <div>
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onSubmit={handleSubmit}
                  >
                    <input
                      name="new_comment"
                      placeholder="Введите комментарий"
                    />
                    <button>Отправить</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
