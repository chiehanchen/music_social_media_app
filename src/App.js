import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native';

import Constants from 'expo-constants';
import Home from './screens/Home';
import Posting from './screens/Posting';
import Account from './screens/Account';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Comment from './screens/Comment';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import firebase JS SDK
import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
 if (!firebase.apps.length) {
  const firebaseConfig = {
  apiKey: "AIzaSyD8EOMlz_kqEqoupl4tI7AM8VrODDpstJU",
  authDomain: "c2capp-43a68.firebaseapp.com",
  projectId: "c2capp-43a68",
  storageBucket: "c2capp-43a68.appspot.com",
  messagingSenderId: "775922095792",
  appId: "1:775922095792:web:fbc649ebe9d7eb99d50d75",
  measurementId: "G-93X1FMQ1KC"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

const webPreviewWidth = 300;
const webPreviewHeight = 550;
const screenWidth =
  Platform.OS === 'web' ? webPreviewWidth : Dimensions.get('screen').width;
const screenHeight =
  Platform.OS === 'web'
    ? webPreviewHeight
    : Dimensions.get('screen').height - Constants.statusBarHeight;
    
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer screenOptions={{ headerMode: 'none' }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ animationEnabled: false, headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Posting" component={Posting} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Comment" component={Comment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;