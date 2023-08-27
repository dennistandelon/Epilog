import React from 'react';
import { View, Image, MenuItem, Pressable, Alert, Text, Button } from 'react-native';

function BannerSlider({data}) {
    const bookPressed = () => {
        Alert.alert('Book', 'Pressed')
    }

    return (
        <View style={{paddingVertical: 15}}>
            <View style={{
                backgroundColor: '#D9E4DD', 
                width:300, 
                height:200,
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: 10,
                borderRadius: 10,
                shadowColor: "black",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.8,
                shadowRadius: 6,
                }}>
                <Image 
                    source={data.image} 
                    style={{
                        height: 180, 
                        width: 120, 
                        borderRadius: 10,
                    }}
                />
                <View>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        width: 120,
                        textAlign: 'center',
                    }}>
                        {data.title}
                    </Text>
                    <Button title="Read here" onPress={bookPressed}/>
                </View>
            </View>
        </View>
    );
}

export default BannerSlider;