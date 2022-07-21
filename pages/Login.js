import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import 'firebase/auth';

const webPreviewWidth = 300;
const webPreviewHeight = 550;
const screenWidth =
  Platform.OS === 'web' ? webPreviewWidth : Dimensions.get('screen').width;
const screenHeight =
  Platform.OS === 'web'
    ? webPreviewHeight
    : Dimensions.get('screen').height - Constants.statusBarHeight;

const Login = ({ navigation }) => {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection('users');
        alert('Logged In');
        navigation.navigate('Home');
      })

      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.contentCenter}>
        <Text
          style={[
            styles.pageTitle,
            {
              border: 'solid',
              borderWidth: 2,
              borderColor: '#4A2511',
            },
          ]}>
          {' '}
          Our Music Diary{' '}
        </Text>
        <View style={styles.spacePadding}>
          <Text style={styles.textStyle}>Login to start journaling!</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(username) => onChangeUsername(username)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(password) => onChangePassword(password)}
          secureTextEntry={true}
        />
        <Pressable style={styles.spacePadding} onPress={() => onLoginPress()}>
          <Text style={styles.textStyle}> Login</Text>
        </Pressable>
        <Pressable
          style={styles.spacePadding1}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.textStyle}> Sign Up </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Login;

const styles = StyleSheet.create({
  screenContainer: {
    height: screenHeight,
    width: screenWidth,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#D6CFC7',
  },
  spacePadding: {
    paddingTop: 40,
  },
  spacePadding1: {
    paddingTop: 20,
  },
  textStyle: {
    fontFamily: 'Times New Roman',
    fontSize: 16,
    color: '#4A2511',
  },
  pageTitle: {
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    color: '#4A2511',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1.4,
    width: 160,
    backgroundColor: 'white',
    marginTop: 20,
    fontFamily: 'Times New Roman',
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
