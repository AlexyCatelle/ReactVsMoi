import React from 'react';
import { PostCard } from '../components/PostCard.jsx';

export const PostsPage = ({ posts }) => {
  return (
    <>
      {posts.length > 0 ? (
        <section>
          <h2>{posts.length} articles récupérés</h2>
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      ) : (
        <p>Chargement des posts...</p>
      )}
    </>
  );
};
