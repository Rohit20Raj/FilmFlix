import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/movieDB';

var {width, height} = Dimensions.get('window');

function MovieScreen() {
  const {params: item} = useRoute();
  const navigation = useNavigation();

  const [favourite, setFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  // const Movie = 'Spider-Man: No Way Home';

  useEffect(() => {
    // Call the movie details api
    // console.log('item.id: ', item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async id=>{
    const data = await fetchMovieDetails(id);
    // console.log('Got Movie details: ', data);
    if(data){
      setMovie(data);
    }
    setLoading(false);
  }

  const getMovieCredits = async id=>{
    const data = await fetchMovieCredits(id);
    // console.log("Got movie credits", data);
    if(data && data.cast){
      setCast(data.cast);
    }
  }

  const getSimilarMovies = async id=>{
    const data = await fetchSimilarMovies(id);
    // console.log("Similar movies: ", data);
    if(data && data.results){
      setSimilarMovies(data.results);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 15}}
      style={{flex: 1, backgroundColor: 'rgb(38,38,38)'}}>
      {/* back button and movie poster */}
      <View style={{width: '100%'}}>
        <SafeAreaView
          style={{
            position: 'absolute',
            zIndex: 20,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{backgroundColor: '#eab308', borderRadius: 12, padding: 5}}>
            <ChevronLeftIcon size={30} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFavourite(!favourite)}>
            <HeartIcon size={35} color={favourite ? 'red' : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>

        {
          loading ? <Loading/> :
            <View>
              <Image
                source={{
                  // uri: 'https://www.movienewsletters.net/photos/316709R1.jpg',
                  uri: image500(movie?.poster_path) || 'https://www.movienewsletters.net/photos/316709R1.jpg'
                }}
                style={{
                  width,
                  height: height * 0.55,
                }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(38,38,38,0.8)', 'rgba(38,38,38,1)']}
                style={{
                  width,
                  height: height * 0.2,
                  position: 'absolute',
                  bottom: 0,
                }}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
              />
            </View>
        }
      </View>
      {/* movie details */}
      <View style={{marginTop: -(height * 0.09), marginVertical: 10}}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: '800',
            letterSpacing: 2,
            marginTop: 35
          }}>
          {movie?.title}
        </Text>
        {movie?.id ? 
        (<Text
          style={{
            color: 'rgb(163, 163, 163)',
            fontWeight: '600',
            fontSize: 16,
            textAlign: 'center',
            marginVertical: 10,
          }}>
          {/* Released ● 2020 ● 170 min */}
          {movie?.status} ● {movie?.release_date?.split('-')[0]} ● {movie?.runtime} min
        </Text>) : null
        }

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 10,
            paddingHorizontal: 5,
          }}>
            {movie?.genres?.map((genre, index)=>{
              let showDot = index+1 != movie.genres.length;
              return(
                <Text
                  style={{
                    color: 'rgb(163, 163, 163)',
                    fontWeight: '600',
                    fontSize: 16,
                    textAlign: 'center',
                    marginVertical: 10,
            }}>
            {genre?.name} {showDot ? ' ● ' : ''}
          </Text>
              )
            })}
          {/* <Text
            style={{
              color: 'rgb(163, 163, 163)',
              fontWeight: '600',
              fontSize: 16,
              textAlign: 'center',
              marginVertical: 10,
            }}>
            Action ●{' '}
          </Text>
          <Text
            style={{
              color: 'rgb(163, 163, 163)',
              fontWeight: '600',
              fontSize: 16,
              textAlign: 'center',
              marginVertical: 10,
            }}>
            Thrill ●{' '}
          </Text>
          <Text
            style={{
              color: 'rgb(163, 163, 163)',
              fontWeight: '600',
              fontSize: 16,
              textAlign: 'center',
              marginVertical: 10,
            }}>
            Comedy
          </Text> */}
        </View>
        <Text
          style={{
            color: 'rgb(163, 163, 163)',
            fontSize: 16,
            marginLeft: 15,
            letterSpacing: 1,
            lineHeight: 20,
          }}>
          {movie?.overview}
        </Text>
      </View>

      {/* Cast */}
      {cast.length>0 && <Cast navigation={navigation} cast={cast} />}

      {/* Similar Movies */}
      {similarMovies.length>0 && <MovieList data={similarMovies} title={'Similar Movies'} seeAll={false}  />}
    </ScrollView>
  );
}

export default MovieScreen;
