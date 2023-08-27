import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import TabNavigator from './src/components/TabNavigator';
import Read from './src/screens/Read';
import BookDetail from './src/screens/BookDetail';
import 'expo-dev-client'
import BookProvider from './src/data/BookContext';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [bookmark, setBookmark] = useState([]);
  const [book, setBook] = useState([]);
  const [genreBook, setGenreBook] = useState([]);
  const [searchBook, setSearchBook] = useState([]);
  const [category, setCategory] = useState('')

  return (
      <BookProvider value={[[book, setBook],[bookmark, setBookmark],[genreBook, setGenreBook],[searchBook, setSearchBook]]}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Tab" component={TabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="BookDetail" component={BookDetail}/>
        <Stack.Screen name="Read" component={Read}/>
        </Stack.Navigator>
      </NavigationContainer>
    </BookProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
