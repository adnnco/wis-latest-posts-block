import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const LatestPostsBlock = ({ numberOfPosts }) => {
    const [posts, setPosts] = useState([]);
    const defaultImage = 'path/to/default/image.jpg'; // Replace with the path to your default image

    useEffect(() => {
        fetch(`/wp-json/wis/v1/latest-posts?per_page=${numberOfPosts}`)
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, [numberOfPosts]);

    return (
        <div className="latest-posts-block">
            {posts.map((post) => (
                <div key={post.id} className="post-item">
                    <img className="post-image" src={post.featured_image || defaultImage} alt={post.title} />
                    <div className="post-content">
                        <h2 className="post-title">{post.title}</h2>
                        <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </div>
                </div>
            ))}
        </div>
    );
};

document.addEventListener('DOMContentLoaded', function () {
    const block = document.querySelector('.wp-block-create-block-wis-latest-posts-block');
    const numberOfPosts = block.getAttribute('data-number-of-posts') || 5;

    ReactDOM.render(<LatestPostsBlock numberOfPosts={numberOfPosts} />, block);
});
