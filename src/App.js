import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => setRepositories(res.data));
  }, [])

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `Repositório ${Date.now()}`
    })
    setRepositories([...respositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepo = respositories.filter(el => el.id !== id);
    setRepositories(newRepo);
  }

  return (
    <div>
      <h1>Lista de Repositórios</h1>
      <br/>
      <br/>
      <ul data-testid="repository-list">
        {
          respositories.map(repo => (
            <li key={repo.id}>
              {repo.title}
    
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
