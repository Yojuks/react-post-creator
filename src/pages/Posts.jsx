import React, { useState, useEffect, useRef } from "react";

import { usePosts } from "../UI/hooks/usePost";
import "../styles/App.css";
import PostService from "../API/PostService";
import { useFetching } from "../UI/hooks/useFetching";
import { getPageCount } from "../utils/pages";
import PostForm from "../components/PostForm";
import MyModal from "../UI/modal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../UI/loader/Loader";
import Pagination from "../UI/pagination/Pagination";
import MyButton from "../UI/button/MyButton";
import { useObserver } from "../UI/hooks/useObserver";
import MySelect from "../UI/select/MySelect";

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
  const lastElement = useRef();

  console.log(lastElement);

  const [feachPost, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const changePage = (page) => {
    setPage(page);
  };

  const removePost = (post) => {
    console.log(post);
    setPosts(posts.filter((item) => item.id !== post.id));
  };

  useEffect(() => {
    feachPost(limit, page);
  }, [page, limit]);

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

      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кількість елементів на сторінці"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "показати всі" },
        ]}
      />

      {postError && <h1>Виникла помилка ${postError}</h1>}
      <PostList remove={removePost} posts={sortedAndSeachedPosts} title="Пости про JS" />
      <div ref={lastElement} style={{ height: 20, background: "red" }}></div>
      {isPostLoading && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <Loader />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}
export default Posts;
