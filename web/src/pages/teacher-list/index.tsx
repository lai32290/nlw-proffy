import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/page-header';
import TeacherItem, { Teacher } from '../../components/teacher-item';
import Input from '../../components/input';
import Select from '../../components/select';
import api from '../../services/api';

import './style.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeacher(e: FormEvent) {
        e.preventDefault();

        try {
            const res = await api.get('/classes', {
                params: {
                    subject,
                    week_day,
                    time,
                }
            });

            setTeachers(res.data);
        } catch(e) {
            alert('Erro ao buscar dados');
        }
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeacher}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Matematica', label: 'Matematica' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Historia', label: 'Historia' },
                            { value: 'Programacao', label: 'Programacao' },
                        ]}
                        />
                    <Select
                        name="week_day"
                        label="Dias de semana"
                        value={week_day}
                        onChange={e => setWeekDay(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda' },
                            { value: '2', label: 'Terça' },
                            { value: '3', label: 'Quarta' },
                            { value: '4', label: 'Quinta' },
                            { value: '5', label: 'Sexta' },
                            { value: '6', label: 'Sábado' },
                        ]}
                        />
                    <Input 
                        type="time"
                        name="time"
                        label="Horario"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                { teachers.map((teacher: Teacher) => (
                    <TeacherItem key={teacher.id} teacher={teacher} />
                ))}
            </main>
        </div>
    );
}

export default TeacherList;
