import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import api from "../../Services/api";
import Axios from "axios";
import styles from './styles'
import * as firebase from "firebase"


export default function Upload() {

  
  async function onChooseImagePress(){

    async function uploadImage(uri, imageName){
      const response = await fetch(uri);
      const blob = await response.blob();
      
      var ref = firebase.storage().ref().child("videos/" + imageName);
      
      return ref.put(blob);
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos
    });

    if (!result.cancelled) {
      console.log (result.exif)
      console.log (result.uri)
      uploadImage(result.uri, "Test Image")
        .then(() => {
          console.log("Sucesso")
        })


      return (
      
        <View style={styles.container}>
          <Video
                  source={{ uri: result.uri}}
                  rate={1.0}
                  volume={1.0}
                  muted={false}
                  useNativeControls={true}
                  resizeMode="cover"
                  usePoster = {true}
                  style={{ width: result.widht /4 , height: result.height / 4 }}
           />
  
          <View>
            <TouchableOpacity onPress={uploadVideo(selectedImage)} style={styles.action}>
              <Text style={styles.actionText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>)
    }
  }



 return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity onPress={onChooseImagePress} style={styles.action}>
        <Text style={styles.actionText}>Escolha o video</Text>
      </TouchableOpacity>

    </View>
  )
}
  