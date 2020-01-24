import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

function DevItem({ dev, onClickEdit, onClickDelete }) {

    async function editUser(event) {
        event.preventDefault();
        onClickEdit(dev);
    }

    async function deleteUser(event) {
        event.preventDefault();
        onClickDelete(dev);
    }

    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                <div className="edit">
                    <FontAwesomeIcon icon={faEllipsisH} />
                    <ul className="edit-menu">
                        <li onClick={editUser}>
                            <FontAwesomeIcon icon={faEdit} className="icon"/>Edit
                        </li>
                        <li onClick={deleteUser}>
                            <FontAwesomeIcon icon={faTrashAlt} className="icon" />Delete
                        </li>
                    </ul>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
        </li>
    );
}

export default DevItem;
