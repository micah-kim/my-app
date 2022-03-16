import React from "react";

function Post(props) {

    const user = props.user;
    const post = props.post;
    const likes = props.likes;

    return (
        <div>
            <div>@{user.id}</div>
            <div><img src={post.photo} width="100%" alt="post-1" /></div>
        </div>
    );
}

export default Post;