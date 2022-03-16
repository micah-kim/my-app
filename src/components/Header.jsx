import React from 'react';
import css from '../styles/Header.module.css';
import publicUrl from '../utils/publicUrl';

function Header(props) {

  function handleClick(page) {
    console.log("clicked!", page);
    console.log("props", props.onHeaderChange());
  }

  return (
    <div className={css.header}>
      <div className={css.headerItem}>
        <button className={css.headerItemButton} onClick={e=>handleClick("camera")}>
          <img src={publicUrl('/assets/assets/camera.svg')} alt="Camera"/>
        </button>  
      </div>
      <div className={css.headerItem}>
        <button className={css.headerItemButton} onClick={e=>handleClick("home")}>
          <img src={publicUrl('/assets/assets/logo.png')} alt="Instagram"/>
        </button>
      </div>
      <div className={css.headerItem}>
        <button className={css.headerItemButton} onClick={e=>handleClick("messages")}>
          <img src={publicUrl('/assets/assets/message.svg')} alt="Home"/>
        </button>  
      </div>
    </div>
    );
  }
  
  export default Header;