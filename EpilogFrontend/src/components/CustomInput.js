import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

function CustomInput({value, setValue, placeholder, secureTextEntry}) {
    return (
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            secureTextEntry={secureTextEntry}
            style={styles.input}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: 40,
        borderColor: '#9e9e9e',
        borderWidth: 1,
        borderRadius: 20,
        padding: 12,
        marginVertical: 8,
    },
})

export default CustomInput;