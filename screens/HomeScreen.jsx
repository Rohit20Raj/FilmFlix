import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, Text, StatusBar, TouchableOpacity } from 'react-native'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import {useNavigation, useRoute} from '@react-navigation/native';
import SearchScreen from './SearchScreen';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/movieDB';

function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, [])
  
  const getTrendingMovies = async() => {
    const data = await fetchTrendingMovies();
    // console.log('Got trending movies: ', data);
    if(data && data.results) setTrending(data.results);
    setLoading(false);
  }
  const getUpcomingMovies = async() => {
    const data = await fetchUpcomingMovies();
    // console.log('Got trending movies: ', data);
    if(data && data.results) setUpcoming(data.results);
    // setLoading(false);
  }
  const getTopRatedMovies = async() => {
    const data = await fetchTopRatedMovies();
    // console.log('Got top rated movies: ', data);
    if(data && data.results) setTopRated(data.results);
    // setLoading(false);
  }

  const navigation = useNavigation();

  return (
    <View style={styles.background}>

      <SafeAreaView style={styles.mb_3} >
        <StatusBar barStyle='light' />
        <View style={styles.heading}>
        <Bars3CenterLeftIcon size={30} strokeWidth={2} color='white' />
          <Text style={styles.brand}>
            <Text style={{color:'gold'}}>F</Text>
            ilm
            <Text style={{color:'gold'}}>F</Text>
            lix
          </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search', SearchScreen)}>
          <MagnifyingGlassIcon size={30} strokeWidth={2} color='white' />
        </TouchableOpacity>
        </View>
      </SafeAreaView>
       {
        loading ? <Loading/> :
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}
        >
          {/* Trending movies carousel */}
          {trending.length>0 && <TrendingMovies data={trending}/>}
          
          {/* Upcoming movies carousel */}
          {upcoming.length>0 && <MovieList  data={upcoming} title="Upcoming" seeAll={true} />}
          {/* Top rated movies carousel */}
          {topRated.length>0 && <MovieList  data={topRated} title="Top Rated" seeAll={true} />}
        </ScrollView>
       }
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgb(38,38,38)',
  },
  mb_3: {
    marginBottom: 3,
  }, 
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
    marginTop: 10,
  },
  brand: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default HomeScreen