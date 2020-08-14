import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Teacher } from '../components/teacher-item';

function useFavorited(): [ Teacher[], any, any ] {
    const [ favorited, setFavorited ] = useState<Teacher[]>([]);
    const loadFavorited = useCallback(async () => {
        const response = await AsyncStorage.getItem('favorited');

        let favorited = [];
        if (response) {
            favorited = JSON.parse(response);
        }

        setFavorited(favorited);
    }, [ setFavorited ]);

    useEffect(() => {
        loadFavorited();
    }, [ loadFavorited ]);

    const updateFavorited = useCallback(async (favorited: Teacher[]) => {
        await AsyncStorage.setItem('favorited', JSON.stringify(favorited));
        setFavorited(favorited);
    }, [ setFavorited ]);

    return [ favorited, updateFavorited, loadFavorited ];
}

export default useFavorited;