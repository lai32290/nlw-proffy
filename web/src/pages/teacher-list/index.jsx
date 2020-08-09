import React from 'react';
import PageHeader from '../../components/page-header';
import TeacherItem from '../../components/teacher-item';
import Input from '../../components/input';
import Select from '../../components/select';

import './style.css';

function TeacherList() {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
                    <Select
                        name="subject"
                        label="Matéria"
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Matematica', label: 'Matematica' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Historia', label: 'Historia' }
                        ]}
                        />
                    <Select
                        name="week_day"
                        label="Dias de semana"
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
                    <Input type="time" name="time" label="Horario" />
                </form>
            </PageHeader>

            <main>
                <TeacherItem />
            </main>
        </div>
    );
}

export default TeacherList;
