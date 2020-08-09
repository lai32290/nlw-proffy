import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';
import './style.css';

export interface Teacher {
    id: number,
    avatar: string,
    bio: string,
    cost: number,
    name: string,
    subject: string,
    whatsapp: string
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    const {  name, avatar, bio, cost, subject, whatsapp, id } = teacher;

    function createNewConnectio() {
        api.post('/connections', {
            user_id: id
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={avatar} alt="" />
                <div>
                    <strong>{name}</strong>
                    <span>{subject}</span>
                </div>
            </header>

            <p>{bio}</p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {cost}</strong>
                </p>
                <a href={`https://wa/me/55${whatsapp}`} target="black" onClick={createNewConnectio}>
                    <img src={whatsappIcon} alt="WhatsApp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;
