import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationProp<ParamListBase>;
}

interface Movie {
    id: string;
    title: string;
}
 const Data: Movie[] = [
    {
        id: 'm1',
        title: 'movie 1',
    },
    {
        id: 'm2',
        title: 'movie 2',
    },{
        id: 'm3',
        title: 'movie 3',
    },
 ]
const HomeScreen: React.FC<Props> =  ({navigation}) => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    const SetMovies = () => {
        setMoviesList(Data);
    }
    useEffect(() => {
        SetMovies();
    },[]);
    const renderItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity style={styles.movieCard}>
            <Image
                source={{uri: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg`}}
                style={styles.cardPoster}
            />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      );
    return(
        <SafeAreaView style={styles.container}>
            <View style={{paddingBottom: 20}}>
                <TextInput style={styles.searchBar} placeholder='Search'/>
            </View>
            <View style={styles.cardContainer}>
                <FlatList
                    data={moviesList}
                    horizontal={true}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#050f24'
    },
    item: {
        backgroundColor: 'red',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        padding: 5,
        fontSize: 12,
        color: 'white',
    },
    movieCard: {
        borderRadius:10,
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 16,
    },
    cardPoster: {
        borderWidth: 1,
        borderColor:'white',
        height: 200,
        width: 150,
        borderRadius: 9,
    },
    cardContainer: {
        height: 300,
    },
    searchBar: {
        backgroundColor:'#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        height: 40,
    },
})