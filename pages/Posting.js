import * as React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  ScrollView,
  FlatList,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import { addFAQ } from '../api/FaqApi';

export default class Posts extends React.Component {
  state = {
    currentFAQname: null,
    currentFAQquest: null,
  };

  checkEmpty = () => {
    if (this.state.currentFAQname === null)
      return alert('Please Enter a Title for your Post'); // aler on empty submit
    else if (this.state.currentFAQquest === null)
      return alert('Please enter your Question/Comment'); // aler on empty submit
    else
      addFAQ({
        name: this.state.currentFAQname,
        question: this.state.currentFAQquest,
      }),
        // this.onFAQadded, //Not sure if this is necessary so double check. Might be from old implementation
        this.qustInput.clear(), //Clears our text input since we added ref={(input) => {this.qustInput = input;}}
        this.nameInput.clear(), //Clears our text input since we added ref={(input) => {this.nameInput = input;}}
        this.setState((prevState) => ({
          currentFAQname: (prevState.currentFAQname = null), // resets the value of our input to null so another input can be made
        })), // reset value to null
        this.setState((prevState) => ({
          currentFAQquest: (prevState.currentFAQquest = null), // resets the value of our input to null so another input can be made
        })), // reset value to null
        this.threeButtonAlert; //calls the threeButtonAlert constant. This is an extra think I'm doing
  };

  threeButtonAlert = () =>
    Alert.alert(
      'Contact Support',
      'MousseTeam ready for help. Have your email and information ready for verification. Thank you!',
      [
        {
          text: 'To Comments',
          onPress: () => this.props.navigation.navigate('Comments')
        },
        { text: "To Account",
          onPress: () => this.props.navigation.navigate('Account')
        },
        { text: "Home Page",
          onPress: () => this.props.navigation.navigate('Home')
        },
        {
          text: "Post Again!",
          onPress: () => console.log("Time for another post"),
          style: "cancel"
        },
      ]
    );

  
  render() {
    return (
      <ScrollView style= {styles.screenContainer}>
        <View style={styles.page}>

          <SafeAreaView>
            <View style={styles.headField}>
              <Text style={styles.headText}>Discussion Board</Text>
              <Text style={styles.subTitle}>Song of the Day?</Text>
            </View>
          </SafeAreaView>
          <View style={styles.postField}>
            <TextInput
              style={styles.inputField}
              ref={(input) => {
                this.nameInput = input;
              }}
              placeholder="Post Title"
              maxLength={100}
              multiline={true}
              value={this.state.currentFAQname}
              onChangeText={(title) =>
                this.setState((prevState) => ({
                  currentFAQname: (prevState.currentFAQname = title),
                }))
              }
            />
            <TextInput
              style={[styles.inputField, { flexGrow: 1, marginBottom: '25%' }]}
              ref={(input) => {
                this.qustInput = input;
              }}
              placeholder="What is on your mind?"
              maxLength={800}
              multiline={true}
              value={this.state.currentFAQquest}
              onChangeText={(quest) =>
                this.setState((prevState) => ({
                  currentFAQquest: (prevState.currentFAQquest = quest),
                }))
              }
            />
          </View>

          <View style={[styles.buttonView, { backgroundColor: '#4A2511' }]}>
            <Pressable title="Submit" onPress={() => this.checkEmpty()}>
              <Text style={styles.buttonText}>Post Now</Text>
            </Pressable>
          </View>
          <View style={[styles.buttonView, { backgroundColor: '#4A2511' }]}>
            <Pressable title="Submit" onPress={() => this.props.navigation.navigate('Comment')}>
              <Text style={styles.buttonText}>View Comments</Text>
            </Pressable>
          </View>

          <View style={styles.navigating}>
            <Pressable
              style={styles.navButton}
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.navText}>Home Page</Text>
            </Pressable>
            <Pressable
              style={styles.navButton}
              onPress={() => this.props.navigation.navigate('Account')}>
              <Text style={styles.navText}>Account Page</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    height: Dimensions.get('window').height,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#D6CFC7',
  },
  page: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  headField: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    fontSize: 35,
    fontWeight: '700',
    fontFamily: 'Times New Roman',
    color: '#4A2511',
  },
  subTitle: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    color: '#4A2511',
  },
  postField: {
    flex: 5,
    padding: '5%',
  },
  inputField: {
    width: '100%',
    backgroundColor: 'white',
    fontSize: 18,
    padding: '2%',
    fontFamily: 'Times New Roman',
    margin: '1%',
    flexDirection: 'row',
  },
  buttonView: {
    color: 'white',
    paddingVertical: '1%',
    paddingHorizontal: '5%',
    margin: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Times New Roman',
    fontWeight: '70',
  },
  navigating: {
    flex: 2,
    bottom: '1%',
  },
  navButton: {
    margin: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Times New Roman',
    color: 'white',
  },
});