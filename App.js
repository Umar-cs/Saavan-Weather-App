import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useState} from 'react';
const App = () => {
  const img = {
    uri: 'https://i.pinimg.com/736x/9f/4e/38/9f4e38d4634f2b584143be34d1324c0a.jpg',
  };
  const date = new Date().toLocaleString();
  const [showForm, updateFormState] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [current, setCurrent] = useState([]);
  const [cityName, setCityName] = useState('Lahore');
  const[country,setCountry]=useState([]);
  useEffect(() => {
    weather();
  }, [weather]);
  const weather = useCallback(() => {
    fetch([
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
        cityName +
        '&appid=62fb3f8777231a25270af4bd022bcee4&units=metric',
    ])
      .then(resp => resp.json())
      .then(resp => {
        setWeatherData(resp.list);
        setCurrent(resp.list[0].main);
        setCountry(resp.city)
        
      })
      .catch(error => {
        alert(error);
      });
  }, [cityName]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={{flex: 1}} source={img}>
        <View style={styles.header}>
          <Text style={styles.txt}>{country.name} ({country.country})</Text>
          <TouchableOpacity
            onPress={() => updateFormState(true)}
            style={{marginVertical: 12}}>
            <Image source={require('./img/Modal.png')} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showForm}
          onRequestClose={() => {
            updateFormState(!showForm);
          }}>
          <View style={styles.form}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Image style={{}} source={require('./img/city.png')} />
              <TextInput
                placeholder="Enter City Name"
                value={cityName}
                onChangeText={text => setCityName(text)}
              />
            </View>
            <TouchableOpacity onPress={() => weather(updateFormState(!showForm))}>
              <Image source={require('./img/search.png')} />
            </TouchableOpacity>
          </View>
        </Modal>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <Image source={require('./img/temp.png')} />
          <Text style={{fontSize: 50, color: 'white'}}>{current.temp}°C</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            marginLeft: 15,
          }}>
          <Image source={require('./img/date.png')} />
          <Text style={{color: 'white', marginLeft: 5}}>{date}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 25}}>Weather details</Text>
          <Text style={styles.details}>Feels Like: {current.feels_like}°C</Text>
          <Text style={styles.details}>Pressure: {current.pressure}Pa</Text>
          <Text style={styles.details}>Humidty: {current.humidity}%</Text>
        </View>
        <View
          style={{
            backgroundColor: 'lightgrey',
            height: 200,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
          }}>
          <FlatList
            horizontal={true}
            data={weatherData.slice(0, 7)}
            renderItem={({item, index}) => {
              return (
                <View style={styles.list}>
                  <Image
                    style={{height: 30, width: 30}}
                    source={{
                      uri:
                        'http://openweathermap.org/img/wn/' +
                        item.weather[0].icon +
                        '.png',
                    }}
                  />
                  <Text>{item.main.temp}°C</Text>
                </View>
              );
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  form: {
    flexGrow: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 270,
    borderRadius: 20,
    elevation: 10,
    backgroundColor: 'white',
    marginHorizontal: 40,
    marginVertical: '50%',
  },
  txt: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  details: {
    color: 'white',
  },
  list: {
    backgroundColor: '#E3E3E3',
    height: 150,
    width: 90,
    borderRadius: 30,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-evenly',
    marginTop: 30,
    margin: 10,
  },
});
export default App;
