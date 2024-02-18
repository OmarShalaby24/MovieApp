import React, { useEffect } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Rating } from 'react-native-ratings';


type RootStackParamList = {
    Home: {x: string};
    Details: {movie: Movie};
}

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

interface Props {
    route: DetailsRouteProp;
    navigation: DetailsNavigationProp;
}
interface Movie {
    id: string;
    title: string;
    original_title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    release_date: string;
}
const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
    // console.log(route.params.movie)
    const { movie } = route.params;
    useEffect(() => {
        // navigation.setOptions({title: movie.title});
    }, []);

    return(
        <ScrollView style={styles.container}>
            <View style={styles.ImageContainer}>
                <ImageBackground
                    source={{uri: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.backdrop_path}`}} 
                    style={styles.movieBackDrop}
                    blurRadius={3}
                >
                    <View style={styles.overlay}></View>
                </ImageBackground>
            </View>
            <View>
                <View style={styles.card}>
                    <ImageBackground
                        source={{uri: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}}
                        style={styles.moviePoster}
                        borderRadius={10}
                        resizeMode='cover'
                    />
                    <Text style={styles.Title}>{movie.title}</Text>
                    <Text style={styles.date}>{movie.release_date}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', flexBasis: 'auto'}}>
                        <Text style={styles.rate}>{Math.floor(movie.vote_average/10*100)}%</Text>
                        <Rating
                            type='star'
                            tintColor='#0a0f26'
                            imageSize={25}
                            startingValue={movie.vote_average/2}
                            ratingBackgroundColor='#0a0f26'
                            readonly={true}
                        />
                    </View>
                    <Text style={styles.overView}>{movie.overview}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 20,
        backgroundColor: '#0a0f26'
    },
    ImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    movieBackDrop: {
        width: '100%',
        // height: '100%'
        aspectRatio: 12/9,
    },
    card: {
        // flexDirection: 'row',
        marginTop: -220,
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    moviePoster: {
        width: 170,
        aspectRatio: 11/16
    },
    Title: {
        color: 'white',
        fontSize: 26,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overView: {
        color: "#aaa"
    },
    rate: {
        color: 'white',
    },
    date: {
        fontSize: 11,
        color: '#fff'
    },


})