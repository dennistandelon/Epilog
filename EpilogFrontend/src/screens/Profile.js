import { Image, Alert, Button, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import UserData from '../data/UserData';
import BookData from '../data/BookData';
import { bookContext } from '../data/BookContext';

const Profile = ({route, navigation}) => {

  const user =  UserData.getUser();

  const [[book,setBook],[bookmark, setBookmark]] = useContext(bookContext);

  let bookmarkData = BookData.getBook();

  const signOutPressed = async () => {
    try {
      if(GoogleSignin.isSignedIn()){
        await GoogleSignin.revokeAccess();
        await auth().signOut();
      }
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      navigation.navigate('Login');
    }
  }

  const fetchData = async()=>{
    await bookmarkData.reloadData(user.detail.params.email).then(
      ()=>{
        setBook(bookmarkData.getData());
        setBookmark(bookmarkData.getBookmarked());
      }).catch((error)=>console.log(error));
  }



  useEffect(() => {
    fetchData();
  }, [])
  
  const myProfilePressed = () => {
    if(user.detail.params.name == "Guest"){
      Alert.alert("My Profile", "You Logged as a guest");
    } else{
      Alert.alert("My Profile", "You can change your information directly from Google Services");
    }
  }

  const picSource = (user.detail.params.name == "Guest")? require('../assets/icon.png') : {uri:user.detail.params.image};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground 
          style={{width: '100%', height: 250}} 
          source={require('../assets/profilebanner.jpeg')}/>
        <View style={styles.headerContentContainer}>
          <View style={styles.profilePictureContainer}>
            <Image source={picSource} style={styles.profilePicture} />
          </View>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileText}>
              {user.detail.params.name}
            </Text>
          </View>
          <View style={styles.profileContentContainer}>
            <Pressable style={styles.listContainer} onPress={myProfilePressed}>
                <Text>
                  My Profile
                </Text>
            </Pressable>
            <View>
                <Text style={{paddingHorizontal:20}}>
                  Email: {user.detail.params.email}
                </Text>
            </View>           
            <Pressable style={styles.listContainer}>
              <View>
                <Text>
                  My Bookmark
                </Text>
              </View>
            </Pressable>
            
          </View>
        </View>
      </View>
      <FlatList 
                bounces={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true} 
                scrollEnabled={true} 
                data={bookmark} 
                renderItem={({item}) => (
                  <Pressable onPress={() => navigation.navigate('BookDetail', item)}>
                        <View style={styles.cardContainer}>
                            <Image style={styles.image} source={{uri:item.CoverImage}}/>
                            <Text numberOfLines={2} style={styles.text}>{item.Title}</Text>
                        </View>
                    </Pressable>
                )}/>
      <View style={styles.signOutContainer}>
        <Pressable style={styles.signOutButton} onPress={signOutPressed}>
          <Text style={{color:'red'}}>
            Sign Out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7F0',
    alignItems: 'center',
  },

  headerContainer: {
    flex: 6,
    width: '100%',
    alignItems: 'center',
    margin: 10,
  },

  headerContentContainer: {
    width: '90%',
    height: '100%',
    position: 'absolute',
  },
  
  profilePictureContainer: {
    width: '100%',
    flex: 2,
    justifyContent: 'center',
  },

  profilePicture: {
    width: 80,
    height: 80,
    backgroundColor: 'black',
    borderRadius: 50,
  },

  profileNameContainer: {
    width: '100%',
    flex: 1,
  },

  cardContainer: {
    width: 150,
    alignItems: 'center',
    gap: 10,
  },

  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },

  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  profileContentContainer: {
    width: '100%',
    flex: 3,
    backgroundColor: '#FBF7F0',
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },

  signOutContainer: {
    flex: 0.5,
    width: '90%',
    backgroundColor: '#FBF7F0',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },

  listContainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

  signOutButton: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:12,
    width: '70%',
  },

})

export default Profile