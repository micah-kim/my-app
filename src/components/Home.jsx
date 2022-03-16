import React from 'react';
import '../styles/Home.module.css';
import Post from './Post.jsx';

function Home() {
  const post = {
    user: {
      id: "judy"
    },
    post: {
      id: "post-1",
      userId: "judy",
      photo: "/assets/assets/post1.png",
    },
    likes: {
      self: true,
      count: 1
    }
  };
  return (
    <div>
      
    </div>
  );
}

export default Home;