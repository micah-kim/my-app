import React from 'react';
import Post from './Post.jsx';
import { useParams } from 'react-router-dom';

function Home(props) {
  const {posts, users, likes, comments, currentUserId, onLike, onUnlike, onComment} = props;
  const {postId} = useParams();

  function fineUser(post, users) {
    return users.find((user) => user.id === post.userId);
  }
  
  function findComments(post, comments) {
    return comments.filter((comment) => comment.postId === post.id);
  }
  
  function findLikes(post, likes) {
    let postLikes = likes.filter((like) => like.postId === post.id);
    return {
      self: postLikes.some((like) => like.userId === currentUserId),
      count: postLikes.length,
    };
  }

  return (
    <div>
      {posts.filter((post) => ((post.id === postId) || (typeof postId === "undefined"))).sort((a, b)=>new Date(b.datetime) - new Date(a.datetime))
      .map(post=>
        <Post
          key={post.id}
          user={fineUser(post, users)}
          post={post}
          comments={findComments(post, comments)}
          likes={findLikes(post, likes)}
          onLike = {onLike}
          onUnlike = {onUnlike}
          onComment={onComment}
        />)}
    </div>
  );
}

export default Home;