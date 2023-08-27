import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'

const CategoryButtons = ({selectionMode, onSelectSwitch}) => {

    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitchData = (value) => {
        setSelectionMode(value);
        onSelectSwitch(value);
    }

    const categoryPressed = () => {
        updateSwitchData(1);
    }
    
    const fictionPressed = () => {
        updateSwitchData(2);
    }
    
    const nonFictionPressed = () => {
        updateSwitchData(3);
    }
    
    const comedyPressed = () => {
        updateSwitchData(4);
    }

  return (
        <View style={styles.categoryContainer}>
          <Pressable style={[styles.categoryPressContainer, 
            {backgroundColor: getSelectionMode == 1 ? '#62B6B7' : '#D9E4DD'}]} onPress={categoryPressed}>
            <Text>
              Comics
            </Text>
          </Pressable>
          <Pressable style={[styles.categoryPressContainer, 
            {backgroundColor: getSelectionMode == 2 ? '#62B6B7' : '#D9E4DD'}]} onPress={fictionPressed}>
            <Text>
              Fiction
            </Text>
          </Pressable>
          <Pressable style={[styles.categoryPressContainer, 
            {backgroundColor: getSelectionMode == 3 ? '#62B6B7' : '#D9E4DD'}]} onPress={nonFictionPressed}>
            <Text>
              Non-fiction
            </Text>
          </Pressable>
          <Pressable style={[styles.categoryPressContainer, 
            {backgroundColor: getSelectionMode == 4 ? '#62B6B7' : '#D9E4DD'}]} onPress={comedyPressed}>
            <Text>
              Romance
            </Text>
          </Pressable>
        </View>
  )
}

export default CategoryButtons

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        
    },
  
    categoryPressContainer: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    
})