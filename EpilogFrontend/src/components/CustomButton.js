import React from 'react';
import { Pressable, StyleSheet, Text, Image, ViewBase } from 'react-native';

function CustomButton({onPress, text, type = "Primary"}) {
    return (
        <Pressable onPress={onPress} style={[styles.container, styles[`container${type}`]]}>
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
    containerPrimary: {
        backgroundColor: '#74748c',
    },
    containerSecondary: {

    },
    textPrimary: {
        fontSize: 16,
        color: 'white',
    },
    textSecondary: {
        fontSize: 16,
        color: "#462f92",
    }
})

export default CustomButton;