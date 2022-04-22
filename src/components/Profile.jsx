import React, {useContext} from 'react';
import css from '../styles/Profile.module.css';
import publicUrl from '../utils/publicUrl';
import PostThumbnail from './PostThumbnail.jsx';
import { Link, useParams } from "react-router-dom";
import {StoreContext} from '../contexts/StoreContext.js';

function Profile(props) {
    const {userId} = useParams();
    const { currentUserId, users, posts, followers, addFollower, removeFollower } = useContext(StoreContext);
    const user = users.find(u => u.id === userId);
    const following = followers.filter(f => f.followerId === userId);
    const isFollowing = followers.some((e) => e.followerId === currentUserId && e.userId === userId);

    function handleFollow(){ 
        return followers.filter(
            (follower) =>
                follower.userId === currentUserId && follower.followerId !== currentUserId
        ).length;
    }
    
    function handleUnfollow(){
        return followers.filter((follower) => follower.userId !== currentUserId).length;
    }

    return (
        <div className={css.profile}>
            <div className={css.profileContainer}>
                <div className={css.profileContainerContainer}>
                    <img src={publicUrl(user.photo)} alt="User Img" className={css.userImg}/>
                    <div>
                        <div className={css.userName}>{userId}</div>
                        {isFollowing ? (
                            <div className={css.unfollowBtn}><button onClick={() => addFollower(currentUserId, userId)}>Unfollow</button></div>) :
                            (<div className={css.followBtn}><button onClick={() => removeFollower(currentUserId, userId)}>Follow</button></div>)
                        }
                    </div>
                </div>    
                <div className={css.profileName}><b>{user.name}</b></div>
                <div className={css.profileDescription}><p>{user.bio}</p></div>
                <ul className={css.profileInfo}>
                    <li>
                    <div>
                        <span>{posts.length}</span>
                        <br />
                        <span>posts</span>
                    </div>
                    </li>
                    <li>
                    <div>
                        <span>{followers.length}</span>
                        <br />
                        <span>followers</span>
                    </div>
                    </li>
                    <li>
                    <div>
                        <span>{following.length}</span>
                        <br />
                        <span>following</span>
                    </div>
                    </li>
                </ul>
                <div className={css.profilePosts}>
                    {posts
                        .map(post=>
                            <Link className={css.content} key={"non"} to={"/" + post.id}>
                                <PostThumbnail post={post}/>
                            </Link>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;