import React from 'react';
import PageHeader from '../../components/page-header';
import Input from '../../components/input';

import warningIcon from '../../assets/images/icons/warning.svg';

import './style.css';
import Select from '../../components/select';
import Textarea from '../../components/textarea';

function TeacherForm() {
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrivel que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição" />

            <main>
                <fieldset>
                    <legend>Seus dados</legend>

                    <Input name="name" label="Nome completo" />
                    <Input name="avatar" label="Avatar" />
                    <Input name="whatsapp" label="WhatsApp" />
                    <Textarea name="bio" label="Biografia" />
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>

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
                    <Input name="cost" label="Custo da sua hora por aula" />
                </fieldset>

                <fieldset>
                    <legend>
                        Horário disponível
                        <button type="button">
                            + Novo Horário
                        </button>
                    </legend>
                    
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br/>
                        Preencha todos os dados
                    </p>
                </footer>
            </main>
        </div>
    );
}

export default TeacherForm;
