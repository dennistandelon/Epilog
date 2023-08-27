import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'

const SearchFilter = ({data, input, setInput}) => {
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={data} 
        renderItem={({item}) => (
          item.title.toLowerCase().includes(input.toLowerCase()) 
            ? 
            <View style={styles.container}>
              <Image style={styles.image} source={item.image}/>
              <Text style={styles.text}>{item.title}</Text>
            </View>
            :       
            <View/>
        )}/>
    </View>
  )
}

export default SearchFilter

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
        paddingVertical: 5,
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