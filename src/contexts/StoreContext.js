import React, {createContext, useState, useEffect} from 'react';
import initialStore from 'utils/initialStore.js';
import uniqueId from 'utils/uniqueId.js';

// export the context so that other components can import it
export const StoreContext = React.createContext(); 

function StoreContextProvider(props){
  const [page, setPage] = useState("/");
  const [currentUserId, setCurrentUserId] = useState(initialStore.currentUserId);
  const [users, setUsers] = useState(()=>{
    return JSON.parse(window.localStorage.getItem('users')) || initialStore.users;
  });

  useEffect(()=>{
    console.log(users);
    window.localStorage.setItem('users', JSON.stringify(users));
  }, [users]);
  
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
  }

  function cancelPost() {
  }

  function addFollower(userId, followerId){
    const follower ={
      userId: userId,
      followerId: followerId
    }
    setFollowers(followers.concat(follower));
  }
  function removeFollower(userId, followerId){
    setFollowers(followers.filter((follower) => 
      !(follower.userId === userId && follower.followerId === followerId)))
  }

	return (
        <StoreContext.Provider value={{
            currentUserId,
            users,
            posts,
            likes,
            followers,
            comments,
            addLike,
            removeLike,
            addComment,
            addPost,
            cancelPost,
            addFollower,
            removeFollower
        }}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider; // export this component as default