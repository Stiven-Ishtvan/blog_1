import React, { useState } from "react";
import { Post } from "../Post";
import "./index.css";
import { useContext } from "react";
import PostContext from "../Contexts/postContext";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import Pagination from "@mui/material/Pagination";
import dayjs from "dayjs";

export const PostList = ({ like, setLike, userInfo, getPost, isLoaded }) => {
  const [buttonClick, setButtonClick] = useState(1);
  const [pageItems, setPageItems] = useState(12);
  const { posts, setPosts } = useContext(PostContext);
  const navigate = useNavigate();
  const api = useApi();
  const mostLiked = () => {
    setPosts((prevState) => {
      return [
        ...prevState.sort(function (a, b) {
          return b.likes.length - a.likes.length;
        }),
      ];
    });
    setButtonClick(1);
    navigate("/");
  };
  const mostComment = () => {
    setPosts(
      posts.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      })
    );
    setButtonClick(1);
    navigate("/");
  };
  const newAdded = () => {
    setPosts(
      posts.sort(function (a, b) {
        return (
          dayjs(b.created_at).format("YYYYMMDDHHmmss") -
          dayjs(a.created_at).format("YYYYMMDDHHmmss")
        );
        
      })
    );setButtonClick(1);
    navigate("/");
  };
  const oldAdded = () => {
    setPosts(
      posts.sort(function (a, b) {
        return (
          dayjs(a.created_at).format("YYYYMMDDHHmmss") -
          dayjs(b.created_at).format("YYYYMMDDHHmmss")
        );
      })
    );
    setButtonClick(1);
    navigate("/");
  };

  function selectChanged(value) {
    switch (value) {
      case 1:
        mostLiked();
        break;
      case 2:
        mostComment();
        break;
      case 3:
        newAdded();
        break;
      case 4:
        oldAdded();
        break;
    }
  }

  function selectPageItems(value) {
    switch (value) {
      case 6:
        setPageItems(value);
        break;
      case 9:
        setPageItems(value);
        break;
      case 12:
        setPageItems(value);
        break;
      case 15:
        setPageItems(value);
        break;
      case 18:
        setPageItems(value);
        break;
    }
  }

  const myPosts = () => {
    api
      .getPosts()
      .then((result) => {
        setPosts(
          result.reverse().filter((el) => userInfo._id == el.author._id)
        );
      })
      .catch((err) => alert(err));
  };

  const iLiked = () => {
    api
      .getPosts()
      .then((result) => {
        setPosts(
          result.reverse().filter((el) => el.likes.includes(userInfo._id))
        );
      })
      .catch((err) => alert(err));
  };

  const pageQty = Math.ceil(posts.length / pageItems);
  const pageLimit = buttonClick * pageItems;
  let data = null;
  buttonClick == 1
    ? (data = posts.slice(0, pageLimit))
    : (data = posts.slice(pageLimit - pageItems, pageLimit));

  return (
    <div>
      <div className="postContainer">
        <div style={{ display: "flex", flexDirection: "column" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between" }}>
           
           
              
            
          </div>
          {!isLoaded ? (
            <div className="load">Загрузка...</div>
          ) : data.length ? (
            <div className="postlist">
              {data?.map((item, index) => (
                <Post
                  key={index}
                  postsKey={item}
                  userInfo={userInfo}
                  setLike={setLike}
                  isLiked={like?.includes(item._id)}
                />
              ))}
            </div>
          ) : (
            <div className="postlist">
              <div className="badreq">Ничего нет</div>
            </div>
          )}
          <div className="buttonBlock">
            {pageQty > 1 && (
              <Pagination
                variant="outlined"
                page={buttonClick}
                color="primary"
                count={pageQty}
                onChange={(_, num) => {
                  setButtonClick(num);
                  window.scrollTo({
                    top: 0,
                   
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
