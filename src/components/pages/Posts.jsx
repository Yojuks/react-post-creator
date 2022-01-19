import React, { useState, useEffect } from "react";

import { usePosts } from "../UI/hooks/usePost";
import "./components/styles/App.css";

import PostService from "../API/PostService";
import { useFetching } from "./UI/hooks/useFetching";
import { getPageCount } from "./utils/pages";

import PostForm from "../components/PostForm";
import MyModal from "./components/UI/modal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../UI/loader/Loader";
import Pagination from "./components/UI/pagination/Pagination";
import MyButton from "";

function Posts() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Андрій", body: "3333" },
    { id: 2, title: "Борис", body: "2222" },
    { id: 3, title: "Василь", body: "1111" },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSeachedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [feachPost, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  console.log(totalPages);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const changePage = (page) => {
    setPage(page);
    feachPost(limit, page);
  };

  const removePost = (post) => {
    console.log(post);
    setPosts(posts.filter((item) => item.id !== post.id));
  };

  useEffect(() => {
    feachPost(limit, page);
  }, []);

  return (
    <div className="App">
      <MyButton style={{ marginTop: "20px" }} onClick={(e) => setModal(true)}>
        Створити користувача
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Виникла помилка ${postError}</h1>}
      {isPostLoading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <Loader />
        </div>
      ) : (
        <PostList remove={removePost} posts={sortedAndSeachedPosts} title="Пости про JS" />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}
export default Posts;
