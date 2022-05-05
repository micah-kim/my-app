import React, {createContext, useState, useEffect} from 'react';
import initialStore from 'utils/initialStore.js';
import uniqueId from 'utils/uniqueId.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { collection, query, where, doc, updateDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8qeagLiCYhzbTacUPUWn_kwTi4GtJjz4",
  authDomain: "instagram-clone-74cfe.firebaseapp.com",
  projectId: "instagram-clone-74cfe",
  storageBucket: "instagram-clone-74cfe.appspot.com",
  messagingSenderId: "938828223419",
  appId: "1:938828223419:web:48d029099f6ca7c093aa9e",
  measurementId: "G-F9D06KRTGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

function login(email, password){
  signInWithEmailAndPassword(auth, email,password).then((userCredential)=>{
		// Signed in 
    const user = userCredential.user;
    // find the user ID (see below)
  }).catch(error=>{
		const errorCode = error.code;
    const errorMessage = error.message; // print these to see what the error is
		//set current user to null
  });
}

// export the context so that other components can import it
export const StoreContext = React.createContext(); 

function StoreContextProvider(props){
  
  const [page, setPage] = useState("/");
  const [currentUserId, setCurrentUserId] = useState(initialStore.currentUserId);
  const [users, setUsers] = useState(()=>  {
    return JSON.parse(window.localStorage.getItem('users')) || initialStore.users;
  });

  useEffect(()=>{
    async function loadUsers() {
      setUsers(users);
    }
    loadUsers();
  }, []);
  
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

    async function addLikeToFirestore(like){
      try {
        // TODO: get the reference to likes collection
        const docRef = await addDoc(collection(db, "likes"), {
          datetime: new Date().toISOString(),
          postId: postId,
          userId: currentUserId
        });
        // TODO: add a new document to the collection 

        // get the return (docRef) and print it to confirm
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    addLikeToFirestore(like);
  }

   function removeLike(postId) {
    setLikes(likes.filter(
      like => !(like.userId === currentUserId && like.postId === postId)
    ));
    
    async function removeLikeToFirestore(postId){
      try {
        // TODO: get reference to the likes collection
        
        const queryShot = await deleteDoc(doc(db, "likes"));
	      // TODO: performs a compound query getting the likes for the user and the post

	      // TODO:  execute the query and get the result query snapshot 

        // get the return (docRef) and print it to confirm
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    removeLikeToFirestore(postId);
  }

  async function findUserByEmail(email){
    
    // get users collection
    const usersRef = collection(db, 'users');
    // query the collection to find the user with the email address
    const q = query(usersRef, where('email', '==', email));
    // execute the query using getDocs
    const querySnapshot = await getDocs(q);
    
    // get the user id from the first document (there should be one matched user)
    const userId = querySnapshot.docs[0].data().id;
    
    if (userId == null) {
      setCurrentUserId(null);
    }
    else {
      setCurrentUserId(userId);
    }

    // navigate('/');
  }
  findUserByEmail(users.email);

  function signup(email, password, bio, id, name, photo){
    const user = {
      email, id, name, bio, photo
    };
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      async function addUser(user)
      {
        await addDoc(collection(db, "users"), user);

        setUsers(users.concat(user))

        setCurrentUserId(id)

        // navigate("/")
      }
      addUser(user)
      // TODO: add a user to the firestore database (refer to addLikeToFirestore)
      
      // TODO: add a user to the app state (refer to addLike)
      
      // TODO: set the user as a current user (use setCurrentUserUd and user.id)
      // TODO:route to home (use navigate)
  
      // navigate('/');
  
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  
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
            login,
            signup,
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