import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';

import styles from './style';
import { RectButton } from 'react-native-gesture-handler';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import useFavorited from '../../hooks/use-favorited';
import api from '../../services/api';

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
    teacher: Teacher,
    favorited: boolean,
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [ favorites, setFavorite ] = useFavorited();
    const { id, avatar, name, subject, bio, cost, whatsapp } = teacher;

    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: id
        });
        Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
    }

    async function handleToggleFavorited() {
        let favoritesArray = [...favorites];

        if (favorited) {
            favoritesArray = favoritesArray.filter((favoritedTeacher: Teacher) => favoritedTeacher.id !== teacher.id);
        } else {
            favoritesArray.push(teacher);
        }

        await setFavorite(favoritesArray);
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: avatar }}
                    />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.subject}>{subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.prices}>
                    Preço/Hora {'   '}
                    <Text style={styles.value}>R$ {cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, styles.favorited]} onPress={handleToggleFavorited}>
                        {favorited
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                         }
                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
};

export default TeacherItem;