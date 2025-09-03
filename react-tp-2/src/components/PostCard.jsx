import React from 'react';
import { Link } from 'react-router-dom';

export const PostCard = ({post}) => {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}...</p>
      <Link to={`/post/${post.id}`}>Voir l'article</Link>
    </article>
  )
};
