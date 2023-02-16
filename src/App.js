import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import useDebounce from "./hooks/useDebounse";
import api from "./utils/Api";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [searchActive, setSearchActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceValue = useDebounce(searchQuery, 500);

  console.log(searchQuery);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    api.getAppInfo().then(([postsData, currentUserData]) => {
      setPosts(postsData);
      setCurrentUser(currentUserData);
    });
    console.log(">>render<<");
  }, []);

  useEffect(() => {
    api.search(debounceValue).then((data) => {
      setPosts(data);
    });
  }, [debounceValue]);

  function handlePostLike(post) {
    const isLiked = post.likes.some((el) => el === currentUser._id);
    isLiked
      ? api.deleteLikePost(post._id).then((newPost) => {
          const newPosts = posts.map((curPost) =>
            curPost._id === newPost._id ? newPost : curPost
          );
          setPosts([...newPosts]);
        })
      : api.getLikePost(post._id).then((newPost) => {
          const newPosts = posts.map((curPost) =>
            curPost._id === newPost._id ? newPost : curPost
          );
          setPosts([...newPosts]);
        });
  }

  function handlePostDelete(post) {
    const isAuthor = post.author._id === currentUser._id ? true : false;
    isAuthor
      ? api.deletePost(post._id).then((delitingPost) => {
          const newPosts = posts.filter(
            (curPost) => curPost._id !== delitingPost._id
          );
          setPosts([...newPosts]);
        })
      : alert("Вы не можете удалить чужой пост");
    handleClose();
  }

  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <Posts
        posts={posts}
        currentUser={currentUser}
        onPostLike={handlePostLike}
        active={searchActive}
        setActive={setSearchActive}
        postDelete={handlePostDelete}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default App;
