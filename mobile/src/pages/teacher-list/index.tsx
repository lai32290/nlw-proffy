import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, TextInput, ScrollView } from 'react-native';
import PageHeader from '../../components/page-header';
import TeacherItem, { Teacher } from '../../components/teacher-item';
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import useFavorited from '../../hooks/use-favorited';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
    const [ favorites, _, loadFavorites ] = useFavorited();
    const [ isFiltersVisible, setIsFiltersVisible ] = useState(false);
    const [ teachers, setTeachers ] = useState([]);

    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');

    const favoritesId = favorites.map(favorite => favorite.id);

    useFocusEffect(() => {
        loadFavorites();
    })

    async function handleFilterSubmit() {
        await loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    function handleToggleFilterIsVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponiveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilterIsVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}>
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Materia</Text>
                        <TextInput
                            placeholder="Qual a materia"
                            placeholderTextColor="#c1bccc"
                            value={subject}
                            onChangeText={setSubject}
                            style={styles.input}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dias da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={setWeekDay}
                                    placeholderTextColor="#c1bccc"
                                    placeholder="Qual o dia?"
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horario</Text>
                                <TextInput
                                    placeholderTextColor="#c1bccc"
                                    value={time}
                                    onChangeText={setTime}
                                    style={styles.input}
                                    placeholder="Qual horario?"
                                />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
                
            </PageHeader>

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}>
                { teachers.map((teacher: Teacher) => { 
                    const favorited = favoritesId.includes(teacher.id);
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited={favorited} />
                    );
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;