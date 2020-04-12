import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import styles from './styles'
import api from "../../Services/api";


function uploadVideo(uploadedFile){
  const data = new FormData();

  data.append("file", uploadedFile.localUri, uploadedFile.name);
  console.log(uploadedFile.localUri),
  console.log(uploadedFile.name),
  api.post("upload", data);

}     

export default function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
 
  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Videos,});

    if (pickerResult.cancelled === true) {
      return;
    }
   
    setSelectedImage({ 
      localUri: pickerResult.uri,
      name: "videoteste",
      type: pickerResult.type,
      widht: pickerResult.width,
      height: pickerResult.height,
      destination: 'teste'
      });
    
    
  };

  if (selectedImage !== null) {
    return (
      
      <View style={styles.container}>
        <Video
                source={{ uri: selectedImage.localUri}}
                rate={1.0}
                volume={1.0}
                muted={false}
                useNativeControls={true}
                resizeMode="cover"
                usePoster = {true}
                style={{ width: selectedImage.widht /4 , height: selectedImage.height / 4 }}
         />

        <View>
          <TouchableOpacity onPress={uploadVideo(selectedImage)} style={styles.action}>
            <Text style={styles.actionText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.action}>
        <Text style={styles.actionText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}
