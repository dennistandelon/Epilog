import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import UserData from '../data/UserData';
import BookmarkData from '../data/BookmarkData';
import { bookContext } from '../data/BookContext';
import BookData from '../data/BookData';

const BookDetail = ({route, navigation}) => {

  const [[book, setBook],[bookmark, setBookmark],[genreBook, setGenreBook],[searchBook, setSearchBook]] = useContext(bookContext);
  const [loading, setLoading] = useState(true);

  const bookid = route.params.BookID;
  const user = UserData.getUser();
  const userid = user.detail.params.email;

  let data = BookmarkData.getBookmark();

  const [isBookmarked,setIsBookmarked] = useState(route.params.isBookmarked);

    const replaceData = (type)=>{
        const newBook = [];
    
        book.map((item)=>{
          let isBookmarked = item.isBookmarked;
          let mail = item.Bookmark;
          if(item.BookID == bookid){
            if(type == "add"){
                isBookmarked = true;
                mail.push(userid);
            } else if(type == "delete"){
                isBookmarked = false;
                const index = mail.indexOf(userid);
                mail.splice(index,1);
            }
          } 
    
          newBook.push({
            BookID: item.BookID,
            Title: item.Title,
            CoverImage: item.CoverImage,
            Content:item.Content,
            Description:item.Description,
            Bookmark: mail,
            Category: item.Category,
            isBookmarked: isBookmarked,
          });

        })

        let savedBookmark = BookData.getBook();
        savedBookmark.setDetail(newBook);
        savedBookmark.setBookmarked(newBook);


        setBook(newBook);
        setSearchBook(newBook);
        setBookmark(savedBookmark.getBookmarked());
        setGenreBook(savedBookmark.getByGenreInstance());
    }

const addBookmark = async ()=>{
    const url = process.env.REACT_APP_ADD_BOOKMARK +userid+'/'+bookid;
    
    await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
    .finally(() => {
        setLoading(false);
        replaceData("add");
        setIsBookmarked(!(route.params.isBookmarked));
    })
  }

  const removeBookmark = async ()=>{
    const url = process.env.REACT_APP_REMOVE_BOOKMARK +userid+'/'+bookid;
    
    await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
    .finally(() => {
        setLoading(false);
        replaceData("delete");
        setIsBookmarked(!(route.params.isBookmarked));
    })

  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={{flex: 1, width: '100%'}}>
                <Image style={{
                    width: '100%',
                    height: '100%', 
                }}
                source={{uri:route.params.CoverImage}}
                blurRadius={1}
                />
            </View>
            <View style={{
                width: '100%', 
                paddingHorizontal: 15,
                position: 'absolute',
                bottom: 0,
                }}>
                <View style={{ 
                    width: '100%', 
                    height: 80,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 35,
                    borderTopRightRadius: 35,
                    }}/>
            </View>
            <View style={styles.bookCoverContainer}>
                <View style={{
                    backgroundColor: 'salmon',
                    borderRadius: 10,
                    shadowColor: "grey",
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 5,
                }}>
                    <Image style={styles.bookCover} source={{uri:route.params.CoverImage}}/>
                </View>
            </View>
        </View>
        <View style={styles.contentContainer}>
            <View style={styles.bookContent}>
                <View style={styles.bookTitleContainer}>
                    <Text style={styles.bookTitle}>
                        {route.params.Title}
                    </Text>
                </View>
                <View>
                    <Text>
                        {route.params.Description}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                {
                    (user.detail.params.name == "Guest")?
                    <Pressable style={styles.bookmarkButton}>
                        <Text style={{color:'#fff'}}>
                            Login to Bookmark
                        </Text>
                    </Pressable>
                    :
                    (isBookmarked)? 
                    <Pressable style={styles.removeButton} onPress={removeBookmark}>
                        <Text style={{color:'#fff'}}>
                            Remove Bookmark
                        </Text>
                    </Pressable>
                    :
                    <Pressable style={styles.bookmarkButton} onPress={addBookmark}>
                        <Text style={{color:'#fff'}}>
                            Bookmark
                        </Text>
                    </Pressable>
                }
                <Pressable style={styles.readButton} onPress={()=>{navigation.navigate('Read',{Content:route.params.Content})}}>
                    <Text style={{color:'#fff'}}>
                        Start Reading
                    </Text>
                </Pressable>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default BookDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CDC9C3',
    },

    headerContainer: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
    },

    bookCoverContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingBottom: 8,
    },

    bookCover: {
        width: 120,
        height: 180,
        borderRadius: 10,
    },

    contentContainer: {
        flex: 3,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    bookContent: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
    },

    bookTitleContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },

    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    buttonContainer:{
        flex:1,
        justifyContent:'space-evenly',
        flexDirection:'row',
        marginTop:'20%',
    },
    readButton:{
        flex: 1,
        justifyContent:'space-around',
        alignItems: 'center',
        backgroundColor:'#007bff',
        marginTop: '5%',
        height: 64,
    },
    removeButton:{
        flex: 1,
        justifyContent:'space-around',
        alignItems: 'center',
        backgroundColor:'red',
        marginTop: '5%',
        height: 64,
    },
    bookmarkButton:{
        flex: 1,
        justifyContent:'space-around',
        alignItems: 'center',
        backgroundColor:'green',
        marginTop: '5%',
        height: 64,
    }


})