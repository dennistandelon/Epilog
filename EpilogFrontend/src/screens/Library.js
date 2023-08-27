import { FlatList,Pressable, SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { bookContext } from '../data/BookContext';
import BookData from '../data/BookData';
import UserData from '../data/UserData';


const Library = ({navigation}) => {
  const [[book, setBook],[bookmark, setBookmark],[genreBook, setGenreBook],[searchBook, setSearchBook]] = useContext(bookContext);

  let bookmarkData = BookData.getBook();
  const user =  UserData.getUser();


  const fetchData = async () => {
      await bookmarkData.reloadData(user.detail.params.email).then(
        ()=>{
          setBook(bookmarkData.getData());
          setBookmark(bookmarkData.getBookmarked());
        }).catch((error)=>console.log(error));
  }


  useEffect(() => {
    fetchData()
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 15,
        }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 25,
          }}>
            Library
          </Text>
        </View>
          <FlatList 
            numColumns={2}
            bounces={false}
            showsVerticalScrollIndicator={false}
            horizontal={false} 
            scrollEnabled={false} 
            data={book} 
            renderItem={({item}) => (
              <Pressable onPress={() => navigation.navigate('BookDetail', item)}>
                  <View style={styles.cardContainer}>
                    <Image style={styles.image} source={{uri:item.CoverImage}}/>
                    <Text numberOfLines={2} style={styles.text}>{item.Title}</Text>
                  </View>
              </Pressable>
        )}/>
        
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF7F0",
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    },

    cardContainer: {
      width: 190,
      alignItems: 'center',
      paddingVertical: 15,
      gap: 10,
    },

    image: {
        width: 140,
        height: 210,
        borderRadius: 10,
    },

    text: {
        width: 140,
        fontWeight: 'bold',
        fontSize: 17,
    }
})

export default Library