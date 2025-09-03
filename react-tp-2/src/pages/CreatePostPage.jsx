import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.jsx';

export function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/posts', {
        title: title.trim(),
        body: body.trim(),
        userId: 1 // ID utilisateur par défaut
      });

      console.log('Post créé:', response.data);
      
      // Redirection vers la page d'accueil après création
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
      alert('Erreur lors de la création du post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Creer un article</h2>
      {/* Formulaire de création de post */}
      <form onSubmit={handleSubmit}>
        <fieldset style={{border:"none"}}>
          <label htmlFor="title">Titre:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez le titre du post"
            disabled={loading}
          />
        </fieldset>

        <fieldset style={{border:"none"}}>
          <label htmlFor="body">Contenu:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Entrez le contenu du post"
            rows={6}
            disabled={loading}
          />
        </fieldset>
        <button 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Création en cours...' : 'Créer le post'}
        </button>
      </form>
    </>
  );
}