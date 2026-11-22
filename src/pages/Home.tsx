import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import type { Post } from '../types';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando publicaciones...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Feed Principal</h1>
      {posts.length === 0 ? (
        <p>No hay publicaciones todavía.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
            <p>{post.description}</p>
            <Link to={`/post/${post.id}`}>Ver más</Link>
          </div>
        ))
      )}
    </div>
  );
};