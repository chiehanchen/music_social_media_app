import * as React from 'react';
import Constants from 'expo-constants';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Button,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const webPreviewWidth = 300;
const webPreviewHeight = 550;
const screenWidth =
  Platform.OS === 'web' ? webPreviewWidth : Dimensions.get('screen').width;
const screenHeight =
  Platform.OS === 'web'
    ? webPreviewHeight
    : Dimensions.get('screen').height - Constants.statusBarHeight;

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onSignupPress = () => {
    if (password != confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          firstName,
          lastName,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            alert('Account Created!');
            navigation.navigate('Home');
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.pageTitle}>Sign Up</Text>
      <Text style={styles.textStyle}> Sign up to join our family! </Text>
      <View style={styles.spacePadding}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(firstName) => setFirstName(firstName)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(lastName) => setLastName(lastName)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        value={confirmPassword}
      />
      </View>
      <View style={styles.contentCenter}>
        <Pressable style={styles.spacePadding} onPress={() => onSignupPress()}>
          <Text style={styles.textStyle}> Sign Up </Text>
        </Pressable>
        <Pressable style={styles.spacePadding1} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textStyle}> Back to Login </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Signup;

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
  pageTitle: {
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    color: '#4A2511',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1.4,
    width: 280,
    backgroundColor: 'white',
    textAlign: 'left',
    paddingLeft: 12,
    marginBottom: 20,
    alignSelf: 'center',
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle:{
    fontFamily: 'Times New Roman',
    fontSize: 16,
    color: '#4A2511',
  },
});
