import { useEffect, useState } from "react";
import  {api}  from "./services/api.jsx";
import { Navigation } from "./components/Navigation.jsx";
import "./App.css";
import { NavLink, Link, Routes, Route} from "react-router-dom"
import { CreatePostPage } from "./pages/CreatePostPage.jsx";
import { PostDetailPage } from "./pages/PostDetailPage.jsx";
import { PostsPage } from "./pages/PostsPage.jsx";

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    console.log("Composant monté, début du fetch")

    // Fonction asynchrone pour récupérer les posts
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // Requête GET vers l'API
        const response = await api.get('/posts');

        // Mise à jour de l'état avec les données reçues
        setPosts(response.data);

        console.log('Posts récupérés:', response.data.length)
      } catch (error) {
        console.log('Erreur lors du fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

  },
   []);


  return (
    <>
<Routes>
  <Route element={<Navigation />}>
          <Route index element={<PostsPage posts={posts} loading={loading}/>} />
          <Route path="create" element={<CreatePostPage />}/>
          <Route path="/post/:id" element={<PostDetailPage />} />        
  </Route>
</Routes>

</>  );
}

export default App;
