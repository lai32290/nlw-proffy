import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/page-header';
import Input from '../../components/input';
import Select from '../../components/select';
import Textarea from '../../components/textarea';
import api from '../../services/api';
import warningIcon from '../../assets/images/icons/warning.svg';

import './style.css';

const emptySchedule = { week_day: 0, from: '', to: '' };

function TeacherForm() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [ scheduleItems, setScheduleItems ] = useState([
        { ...emptySchedule },
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { ...emptySchedule }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }
            return scheduleItem;
        });

        setScheduleItems(newArray);
    }
    
    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(res => {
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch(e => {
            alert('Erro no cadastro');
        });
    }
    
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrivel que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição" />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={e => setAvatar(e.target.value)}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

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
                                { value: 'Historia', label: 'Historia' }
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horário disponível
                        <button type="button" onClick={() => addNewScheduleItem()}>
                                + Novo Horário
                        </button>
                        </legend>

                        {scheduleItems.map((item, index) => {
                            return (
                                <div className="schedule-item" key={item.week_day}>
                                    <Select
                                        name="week_day"
                                        label="Dias de semana"
                                        value={item.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                        name="from" 
                                        label="Das" 
                                        type="time" 
                                        value={item.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        />
                                    <Input 
                                    name="to" 
                                    label="Até" 
                                    type="time" 
                                    value={item.to}
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>

                        <button type="button" onClick={handleCreateClass}>
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;
