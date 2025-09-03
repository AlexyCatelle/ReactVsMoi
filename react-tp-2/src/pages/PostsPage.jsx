import React from 'react';
import { PostCard } from '../components/PostCard.jsx';

export const PostsPage = ({ posts }) => {
  return (
    <div>
      <h2>Posts Page</h2>
      {/* Affichage des posts */}
      {posts.length > 0 ? (
        <div>
          <p>{posts.length} posts récupérés</p>
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>Chargement des posts...</p>
      )}
    </div>
  );
};
