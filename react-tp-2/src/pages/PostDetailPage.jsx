import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api.jsx';

export function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Récupération du post avec l'ID
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
        
        console.log('Post récupéré:', response.data);
      } catch (err) {
        console.error('Erreur lors du fetch du post:', err);
        setError('Erreur lors du chargement du post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div>
        <h2>Chargement...</h2>
        <p>Récupération des données du post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Erreur</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <h2>Post non trouvé</h2>
        <p>Le post avec l'ID {id} n'existe pas.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
        ← Retour à la liste des posts
      </Link>
      
      <article style={{ marginTop: '1rem' }}>
        <header>
          <h1>{post.title}</h1>
          <p style={{ 
            color: '#666', 
            fontSize: '0.9rem', 
            marginBottom: '1rem' 
          }}>
            Post #{post.id} • Auteur: User {post.userId}
          </p>
        </header>
        
        <div style={{ 
          lineHeight: '1.6', 
          fontSize: '1.1rem',
          backgroundColor: '#f9f9f9',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          {post.body}
        </div>
      </article>
    </div>
  );
}