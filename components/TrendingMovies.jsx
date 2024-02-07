import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import MovieCard from './MovieCard';

var {width, height} = Dimensions.get('window');

function TrendingMovies({data}) {
  return (
    <View style={{marginVertical: 16}}>
      <Text style={{color: 'white', fontSize: 20, marginBottom: 20, marginLeft: 12}}>
        Trending Movies
      </Text>
      <Carousel 
        data={data}
        renderItem={({item}) => <MovieCard item={item} />}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{display:'flex', alignItems:'center'}}
        listKey="TrendingMoviesCarousel" // Add this line
      />
    </View>
  )
}

export default TrendingMovies