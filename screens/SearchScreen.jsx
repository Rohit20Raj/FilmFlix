import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'
import Loading from '../components/Loading'
import { debounce } from 'lodash'
import { image185, searchMovies } from '../api/movieDB'

const {width, height} = Dimensions.get('window');

function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    let movieName = 'Wonder Woman (2017)';
    const handleSearch = search=>{
        if(search && search.length>2){
            setLoading(true);
            searchMovies({
                query: search,
                include_adult: true,
                page: '1'
            }).then(data=>{
                // console.log('got search results: ', data);
                setLoading(false);
                if(data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([])
        }
      }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView style={{backgroundColor: '#1f2937', flex: 1}}>
        <View style={{ marginTop: 10 ,marginHorizontal: 10, marginBottom: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: '#737373', borderWidth: 2, borderRadius: 30}}>
            <TextInput
                onChangeText={handleTextDebounce}
                placeholder='Search Movie...'
                placeholderTextColor='lightgray'
                style={{padding: 10, paddingLeft: 20, flex: 1, color: 'white', fontSize: 20, fontWeight: '500'}}
            />
            <TouchableOpacity
                onPress={()=>navigation.navigate('Home')}
                style={{padding: 3, margin: 4, backgroundColor: '#737373', borderRadius: 30}}
            >
                <XMarkIcon size={40} color={'white'}/>
            </TouchableOpacity>
        </View>

        {/* Results */}
        {
            results.length>0 ? (                
            <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 15, marginVertical: 10}}
                >
                    <Text style={{color: 'white', fontWeight: '500'}}>Results ({results.length})</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        {
                            results.map((item, index)=>{
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={()=>navigation.push("Movie", item)}
                                    >
                                        <View style={{marginHorizontal: 2}}>
                                            <Image
                                                source={{
                                                    // uri: 'https://m.media-amazon.com/images/M/MV5BMTYzODQzYjQtNTczNC00MzZhLTg1ZWYtZDUxYmQ3ZTY4NzA1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg'
                                                    uri: image185(item?.poster_path)
                                                }}
                                                style={{
                                                    height: height*0.3,
                                                    width: width*0.44,
                                                    borderRadius: 20
                                                }}
                                            />
                                            <Text style={{color: '#d1d5db', textAlign: 'center', marginHorizontal: 2}}>
                                                {
                                                    item?.title.length>20 ? item?.title.slice(0, 20)+'...' : item?.title
                                                }
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
             </ScrollView>
             ):(
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                        source={require('../assets/movieTime.png')}
                        style={{height: 400, width: 400}}
                    />
                </View>
             )
        }
    </SafeAreaView>
  )
}

export default SearchScreen