import React, { useEffect, useState, useRef } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Rating } from 'react-native-elements';
import axios from 'axios';
import _ from "lodash";

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
    id: number,
    backdrop_path: string,
    title: string,
    vote_average: number,
    release_date: string,
    poster_path: string,
    overview: string
}

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGE4Njg5NDhlMWY4Y2NiOWM5NTUyOTQ4ZDM3YTdkYyIsInN1YiI6IjY1Y2Y0YzBkNjBjNzUxMDE2MjY5MDk5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oH0bCtZ4lCduafIf03FEVPKqRAl0zlrSL6ku1DyRCwk';

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': '10a868948e1f8ccb9c9552948d37a7dc',
                    Authorization: `Bearer ${accessToken}`
                },
            })
            setPage(p => p + 1);
            const json = await response.json();
            // setMoviesList(old => _.union(json.results));
            setMoviesList(old => [...old, ...json.results]);
            // console.log(moviesList.length)
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    const [lastVisitedPage, setLastVisitedPage] = useState(1);
    const handleLoadMoreMovies = () => {
        if (lastVisitedPage == page) return;
        fetchMovies();
        setLastVisitedPage(page);
        // console.log('fetching page ', page);
    }

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
    const [keyword, setKeyword] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<Movie[]>([]);
    const [showSearch, setShowSearch] = useState(false);
    const searchForMovie = async () => {
        setSearchLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': '10a868948e1f8ccb9c9552948d37a7dc',
                    Authorization: `Bearer ${accessToken}`
                },
            });
            const json = await response.json();
            setSearchResult(json.results);
            setSearchLoading(false);
        } catch (error) {
            console.error(error);
            setSearchLoading(false);
        }
    }
    const handleSearch = (query: string) => {
        setKeyword(query);
        searchForMovie();
    }

    const renderSearchCard = ({ item }: { item: Movie }) => {
        return (
            <TouchableOpacity style={styles.searchCardContainer} onPress={() => navigation.navigate('Details', { movie: item })} >
                <Image style={styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}` }} />
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={styles.Title}>{item.title}</Text>
                    <Text style={styles.rate}>{item.vote_average}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const searchRef = useRef<TextInput>(null);
    const handleFocus = () => {
        if (searchRef.current) {
            setShowSearch(true);
            searchRef.current.focus();
            setShowCancelSearchButton(true);
        }
    }
    const handleBlur = () => {
        if (searchRef.current) {
            setShowSearch(false);
            searchRef.current.blur();
            Keyboard.dismiss();
        }
    }
    const [showCancelSearchButton ,setShowCancelSearchButton] = useState(false);
    const handelCancel = () => {
        setShowCancelSearchButton(false);
        setKeyword('');
        setSearchResult([]);
        handleBlur();
    }
    return (
        <SafeAreaView style={styles.container}>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    ref={searchRef}
                    onFocus={handleFocus}
                    style={[styles.searchBar, {flex: 1}]}
                    placeholder='Search'
                    clearButtonMode='while-editing'
                    cursorColor={"#fe6c30"}
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={keyword}
                    placeholderTextColor={'#e7d8c9'}
                    onChangeText={(query) => handleSearch(query)}
                />{showCancelSearchButton?
                <TouchableOpacity style={{position: 'absolute', right: 30, top: 9, backgroundColor: '#0e1824', width: 20, height: 20, alignItems: 'center',borderRadius: 10, paddingTop: -1}} onPress={handelCancel}>
                    <Text style={{color: '#1f2c3c'}}>ⓧ</Text>
                </TouchableOpacity>
                : null
                }
            </View>
            {showSearch ?
                <SafeAreaView>
                    <FlatList
                        data={searchResult}
                        renderItem={renderSearchCard}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
                :
                <View>
                    {loading && moviesList.length == 0 ? (
                        <View style={[{ justifyContent: "center", alignItems: "center", height: 50 }]}>
                            <ActivityIndicator size={'large'} color={'#fe6c30'} />
                        </View>
                    ) : null}
                    <View style={styles.cardContainer}>
                        <FlatList
                            data={moviesList}
                            focusable={true}
                            horizontal={true}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            onEndReached={handleLoadMoreMovies}
                            onEndReachedThreshold={0.1}
                            initialNumToRender={20}
                            maxToRenderPerBatch={20}
                            ListFooterComponent={!loading ?
                                <View style={[{ justifyContent: "center", alignItems: "center", height: 50, marginVertical: 80 }]}>
                                    <ActivityIndicator size={'large'} color={'#fe6c30'} />
                                </View>
                                : null}
                        />

                    </View>
                </View>
            }
        </SafeAreaView>
    );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#0e1824',
        paddingHorizontal: 10
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
        borderWidth: 0,
        paddingHorizontal: 10,
        // paddingVertical: 5,
        marginHorizontal: 20,
        height: 40,
        // width: '100%',
        color: "#fbfcfb"
    },
    rate: {
        fontSize: 12,
        color: '#e7d8c9',
        padding: 5,
    },
    poster: {
        width: 50,
        aspectRatio: 12 / 16,
        borderRadius: 8,

    },
    Title: {
        fontSize: 18,
        color: '#fbfcfb'
    },
    searchCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
})