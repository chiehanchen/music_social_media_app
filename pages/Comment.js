import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const Comment = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [faqs, setFAQs] = useState([]); // Initial empty array of faqs

  useEffect(() => {
    const getFaqs = firebase
      .firestore()
      .collection('FAQs')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const faqs = [];
        console.log(faqs);

        querySnapshot.forEach((documentSnapshot) => {
          faqs.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setFAQs(faqs);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => getFaqs();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView
      style={[{ height: '100%', width: '100%' }]}
      disableScrollViewPanResponder={true}
      snapToAlignment={'center'}
      decelerationRate={'fast'}
      snapToInterval={Dimensions.get('screen').height}
      showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.backGround}>
            <FlatList
              data={faqs}
              renderItem={({ item }) => (
                <View style={styles.listContainer}>
                  <View style={styles.listPage}>
                    <SafeAreaView>
                      <View style={styles.headList}>
                        <Text
                          style={[
                            styles.hListText,
                            {
                              border: 'solid',
                              borderWidth: 2,
                              borderColor: '#4A2511',
                            },
                          ]}>
                          Your Personal Music Hub
                        </Text>
                        <View style={styles.spacingContainer}>
                        </View>
    
                      </View>
                      <View style={styles.postContainer}>
                        <Text style={styles.postText}>
                          Post Title: {item.name}
                        </Text>
                        <Text style={styles.postText}>
                          Post Question: {item.question}
                        </Text>
                      </View>
                    </SafeAreaView>
                    <Pressable
                      style={styles.navButton}
                      onPress={() => navigation.navigate('Posts')}>
                      <Text style={styles.navText}>Back to Post</Text>
                    </Pressable>
                    <Pressable
                      style={styles.navButton}
                      onPress={() => navigation.navigate('Home')}>
                      <Text style={styles.navText}>Go Home</Text>
                    </Pressable>
                    <Pressable
                      style={styles.navButton}
                      onPress={() => navigation.navigate('Account')}>
                      <Text style={styles.navText}>Account Page</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
    </ScrollView>
  );
};
export default Comment;

const styles = StyleSheet.create({
  page: {
    width: '100%', // Makes the parent for our container take the full space available
    height: '100%',
  },
  backGround: {
    backgroundColor: '#D6CFC7',
  },
  listContainer: {
    height: Dimensions.get('screen').height,
  },
  listPage: {
    flex: 1,
  },
  spacingContainer: {
    paddingTop: 100
  },
  headList: {
    flex: 1,
    top: '10%',
    margin: '5%',
    alignItems: 'center',
  },
  hListText: {
    padding: '1%',
    fontWeight: '900',
    fontSize: 20,
    fontFamily: 'Times New Roman',
    color: '#4A2511',
  },
  postContainer: {
    flex: 1.5,
    margin: '1%',
    padding: '3%',
    backgroundColor: '#ece5d4',
  },
  postText: {
 
    color: '#4A2511',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
  },
  navButton: {
    margin: '1.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
    
  },
});
