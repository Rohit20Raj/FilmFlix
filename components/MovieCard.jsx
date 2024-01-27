import React from 'react'
import { TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

var {width, height} = Dimensions.get('window');

const MovieCard = ({item}) => {
  const navigation = useNavigation();
  
  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  }
  
  return (
    <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
      <Image
          source={{uri: 'https://th.bing.com/th/id/OIP.k9E3rIVx6eYG8I4ubuWxCAHaJQ?rs=1&pid=ImgDetMain'}}        
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
