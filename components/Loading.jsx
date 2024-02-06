import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const {width, height} = Dimensions.get('window');
const Loading = () => {
  return (
    <View style={{ width, height, position:'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <Progress.CircleSnail thickness={12} size={160} duration={500} color={'gold'} />
    </View>
  )
}

export default Loading