import { FlatList, ScrollView, StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native'
import React from 'react'

const BookSlider = ({data}) => {

  const bookPressed = () => {
    Alert.alert("Book", "Pressed 🤔");
  }

  return (
    <FlatList 
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true} 
        scrollEnabled={true} 
        data={data} 
        renderItem={({item}) => (
            <Pressable onPress={bookPressed}>
                <View style={styles.cardContainer}>
                    <Image style={styles.image} source={item.image}/>
                    <Text numberOfLines={2} style={styles.text}>{item.title}</Text>
                </View>
            </Pressable>
    )}/>
  )
}

export default BookSlider

const styles = StyleSheet.create({
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
    }
})