import React, {useState, useEffect} from 'react';
import { View, Image, Text, FlatList } from 'react-native'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import logoImg from '../../assets/logo.png'


import api from '../../Services/api'

import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Lista(){
    const [aulas, setaulas] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const navigation = useNavigation();
    
    function navigateBack(){
        navigation.goBack()
    }
    function navigateToDetail(aula){
        navigation.navigate('Detail', { aula } );
    }
    
    async function loadaulas(){

        if (loading) {
            return;
        }

        if (total > 0 && aulas.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('aulas', {
            params: {page}
        });

        setaulas([... aulas, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadaulas();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity  onPress={navigateBack}>
                    <Feather name="arrow-left" size={60} color="#ffcc00" />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Escolha um dos vídeos</Text>
            <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} vídeos</Text>.
            </Text>
            <FlatList
                data={aulas}
                style={styles.aulaList}
                keyExtractor={aula => String(aula.id)}
                //showsVerticalScrollIndicator = {false}
                onEndReached={loadaulas}
                onEndReachedThreshold={0.2}
                renderItem={({ item: aula }) => (

                    <View style={styles.aula}>
                                        
                        <Text style={styles.aulaProperty}>Lombar</Text>
                        
        
                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(aula)}
                        >
                            <Image style={styles.thumb} source={{uri: 'http://www.academiagabarra.com/wp-content/uploads/thumbs/video1.png'}} />
                        </TouchableOpacity>
                    </View>
                )}
            />

         </View>
    );
}