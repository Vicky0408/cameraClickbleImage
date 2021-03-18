import 'react-native-gesture-handler';
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  PermissionsAndroid,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import RNFetchBlob from "rn-fetch-blob"
import { RNCamera } from 'react-native-camera';

const CameraScreen =()=> {
  let cameraRef = useRef(null);
  const [camType, setCamType] = useState(RNCamera.Constants.Type.back);
  const [flash,setFlash] = useState(RNCamera.Constants.FlashMode.off)

    const [img, setImg] = useState({})
  //const [video,setVideo] = useState({})
//Permmision storage
  const requestStrogePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to memory to download the file "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Permission granted","Now you can download anything!");
      } else {
        Alert.alert(
          "Permission Denied!",
          "You need to give storage permission to download the file"
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }
  //End of permmission storage   
  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      setImg(data.uri)
    }
  };
  /// Path Of Image
  const saveImage = () =>{
      const folderPath = '/storage/0/youtub';
      const filePath = folderPath + '/' + img;
      RNFetchBlob.fs.isDir(folderPath).then((isDir) => {
        if(isDir){
          this.addImage(data.source,folderPath);
          
        }else{
          RNFetchBlob.fs.mkdir(folderPath).then(()=>{
            this.addImage(data.source, folderPath);
          })
        }
      });
      
  }
  // End path of Image
  //Save Image
  const addImage = ({data.source,folderPath})=>{

  }
  // End of Save Image
  const flipCamera = () =>{
    if(camType===RNCamera.Constants.Type.back){
      setCamType(RNCamera.Constants.Type.front)
    }else{
      setCamType(RNCamera.Constants.Type.back)
    }
  }
  const togglefalsh =() =>{
    if(flash===RNCamera.Constants.FlashMode.off){
      setFlash(RNCamera.Constants.FlashMode.on)
    }else{
      setFlash(RNCamera.Constants.FlashMode.off)
    }
  }


    return (
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={camType}
          flashMode={flash}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          
          
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={()=> togglefalsh()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> flash </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> takePicture()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> flipCamera()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> type </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={requestStrogePermission} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> permission </Text>
          </TouchableOpacity>

         

        </View>
        <Image
              source={{ uri:img }}
              style={{ width: 40, height: 80 }}
          />
      </View>
    );
      
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  image:{
    height:80,
    width: 100,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});



export default CameraScreen;
