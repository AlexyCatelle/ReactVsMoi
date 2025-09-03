import React, { useState } from "react";

export const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      setLoading(true);

      // On envoie les données au parent si onSubmit est fourni
      if (onSubmit) {
        await onSubmit({ title: title.trim(), body: body.trim() });
      }

      // Réinitialisation du formulaire après soumission
      setTitle("");
      setBody("");
    } catch (err) {
      console.error("Erreur lors de la soumission:", err);
      alert("Erreur lors de la création du post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="title">Titre:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entrez le titre du post"
          style={{
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.25rem",
            display: "block",
          }}
          disabled={loading}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="body">Contenu:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Entrez le contenu du post"
          rows={6}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.25rem",
            display: "block",
            resize: "vertical",
          }}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Création en cours..." : "Créer le post"}
      </button>
    </form>
  );
};
