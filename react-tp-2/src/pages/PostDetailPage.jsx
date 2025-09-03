import React from 'react';
import { useParams } from 'react-router-dom';

export function PostDetailPage() {
  const { id } = useParams();
  
  return (
    <div>
      <h2>Post Detail Page</h2>
      {/* Affichage du détail d'un post */}
      <p>Post ID: {id}</p>
    </div>
  );
}