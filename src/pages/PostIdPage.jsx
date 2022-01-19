import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../UI/hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../UI/loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  console.log(comments);

  return (
    <div>
      <h1>Ви відкрили сторінку поста з ID = {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Коментарі</h1>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comment) => {
            return (
              <div style={{ marginTop: "15px" }} key={comment.id}>
                <h5>{comment.email}</h5>
                <h5>{comment.body}</h5>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
