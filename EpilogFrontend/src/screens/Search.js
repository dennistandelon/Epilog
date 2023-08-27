import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Pressable, Alert, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BookList from '../components/BookList'
import UserData from '../data/UserData';
import BookData from '../data/BookData';
import { bookContext } from '../data/BookContext';


const Search = ({navigation}) => {

  const [input, setInput] = useState("");

  const [[book, setBook],[bookmark, setBookmark],[genreBook, setGenreBook],[searchBook, setSearchBook]] = useContext(bookContext);
  const user =  UserData.getUser();
  let bookmarkData = BookData.getBook();

  const searchPressed = (text) => {
    setInput(text);
    setSearchBook(bookmarkData.getSearch(book,text));
  }  

  const fetchData = async () => {
    await bookmarkData.reloadData(user.detail.params.email).then(
      ()=>{
        setBook(bookmarkData.getData());
        setBookmark(bookmarkData.getBookmarked());
        setSearchBook(bookmarkData.getSearch(book,input));
      }).catch((error)=>console.log(error));
  }

  useEffect(() => {
    fetchData();
  }, [])



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}> 
        <View style={styles.headerTopBackground}/>
        <View style={styles.headerBottomBackground}/>
        <View style={styles.searchContainer}>
            <Pressable onPress={searchPressed}> 
                <Image style={styles.searchImage} source={require('../assets/search.png')}/>
            </Pressable>
            <TextInput 
              value={input}
              style={styles.searchTextInput} 
              placeholder='Search'
              onChangeText={text => {
                console.log("Ini Text: ", text);
                searchPressed(text);
              }}
              />
        </View>
      </View>
        <ScrollView style={styles.contentContainer} bounces={false} showsVerticalScrollIndicator={false}>
          {searchBook.map(item => (
                  <Pressable onPress={()=>{navigation.navigate('BookDetail',item)}}>
                    <BookList 
                  key={item.BookID}
                  image={item.CoverImage}
                  title={item.Title}
                  />
                  </Pressable>
                ))}
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CDC9C3',
      alignItems: 'center',
    },

    headerContainer: {
      width: '100%',
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },

    headerTopBackground: {
      flex: 1,
      width: '100%',
      backgroundColor: '#CDC9C3',
    },

    headerBottomBackground: {
      flex: 1,
      width: '100%',
      backgroundColor: '#FBF7F0',
    },

    searchContainer: {
      position: 'absolute',
      flexDirection: 'row',
      backgroundColor: '#fff',
      width: '90%',
      padding: 12,
      gap: 15,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: 'gray',
      shadowColor: "grey",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 0.8,
      shadowRadius: 6,
    },
  
    searchImage: {
      width: 20,
      height: 20,
    },

    searchTextInput: {
      width: '100%',
      fontSize: 18,
    },

    contentContainer: {
      width: '100%',
      backgroundColor: '#FBF7F0',
    },
})

export default Search