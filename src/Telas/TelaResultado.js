import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, FlatList, Image, Dimensions } from 'react-native';

import API_KEY from '../API_KEY';
import axios from 'axios';



export default function TelaResultado({ route, navigation }) {
  const escolha = route.params.escolha
  const link = `http://api.giphy.com/v1/${escolha}/search`

  const [text, setText] = useState('')
  const [dados, setDados] = useState([])


  const solicitarDados = async (text) => {
    try {
      const resultado = await axios.get(link, {
        params: {
          api_key: API_KEY,
          q: text
        }
      })
      
      setDados(resultado.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/BG.png')}
      style={styles.container}
    >
      <Cabecalho
        navigation={navigation}
        text={text}
        setText={setText}
        solicitarDados={solicitarDados}
      />
      <FlatList
        data={dados}
        renderItem={({ item }) => {
          console.log(item.images.preview_gif.url)
          return (
               <Image
                style={styles.image}
                source={{ uri: item.images.preview_gif.url }} />
            
             

          )
        }}
      />


    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 300,
    height: 300
  }
});
