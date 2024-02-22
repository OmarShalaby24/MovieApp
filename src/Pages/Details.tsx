import React, { useEffect } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Rating } from 'react-native-elements';

type RootStackParamList = {
    // Home: {x: string};
    Details: {movie: Movie};
}

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
// type DetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

interface Props {
    route: DetailsRouteProp;
    // navigation: DetailsNavigationProp;
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

const DetailsScreen: React.FC<Props> = ({route}) => {
    const { movie } = route.params;
    useEffect(() => {
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
                            type='custom'
                            tintColor='#0e1824'
                            imageSize={25}
                            startingValue={movie.vote_average/2}
                            ratingBackgroundColor='#0e1824'
                            ratingColor='#fe6c30'
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
        backgroundColor: '#0e1824'
    },
    ImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    movieBackDrop: {
        width: '100%',
        aspectRatio: 12/9,
    },
    card: {
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
        color: "#c2c9d5"
    },
    rate: {
        color: '#fe6c30',
    },
    date: {
        fontSize: 11,
        color: '#fff'
    },


})