import React, {useState} from "react";
import css from "../styles/Post.module.css";
import publicUrl from '../utils/publicUrl';
import timespan from "../utils/timespan.js";
import { Link } from 'react-router-dom';

function Post(props) {

    const user = props.user;
    const post = props.post;
    const likes = props.likes;
    const [comment, setComment] = useState('');
    const [toggleComment, setToggleComment] = useState(false);

    function handleLike(){ 
        props.onLike(post.id);
    }
    
    function handleUnlike(){
        props.onUnlike(post.id);
    }

    function handleSubmitComment(event){
        props.onComment(post.id, comment);
        setComment('');
        setToggleComment(false);
        event.preventDefault();
    }

    return (
        <div className={css.post}>
            <div className={css.postPhotoContainer}>
                <div className={css.postPhotoContainerContainer}>
                    <div className={css.postUsername}>
                        <img className={css.postUsernameImg} src={publicUrl(user.photo)} alt="" />
                        <Link to={"/profile/" + post.userId}><button className={css.postUsernameId}>{post.userId}</button></Link>
                    </div>
                    <div><img className={css.postPhoto} src={post.photo} width="100%" alt="post-1"/></div>
                    <div className={css.postPhotoBottom}>
                        <div className={css.postInteraction}>
                            <button className={css.postLikeButton}>
                                {props.likes.self? 
                                    (<img onClick={handleUnlike} src={publicUrl('/assets/assets/unlike.svg')} alt='Unlike Action'/> ) :
		                            (<img onClick={handleLike} src={publicUrl('/assets/assets/like.svg')} alt='Like Action'/> )
	                            }                        
                            </button>
                            <button className={css.postCommentButton} onClick={e=>setToggleComment(!toggleComment)}>
                                <img src={publicUrl('/assets/assets/comment.svg')} alt="" />
                            </button>
                        </div>
                        <div className={css.postLikeCount}>
                            <strong>{props.likes.count} Likes</strong>
                        </div>
                        <div className={css.postDescription}>
                            <div><strong><Link className={css.comment} to={"/profile/" + post.userId}><b>{post.userId}</b></Link></strong> {post.desc}</div>
                        </div>
                        <div className={css.postComments}>
                        {props.comments.map((comment, i) => (
                            <div key={i}>
                                <span>
                                    <Link className={css.comment} to={"/profile/" + comment.userId}><b>{comment.userId}</b></Link>
                                </span>
                                <span> {comment.text}</span>
                            </div>
                        ))}
                        </div>
                        <div className={css.postTimespan}>{timespan(post.datetime)}</div>
                        {toggleComment &&
                            <form className={css.addComment} onSubmit={handleSubmitComment}>
                                <input type="text" placeholder="Add a comment…" 
                                    value={comment} 
                                    onChange={e=>setComment(e.target.value)}/>
                                <button type="submit">Post</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;