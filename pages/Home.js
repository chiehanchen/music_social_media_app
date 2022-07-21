import * as React from 'react';
import { useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  Linking,
  Alert,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import icon1 from '../assets/heartbreak.png';
import icon2 from '../assets/smile.png';
import icon3 from '../assets/hype.png';
const webPreviewWidth = 300;
const webPreviewHeight = 550;
const screenWidth =
  Platform.OS === 'web' ? webPreviewWidth : Dimensions.get('screen').width;
const screenHeight =
  Platform.OS === 'web'
    ? webPreviewHeight
    : Dimensions.get('screen').height - Constants.statusBarHeight;

const moodyplaylist =
  'https://open.spotify.com/playlist/2aZkEXdXiBTFKmPG2q4bG9?si=d2076b24d2694619';
const jamplaylist =
  'https://open.spotify.com/playlist/0jnEuByNu7d3g9ca6iBlvI?si=e6939a522f1f4ef5';
const chillplaylist =
  'https://open.spotify.com/playlist/25Se46oTfaWAD9TSaLSLRu?si=83a3ea8036fd49e6';

const ExternalLink = (props) => {
  const { url, children, style = {} } = props;

  const onPress = () =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.linkButton, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default class Home extends React.Component {
  render() {
    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.pageTitle}>Get the Music Started</Text>

        <View style={styles.linkContainer}>
          <Text style={styles.pageIntro}>
            {' '}
            Let's get some music started before jumping into the checking out
            what's new in the discussions today! Choose a playlist below by
            clicking on the image that reflects your mood right now!{' '}
          </Text>
        </View>
        <View style={styles.container}>
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://open.spotify.com/playlist/2aZkEXdXiBTFKmPG2q4bG9?si=d2076b24d2694619'
                )
              }>
              <Image style={styles.tinyLinkLogo} source={icon1} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://open.spotify.com/playlist/25Se46oTfaWAD9TSaLSLRu?si=83a3ea8036fd49e6'
                )
              }>
              <Image style={styles.tinyLinkLogo} source={icon2} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://open.spotify.com/playlist/0jnEuByNu7d3g9ca6iBlvI?si=e6939a522f1f4ef5'
                )
              }>
              <Image style={styles.tinyLinkLogo} source={icon3} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.spacingContainer}>
          <View style={styles.spacingContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri:
                    'https://i.pinimg.com/originals/f8/65/d3/f865d3112022612c6875b4ab7ec54239.jpg',
                }}
              />
            </View>
          </View>
        </View>

        <Pressable onPress={() => this.props.navigation.navigate('Posting')}>
          <View style={styles.pageLinesAlignment}>
            <Text style={styles.pageLinesTextStyle}>
              {' '}
              Music Discussion Board{' '}
            </Text>
          </View>
        </Pressable>

        <Text style={styles.pageIntro}>
          {' '}
          A networking hub made specifically for music lovers just like you!
          Share your favorite songs and thoughts on them as you discover new
          music from others!{' '}
        </Text>

        <View style={styles.spacingContainer}>
          <View style={styles.itemContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri:
                  'https://i.pinimg.com/originals/7f/39/f0/7f39f0ad4dd6b777ab72bc7dc3b91958.jpg',
              }}
            />
          </View>
        </View>

        <Pressable onPress={() => this.props.navigation.navigate('Account')}>
          <View style={styles.pageLinesAlignment}>
            <Text style={styles.pageLinesTextStyle}> Account Page </Text>
          </View>
        </Pressable>

        <Text style={styles.pageIntro}>
          {' '}
          A personal page for you and all the amazing thoughts you have provided
          to the discussion!
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    height: screenHeight,
    width: screenWidth,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#D6CFC7',
  },
  spacingContainer: {
    paddingTop: 40,
  },
  pageTitle: {
    margin: 10,
    fontSize: 26,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  pageLinesAlignment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageLinesTextStyle: {
    margin: 5,
    fontSize: 18,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  pageIntro: {
    margin: 3,
    fontSize: 16,
    fontFamily: 'Times New Roman',
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  tinyLogo: {
    height: 80,
    width: 80,
    textAlign: 'center',
    borderRadius: 400 / 2,
  },
  tinyLinkLogo: {
    height: 45,
    width: 80,
    textAlign: 'center',
    borderRadius: 400 / 2,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkButton: {
    backgroundColor: '#4A2511',
    padding: 10,
    margin: 5,
    height: 40,
    color: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
