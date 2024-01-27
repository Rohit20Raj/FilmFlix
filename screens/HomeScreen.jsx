import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, Text, StatusBar, TouchableOpacity } from 'react-native'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';

function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3, 4, 5, 6]);
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5, 6]);
  const [topRated, setTopRated] = useState([1, 2, 3, 4, 5, 6]);

  return (
    <View style={styles.background}>

      <SafeAreaView style={styles.mb_3} >
        <StatusBar barStyle='light' />
        <View style={styles.heading}>
        <Bars3CenterLeftIcon size={30} strokeWidth={2} color='white' />
          <Text style={styles.brand}>
            <Text style={{color:'gold'}}>M</Text>
            ovies
          </Text>
        <TouchableOpacity>
          <MagnifyingGlassIcon size={30} strokeWidth={2} color='white' />
        </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
      >
        {/* Trending movies carousel */}
        <TrendingMovies data={trending}/>
        {/* Upcoming movies carousel */}
        <MovieList  data={upcoming} title="Upcoming" seeAll={true} />
        {/* Top rated movies carousel */}
        <MovieList  data={topRated} title="Top Rated" seeAll={true} />
      </ScrollView>
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