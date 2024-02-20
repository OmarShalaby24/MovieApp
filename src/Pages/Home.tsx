import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Rating } from 'react-native-elements';
import SearchBar from '../Components/SearchBarComponent'
import axios from 'axios';
// import { Rating } from 'react-native-ratings';


type RootStackParamList = {
    Home: { x: string };
    Details: { movie: Movie };
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
// let pageNo = 1;
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGE4Njg5NDhlMWY4Y2NiOWM5NTUyOTQ4ZDM3YTdkYyIsInN1YiI6IjY1Y2Y0YzBkNjBjNzUxMDE2MjY5MDk5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oH0bCtZ4lCduafIf03FEVPKqRAl0zlrSL6ku1DyRCwk';

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    let [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const fetchMovies = async () => {
        setLoading(true);
        await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': '10a868948e1f8ccb9c9552948d37a7dc',
                Authorization: `Bearer ${accessToken}`
            },
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result.results.length);
                // console.log(JSON.stringify(result.results))
                setMoviesList(data => [...data, ...result.results]);
                setPage(p => p +1);
            })
            .catch(err => console.error('error:' + err));
        setLoading(false);
        // console.log(moviesList);
    }
    const handleLoadMoreMovies = () => {
        fetchMovies();
        console.log('fetching page ',page);
    }
    useEffect(() => {
        fetchMovies();
    }, []);

    const renderItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity style={styles.movieCard} onPress={() => navigation.navigate('Details', { movie: item })}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}` }}
                style={styles.cardPoster}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Text style={styles.rate}>{Math.floor(item.vote_average / 10 * 100)}%</Text>
                <Rating
                    type='custom'
                    tintColor='#0e1824'
                    imageSize={15}
                    startingValue={item.vote_average / 2}
                    ratingBackgroundColor='#0e1824'
                    ratingColor='#fe6c30'
                    readonly={true}
                />
            </View>
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );
    return(
        <SafeAreaView style={styles.container}>
            <View style={{ paddingBottom: 20 }}>
                <TextInput
                    style={styles.searchBar}
                    placeholder='Search'
                    clearButtonMode='while-editing'
                    cursorColor={"#fe6c30"}
                    autoCapitalize='none'
                    autoCorrect={false}
                    // value={searchQuery}
                    placeholderTextColor={'#fbfcfb'}
                // onChangeText={(query) => updateSearchBar(query)}
                />
            </View>
            <View>
                {loading && moviesList.length==0 ? (
                    <View style={[{ justifyContent: "center", alignItems: "center", height: 50}]}>
                        <ActivityIndicator size={'large'} color={'#fe6c30'} />
                    </View>
                ) :null}
                <View style={styles.cardContainer}>
                    <FlatList
                        data={moviesList}
                        focusable={true}
                        horizontal={true}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        // nestedScrollEnabled={true}
                        onEndReached={() => { handleLoadMoreMovies() }}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={loading?null:
                            <View style={{paddingVertical: 100,}}>
                                <ActivityIndicator size={'large'} color={'#fe6c30'}/>
                            </View>
                    }
                    />
                    
                </View>
            </View>
        </SafeAreaView>
    );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#0e1824'
    },
    item: {
        backgroundColor: 'red',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        padding: 5,
        fontSize: 14,
        flexWrap: 'wrap',
        color: '#fbfcfb',
    },
    movieCard: {
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 16,
        width: 150
    },
    cardPoster: {
        // borderWidth: 1,
        borderColor: '#e7d8c9',
        height: 220,
        width: 150,
        borderRadius: 9,
    },
    cardContainer: {
        height: 350,
    },
    searchBar: {
        backgroundColor: '#1f2c3c',
        borderRadius: 8,
        borderColor: '#e7d8c9',
        // borderWidth: 1,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        height: 40,
    },
    rate: {
        fontSize: 12,
        color: '#fbfcfb',
        padding: 5,
    }
})