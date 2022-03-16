import React from 'react';
import css from '../styles/Navbar.module.css';
import publicUrl from '../utils/publicUrl';

function Navbar(props) {

  function handleClick(page) {
    console.log("clicked!", page);
    console.log("props", props.onNavChange());
  }

  return (
    <nav className={css.navbar}>
      <div className={css.navItem}>
        <button className={css.navItemButton} onClick={e=>handleClick("home")}>
          <img src={publicUrl('/assets/assets/home.svg')} alt="Home"/>
        </button>
      </div>
      <div className={css.navItem}>
        <button className={css.navItemButton} onClick={e=>handleClick("explore")}>
          <img src={publicUrl('/assets/assets/explore.svg')} alt="Explore"/>
        </button>
      </div>
      <div className={css.navItem}>
        <button className={css.navItemButton} onClick={e=>handleClick("newpost")}>
          <img src={publicUrl('/assets/assets/newpost.svg')} alt="New Post"/>
        </button>
      </div>
      <div className={css.navItem}>
        <button className={css.navItemButton} onClick={e=>handleClick("activity")}>
          <img src={publicUrl('/assets/assets/activity.svg')} alt="Activity" />
        </button>
      </div>
      <div className={css.navItem}>
        <button className={css.navItemButton} onClick={e=>handleClick("profile")}>
          <img src={publicUrl('/assets/assets/profile.svg')} alt="Profile" />
        </button>
      </div>
    </nav>
  );
}
  
export default Navbar;