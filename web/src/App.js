import React, { useEffect, useState } from 'react';

import api from "./services/api";

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [devs, setDevs] = useState([]);
  const [devEdit, setDevEdit] = useState();

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  async function handleEditDev(data) {
    const response = await api.put('/devs', data);
    const updatedDevs = devs.slice();
    const index = updatedDevs.findIndex((item) => item.github_username === data.github_username);
    if(response.data.ok && index !== -1) {
      updatedDevs[index] = response.data.updatedDev;
      setDevs(updatedDevs);
    }
  }

  async function handleDeleteDev(dev) {
    const response = await api.delete('/devs', { data: { github_username: dev.github_username } });
    if(response.data.ok) {
      setDevs(devs.filter((item) => item !== dev));
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} onUpdate={handleEditDev} valuesObj={devEdit}/>
      </aside>
      <main>
        <ul>
          {devs.map((dev) => 
            <DevItem key={dev._id}
              dev={dev}
              onClickEdit={() => {
                const { github_username, techs } = dev;
                setDevEdit({ github_username, techs });
              }}
              onClickDelete={handleDeleteDev}
            />
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
