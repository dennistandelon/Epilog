import React from 'react';
import { Pressable, StyleSheet, Text, Image, ViewBase } from 'react-native';

function CustomGoogleButton({onPress, text, type}) {
    return (
        <Pressable onPress={onPress} style={[styles.container, styles[`container${type}`]]}>
            <Image style={styles.googleImage} source={require("../assets/google.png")}/>
            <Text 
                style={[styles.text, styles[`text${type}`]]}>
                {text}
            </Text>
        </Pressable> 
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
    },
    containerGoogle: {
        backgroundColor: "white",
        borderColor: "#e5e5e5",
        borderWidth: 1,
        flexDirection: "row",
    },
    textGoogle: {
        color: "black",
        fontSize: 16,
    },
    googleImage: {
        width: 22,
        height: 22,
        marginRight: 5,
    }
})

export default CustomGoogleButton;