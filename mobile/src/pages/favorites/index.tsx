import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PageHeader from '../../components/page-header';
import TeacherItem, { Teacher } from '../../components/teacher-item';

import styles from './styles';
import useFavorited from '../../hooks/use-favorited';
import { useFocusEffect } from '@react-navigation/native';

function Favorites() {
    const [ favorited, _, loadFavorites ] = useFavorited();

    useFocusEffect(() => {
        loadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}>
                { favorited.map((teacher: Teacher) => { 
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited={true} />
                    );
                })}
            </ScrollView>
        </View>

    )
}

export default Favorites;