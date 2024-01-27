import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Image,
} from 'react-native';

var {width, height} = Dimensions.get('window');

function MovieList({data, title, seeAll}) {
  let movieName = 'The Avengers';
  const navigation = useNavigation();
  return (
    <View style={{marginVertical: 25}}>
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 20}}>{title}</Text>
        {seeAll && <TouchableWithoutFeedback>
          <Text style={{color: 'gold', fontSize: 20}}>See All</Text>
        </TouchableWithoutFeedback>}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}>
              <View style={{marginTop: 10, marginRight: 20}}>
                <Image
                  source={{
                    uri: 'https://image.tmdb.org/t/p/original/mhc5CvIZBN08cytjaZMbncw4v5u.jpg',
                  }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                    borderRadius: 30,
                  }}
                />
                <Text style={{color: 'white', marginLeft: 30}}>
                  {movieName.length > 14
                    ? movieName.slice(0, 14) + '...'
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default MovieList;
