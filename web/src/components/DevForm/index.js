import React, { useState, useEffect } from 'react';

import './styles.css';

function DevForm({ onSubmit, onUpdate, valuesObj }) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    
    const [editMode, setEditMode] = useState(false);

    function getCurrentPos() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        }, (err) => console.log(err),
        { timeout: 30000 /*30 secs*/}
      );
    }
    
    useEffect(() =>  {
        getCurrentPos();
    }, []);

    useEffect(() => {
      if(valuesObj) {
        setEditMode(true);
        setGithubUsername(valuesObj.github_username);
        setTechs(valuesObj.techs.join(', '));
      }
    }, [valuesObj]);

    async function handleSubmit(e) {
        e.preventDefault();
        if(!editMode) {
          await onSubmit({ github_username, techs, latitude, longitude });
        } else {
          await onUpdate({ github_username, techs, latitude, longitude });
          setEditMode(false);
        }
        setGithubUsername('');
        setTechs('');
    }

    async function handleCancelEdit(e) {
      e.preventDefault();
      setGithubUsername('');
      setTechs('');
      getCurrentPos();
      setEditMode(false);
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input name="github_username" id="github_username"
              disabled={editMode}
              value={github_username} onChange={(e) => setGithubUsername(e.target.value)} required />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs"
              value={techs} onChange={(e) => setTechs(e.target.value)} required />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" type="number"
                value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" type="number"
                value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
            </div>
          </div>

          {!editMode ? (
            <button type="submit">Salvar</button>
          ) : (<>
            <button type="submit">Editar</button>
            <button className="btn-cancel" onClick={handleCancelEdit}>Cancelar</button>
          </>)}
        </form>
    );
}

export default DevForm;
