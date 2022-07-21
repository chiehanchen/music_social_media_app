import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  Button,
  Linking,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';

const webPreviewWidth = 300;
const webPreviewHeight = 550;
const screenWidth =
  Platform.OS === 'web' ? webPreviewWidth : Dimensions.get('screen').width;
const screenHeight =
  Platform.OS === 'web'
    ? webPreviewHeight
    : Dimensions.get('screen').height - Constants.statusBarHeight;
import icon2 from '../assets/smile.png';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const Account = ({ navigation }) => {
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');
  React.useEffect(() => userInfo());

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        alert('You have signed out');
        navigation.navigate('Login');
        
      })
      .catch((error) => {
        alert(error);
      });
  };

  const userInfo = () => {
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          var data = doc.data();
          setFirst(data.firstName);
          setLast(data.lastName);
          setEmail(data.email);
        }
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.contentCenter}>
        <Image style={styles.tinyLinkLogo} source={icon2} />
        <View style={styles.spacePadding}>
          <Text> <Text style={styles.userDetailFieldText}> First Name: {first} </Text> <Text style={styles.userDetailText}> {first} </Text> </Text>
          <View style={styles.spacePadding1}>
          <Text> <Text style={styles.userDetailFieldText}> Last Name: </Text> <Text style={styles.userDetailText}> {last} </Text> </Text>
          </View>
          <View style={styles.spacePadding1}>
          <Text> <Text style={styles.userDetailFieldText}> Email: </Text> <Text style={styles.userDetailText}> {email} </Text> </Text>
          </View>
          <View style={styles.contentCenter}>
          <Pressable
            style={styles.spacePadding}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.navText}> Go to Home</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Posting')}>
            <Text style={styles.navText}> Go to Posts</Text>
          </Pressable>
          <Pressable onPress={() => signOutUser()}>
            <Text style={styles.navText}>Logout</Text>
          </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  spacePadding: {
    marginTop: 40,
  },
  spacePadding1: {
    marginTop: 15,
  },
  userDetailFieldText: {
    marginTop: 15,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#4A2511'
  },
  userDetailText: {
    marginTop: 15,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#522f17'
  },
  navText: {
    marginTop: 15,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white'
  },
  pfp: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'beige',
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    height: screenHeight,
    width: screenWidth,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#D6CFC7',
  },
});
