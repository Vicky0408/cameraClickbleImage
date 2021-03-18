import React from 'react';
import {View, Text} from 'react-native'
import { mogoUrl } from './src/key';
import CameraScreen from './src/cameraScreen'

const App =() =>{
  
  return(
    <View style={{flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',}}>
        <CameraScreen />
    </View>
    
  )
};

export default App;