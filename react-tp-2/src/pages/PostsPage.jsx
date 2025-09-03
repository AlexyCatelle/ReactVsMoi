import React from 'react';
import { Link } from 'react-router-dom';

export const PostsPage = ({ posts }) => {
  return (
    <div>
      <h2>Posts Page</h2>
      {/* Affichage des posts */}
      {posts.length > 0 ? (
        <div>
          <p>{posts.length} posts récupérés</p>
          {posts.slice(0, 3).map((post) => (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body.substring(0, 100)}...</p>
              <small>post ID: {post.id}</small>
              <br />
              <Link to={`/post/${post.id}`}>Voir le post →</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Chargement des posts...</p>
      )}
    </div>
  );
};
