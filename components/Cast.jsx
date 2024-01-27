import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';

function Cast({navigation, cast}) {
  let actorName = 'Tom Holland';
  let characterName = 'Spider-Man';

  return (
    <View style={{marginHorizontal: 10, marginVertical: 15}}>
      <Text style={{color: 'white', fontSize: 20, marginBottom: 25}}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{marginRight: 4, alignItems: 'center'}}
                onPress={() => navigation.navigate('Person', person)}  
              >
                  <View 
                    style={{overflow: 'hidden', height: 80, width: 80, alignItems: 'center', borderRadius: 40, borderWidth: 2, borderColor: 'solid rgb(115,115,115)', marginRight: 12,}}
                  >
                  <Image
                  style={{height:96, width:80}}
                  source={{
                    uri: 'https://th.bing.com/th?id=OSK.8472888bf564f16b81f6be3a5f973bdd&w=80&h=80&c=12&o=6&dpr=1.3&pid=SANGAM',
                  }}
                />
                  </View>
                  <Text style={{color: 'white', fontSize: 12, marginTop: 5}}>
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + '...'
                    : characterName}
                </Text>
                <Text style={{color: 'rgb(163, 163, 163)', fontSize: 12, marginTop: 5}}>
                  {actorName.length > 10
                    ? actorName.slice(0, 10) + '...'
                    : actorName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}

export default Cast;
