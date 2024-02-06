import React, {useState, useEffect} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {useNavigation, useRoute} from '@react-navigation/native';
import MovieList from '../components/MovieList';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Loading from '../components/Loading';
import { fetchPersonDetails, fetchPersonMovies, image342 } from '../api/movieDB';

var {width, height} = Dimensions.get('window');

function PersonScreen() {
  const {params: item} = useRoute();
  const [favourite, setFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    // console.log('person: ', item);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);
  
  const getPersonDetails = async id=>{
    const data = await fetchPersonDetails(id);
    if(data){
      setPerson(data);
    }
    setLoading(false);
  }

  const getPersonMovies = async id=>{
    const data = await fetchPersonMovies(id);
    if(data && data.cast){
      setPersonMovies(data.cast);
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'rgb(38,38,38)',
      }}
      contentContainerStyle={{paddingBottom: 20}}>
      {/* back and favourite buttons */}
      <SafeAreaView
        style={{
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

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: {width: 0, height: 5},
              shadowOpacity: 1,
            }}>
            <View
              style={{
                alignItems: 'center',
                borderRadius: 150,
                overflow: 'hidden',
                height: 300,
                width: 300,
                borderColor: 'rgb(115,115,115)',
                borderWidth: 4,
              }}>
              <Image
                style={{height: height * 0.43, width: width * 0.73}}
                source={{
                  // uri: 'https://th.bing.com/th?id=OSK.8472888bf564f16b81f6be3a5f973bdd&w=80&h=80&c=12&o=6&dpr=1.3&pid=SANGAM',
                  uri: image342(person?.profile_path)
                }}
              />
            </View>
          </View>
        </View>
      )}
      <View style={{marginTop: 6}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          {person?.name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'rgb(115,115,115)',
            fontSize: 20,
          }}>
          {person?.place_of_birth}
        </Text>
      </View>
      {/* Person details */}

      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 20,
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'rgb(64, 64, 64)',
          borderRadius: 35,
        }}>
        <View
          style={{
            borderRightWidth: 3,
            borderColor: 'rgb(163,163,163)',
            paddingRight: 20,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: '600', marginBottom: 3}}>
            Gender
          </Text>
          <Text style={{color: '#d4d4d4'}}>{person?.gender == '2' ? "Male" : "Female"}</Text>
        </View>
        <View
          style={{
            borderRightWidth: 3,
            borderColor: 'rgb(163,163,163)',
            paddingRight: 20,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: '600', marginBottom: 3}}>
            Birthday
          </Text>
          <Text style={{color: '#d4d4d4'}}>{person.birthday}</Text>
        </View>
        <View
          style={{
            borderRightWidth: 3,
            borderColor: 'rgb(163,163,163)',
            paddingRight: 20,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: '600', marginBottom: 3}}>
            Known for
          </Text>
          <Text style={{color: '#d4d4d4'}}>{person.known_for_department}</Text>
        </View>
        <View style={{paddingHorizontal: 2, alignItems: 'center'}}>
          <Text style={{color: 'white', fontWeight: '600', marginBottom: 3}}>
            Popularity
          </Text>
          <Text style={{color: '#d4d4d4'}}>{person.popularity?.toFixed(2)}%</Text>
        </View>
      </View>
      <View style={{marginHorizontal: 4}}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            marginHorizontal: 10,
            marginBottom: 5,
          }}>
          Biography
        </Text>
        <Text
          style={{
            color: 'rgb(163, 163, 163)',
            fontSize: 16,
            marginHorizontal: 10,
            letterSpacing: 1,
            lineHeight: 20,
          }}>
          {person?.biography}
        </Text>
      </View>


      {personMovies.length>0 && <MovieList data={personMovies} title={'Movies'} seeAll={false} />}
    </ScrollView>
  );
}

export default PersonScreen;
