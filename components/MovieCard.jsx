import React from 'react'
import { TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/movieDB';

var {width, height} = Dimensions.get('window');

const MovieCard = ({item}) => {
  const navigation = useNavigation();
  
  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  }
  // console.log('item.poster_path: ', item.poster_path);
  return (
    <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
      <Image
          // source={{uri: 'https://th.bing.com/th/id/OIP.k9E3rIVx6eYG8I4ubuWxCAHaJQ?rs=1&pid=ImgDetMain'}}        
          source={{uri: image500(item.poster_path)}}
          style={{
          width: width*0.6,
          height: height*0.4,
          borderRadius: 30,
        }}
      />
    </TouchableWithoutFeedback>
  )
}

export default MovieCard
