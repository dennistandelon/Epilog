import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, Image, Button, Pressable, Alert, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BannerSlider from '../components/BannerSlider'
import CategoryButtons from '../components/CategoryButtons'
import BookList from '../components/BookList'
import UserData from '../data/UserData'
import { bookContext } from '../data/BookContext'
import BookData from '../data/BookData'


const Home = ({route, navigation}) => {

  const [categoryTab, setCategoryTab] = useState(1);

  const [[book, setBook],[bookmark, setBookmark],[genreBook, setGenreBook],[search,searchBook]] = useContext(bookContext);
  const user =  UserData.getUser();
  let bookmarkData = BookData.getBook();


  const fetchData = async ()=>{
    await bookmarkData.reloadData(user.detail.params.email).then(
      ()=>{
        setBook(bookmarkData.getData());
        setBookmark(bookmarkData.getBookmarked());
        setGenreBook(bookmarkData.getBookBygenre(book,"Comics"));
      }).catch((error)=>console.log(error));

  }

  useEffect(() => {
      
      fetchData();
  }, [])

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item}/>
  }

  const onSelectSwitch = (value) => {
    setCategoryTab(value);

    let genre = "Comics";
    switch (value) {
      case 2:
        genre = "Fiction";
        break;
      case 3:
        genre = "NonFiction";
        break;
      case 4:
        genre = "Romance";
        break;  
      default:
        genre = "Comics";
        break;
    }

    setGenreBook(bookmarkData.getBookBygenre(book,genre))
  }

  const popularPressed = () => {
    navigation.navigate('Library');
  }

  const bookPressed = () => {
    navigation.navigate('BookDetail', {
      title: user,
      image: 1,
    });
  }

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView style={{width:'100%'}} bounces={false} showsVerticalScrollIndicator={false} > 
        <View style={styles.headerContainer}>
          <View style={styles.headerTopBackground}>
            <ImageBackground 
              style={{width: '100%', height: '100%'}} 
              source={require('../assets/aesthetic.jpeg')}/>
          </View>
          <View style={styles.headerBottomBackground}/>
          <View style={styles.headerContentContainer}>
            <View style={styles.profileContainer}>
              <Text numberOfLines={1} style={styles.headerTitle}>
                Welcome, {user.detail.params.name}
              </Text>
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTitleContainer}>
                <Text style={styles.sliderTitleText}>
                  Recommendation
                </Text>
                <Button title="See All" onPress={popularPressed}/>
              </View>
              
              <FlatList 
                bounces={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true} 
                scrollEnabled={true} 
                data={book} 
                renderItem={({item}) => (
                    <Pressable onPress={() => navigation.navigate('BookDetail', item)}>
                        <View style={styles.cardContainer}>
                            <Image style={styles.image} source={{uri:item.CoverImage}}/>
                            <Text numberOfLines={2} style={styles.text}>{item.Title}</Text>
                        </View>
                    </Pressable>
                )}/>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView 
            style={styles.categoryContainer} 
            showsHorizontalScrollIndicator={false}
            bounces={false} 
            horizontal={true}
            >
          <CategoryButtons selectionMode={1} onSelectSwitch={onSelectSwitch}/>
          </ScrollView>
          <View style={styles.bookContainer}>
                {genreBook.map(item => (
                  <Pressable onPress={()=>{navigation.navigate('BookDetail',item)}}>
                    <BookList 
                  key={item.BookID}
                  image={item.CoverImage}
                  title={item.Title}
                  />
                  </Pressable>
                ))}
          </View>
        </View>
        
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
      justifyContent: 'center',
      alignItems: 'center',
    },

    headerContentContainer: {
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 30,
      position: 'absolute',
    },

    headerTopBackground: {
      width: '100%',
      height: 180,
      backgroundColor: '#CDC9C3',
    },

    headerBottomBackground: {
      width: '100%',
      height: 250,
      backgroundColor: '#FBF7F0',
    },

    profileContainer: {
      backgroundColor: '#FBF7F0',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      borderRadius: 15,
      shadowColor: "black",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 7,
    },

    headerTitle: {
      fontSize: 23,
      fontWeight: 'bold',
    },

    profileImage: {
      width: 32,
      height: 32,
      backgroundColor: '#000',
      borderRadius: 50,
    },
    
    sliderTitleContainer: {
      width: '92%',
      backgroundColor: '#FBF7F0',
      paddingBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    sliderTitleText: {
      fontWeight: 'bold',
      fontSize: 21,
    },

    sliderContainer: {
      backgroundColor: '#FBF7F0',
      width: '100%',
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      shadowColor: "grey",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: 7,
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

    text: {
        width: 120,
        fontSize: 15,
    },

    categoryContainer: {
      width: '90%',
      paddingBottom: 18,
    },

    contentContainer: {
      backgroundColor: '#FBF7F0',
      width: '100%',
      alignItems: 'center',
    },

    bookContainer: {
      width: '100%',
      paddingTop: 20,
      backgroundColor: '#FBF7F0',
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      shadowColor: "grey",
      shadowOffset: {
          width: 0,
          height: -1,
      },
      shadowOpacity: 1,
      shadowRadius: 7,
    },
})

export default Home