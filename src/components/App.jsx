// global style sheet
import '../styles/style.css';
// app specific style sheet
import css from '../styles/App.module.css';
import React, { useState } from 'react';
import Header from './Header.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Navbar from './Navbar.jsx';
import initialStore from 'utils/initialStore.js';
import uniqueId from 'utils/uniqueId.js';
import NewPost from './NewPost.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [page, setPage] = useState("/");
  const [currentUserId, setCurrentUserId] = useState(initialStore.currentUserId);
  const [users, setUsers] = useState(initialStore.users);
  const [posts, setPosts] = useState(initialStore.posts);
  const [likes, setLikes] = useState(initialStore.likes);
  const [comments, setComments] = useState(initialStore.comments);
  const [followers, setFollowers] = useState(initialStore.followers);

  function addLike(postId){
    const like = {
      userId: currentUserId, 
      postId,
      datetime: new Date().toISOString()
    };
  
    setLikes(likes.concat(like));
  }
  
   function removeLike(postId) {
    setLikes(likes.filter(
      like => !(like.userId === currentUserId && like.postId === postId)
    ));
  }

  function addComment(postId, text) {
    const comment = {
      userId: currentUserId,
      postId,
      text,
      datetime: new Date().toISOString()
    };
    setComments(comments.concat(comment));
  }

  function addPost(photo, desc) {
    const post = {
      id: uniqueId('post'),
      userId: currentUserId,
      photo,
      desc,
      datetime: new Date().toISOString()
    };
    setPosts(posts.concat(post));
    
    setPage("home");
  }

  function cancelPost() {
    setPage("home");
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className={css.container}>
        <Header/>
        <main className={css.content}>
          <Routes>
            <Route path="/" element={
              <Home
                currentUserId={currentUserId}
                posts={posts}
                users={users}
                comments={comments}
                likes={likes}
                onLike={addLike}
                onUnlike={removeLike}
                onComment={addComment}
              />
            }/>
            <Route path="/newpost" element={
              <NewPost
                onPost={addPost}
                onCancelPost={cancelPost}
              />
            }/>
            <Route path="profile" element={
              <Profile
                currentUserId={currentUserId}
                posts={posts}
                users={users}
                followers={followers}
              />
            }/>
          </Routes>
        </main>
        <Navbar onNavChange={setPage}/>
      </div>
    </Router>
  );
}

export default App;