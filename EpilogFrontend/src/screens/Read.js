import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Pdf from 'react-native-pdf'

const Read = ({navigation, route}) => {

  const pdfSource = {uri:route.params.Content, cache:true};
  

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={pdfSource}
        onLoadComplete={(numberOfPages,filePath)=>{
            console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page,numberOfPages)=>{
            console.log(`current page: ${page}`);
        }}
        onError={(error)=>{
            console.log(error);
        }}
        style={styles.pdf}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdf:{
    flex:1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})

export default Read