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
import StoreContextProvider from '../contexts/StoreContext.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <StoreContextProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <div className={css.container}>
          <Header/>
          <main className={css.content}>
            <Routes>
              <Route path="/" element={
                <Home

                />
              }/>
              <Route path=":postId" element={
                <Home

                />
              }>
              </Route>
              <Route path="newpost" element={
                <NewPost

                />
              }/>
              <Route path="/profile/:userId" element={
                <Profile

                />
              }/>
            </Routes>
          </main>
          <Navbar />
        </div>
      </Router>
    </StoreContextProvider>
  );
}

export default App;