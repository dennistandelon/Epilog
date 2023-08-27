import { StyleSheet, Text, View, Image, FlatList, Pressable, Alert } from 'react-native'
import React from 'react'


const BookList = ({image, title}) => {

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri:image}}/>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default BookList

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
        paddingVertical: 5,
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
        width: 200,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    }
})