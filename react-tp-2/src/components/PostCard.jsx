import React from 'react';
import { Link } from 'react-router-dom';

export const PostCard = ({post}) => {
  return (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body.substring(0, 100)}...</p>
              <small>post ID: {post.id}</small>
              <br />
              <Link to={`/post/${post.id}`}>Voir le post →</Link>
            </div>
  )
};