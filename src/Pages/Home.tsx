import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: {x: string};
    Details: {movie: Movie};
};

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeNavigationProp;
}

interface Movie {
    id: string;
    title: string;
    poster_path: string;
    vote_average: number;
}
let pageNo = 1;
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGE4Njg5NDhlMWY4Y2NiOWM5NTUyOTQ4ZDM3YTdkYyIsInN1YiI6IjY1Y2Y0YzBkNjBjNzUxMDE2MjY5MDk5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oH0bCtZ4lCduafIf03FEVPKqRAl0zlrSL6ku1DyRCwk';
let apiUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNo}`;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': '10a868948e1f8ccb9c9552948d37a7dc',
        Authorization: `Bearer ${accessToken}`
    },
}

const HomeScreen: React.FC<Props> =  ({navigation}) => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    const SetMovies = () => {
        fetch(apiUrl, options)
            .then(res => res.json())
            .then(result => {
                // console.log(result.results.length);
                // console.log(JSON.stringify(result.results))
                setMoviesList(result.results);
            })
            .catch(err => console.error('error:' + err));
        // console.log(moviesList);
    }
    useEffect(() => {
        SetMovies();
    },[]);
    const renderItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity style={styles.movieCard} onPress={() => navigation.navigate('Details', {movie: item})}>
            <Image
                source={{uri: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}}
                style={styles.cardPoster}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{item.vote_average}</Text>
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
        backgroundColor: '#0a0f26'
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
        // borderWidth: 1,
        borderColor:'white',
        height: 200,
        width: 150,
        borderRadius: 9,
    },
    cardContainer: {
        height: 260,
    },
    searchBar: {
        backgroundColor:'#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        
        height: 40,
    },
})