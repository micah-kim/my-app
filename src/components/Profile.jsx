import React from 'react';
import css from '../styles/Profile.module.css';
import publicUrl from '../utils/publicUrl';
import PostThumbnail from './PostThumbnail.jsx';

function Profile(props) {
    const currentUserId = props.currentUserId;
    const posts = props.posts.filter(posts => (posts.userId === currentUserId));
    const user = props.users.find(u => u.id === currentUserId);
    const followers = props.followers.filter(f => f.currentUserId === currentUserId);
    const following = props.followers.filter(f => f.followerId === currentUserId);

    return (
        <div className={css.profile}>
            <div className={css.profileContainer}>
                <div className={css.profileContainerContainer}>
                    <img src={publicUrl("/assets/assets/user1.png")} alt="User Img" className={css.userImg}/>
                    <div className={css.userName}>{currentUserId}</div>
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
                        <PostThumbnail
                            post={post}
                        />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;