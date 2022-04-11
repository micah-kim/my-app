import React from 'react';
import css from '../styles/PostThumbnail.module.css';
import publicUrl from 'utils/publicUrl';

function PostThumbnail(props) {
  return (
    <div className={css.square}>
      <div className={css.content}>
        <img className={css.image} src={props.post.photo} alt="Post Thumbnail"/>
      </div> 
    </div>
  );
}

export default PostThumbnail;