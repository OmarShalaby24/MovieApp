import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Rating, Text } from 'react-native-elements';

interface Movie {
    id: number,
    backdrop_path: string,
    title: string,
    vote_average: number,
    release_date: string,
    poster_path: string,
    overview: string
}

type RootStackParamList = {
    Home: { movie: Movie };
    Details: { movie: Movie };
};

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface MovieProps {
    movie: Movie;
    navigation: HomeNavigationProp;
}

export class MovieCard extends PureComponent<MovieProps> {
    render() {
        const { movie } = this.props;
        const { navigation } = this.props;
        return (
            <TouchableOpacity style={styles.movieCard} onPress={() => navigation.navigate('Details', { movie: movie })}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}` }}
                    style={styles.cardPoster}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={styles.rate}>{Math.floor(movie.vote_average / 10 * 100)}%</Text>
                    <Rating
                        type='custom'
                        tintColor='#0e1824'
                        imageSize={15}
                        startingValue={movie.vote_average / 2}
                        ratingBackgroundColor='#0e1824'
                        ratingColor='#fe6c30'
                        readonly={true}
                    />
                </View>
                <Text style={styles.title}>{movie.title}</Text>
            </TouchableOpacity>
        )
    }
}

export class MovieListItem extends PureComponent<MovieProps> {
    render() {
        const { movie } = this.props;
        const { navigation } = this.props;
        return (
            <TouchableOpacity style={styles.searchCardContainer} onPress={() => navigation.navigate('Details', { movie: movie })} >
                <Image style={styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}` }} />
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={[styles.Title, {fontSize: 16}]}>{movie.title}</Text>
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <Text style={styles.rate}>{Math.floor(movie.vote_average / 10 * 100)}%</Text>
                        <Rating
                            type='custom'
                            tintColor='#0e1824'
                            imageSize={15}
                            startingValue={movie.vote_average / 2}
                            ratingBackgroundColor='#0e1824'
                            ratingColor='#fe6c30'
                            readonly={true}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
}
// export default MovieCard;

const styles = StyleSheet.create({
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
    rate: {
        fontSize: 12,
        color: '#e7d8c9',
        padding: 5,
    },
    searchCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10,
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

})