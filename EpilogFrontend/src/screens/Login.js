import { Alert, SafeAreaView, StyleSheet, Text, View, Image, Button, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  GoogleSignin.configure({
    webClientId: process.env.REACT_APP_WEBCLIENT,
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const { idToken } = await GoogleSignin.signIn();
  
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const user_sign_in =  auth().signInWithCredential(googleCredential);
    user_sign_in.then((user) => {
        setUser(user);
    }).catch((error) => console.log(error));

  }


  if (initializing) return null;
  
  const loginPressed = () => {
    navigation.navigate('Tab',{name:"Guest"});
  }

  const googlePressed = () => {
    Alert.alert("Google", "Clicked");
  }

  

  const forgotPasswordPressed = () => {
    Alert.alert("Password", "PandaBallerina");
  }

  if(!user){
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.imageContainer}>
                    <View style={styles.emptySpaceContainer}/>
                    <View style={styles.topPartFormContainer}/>
                    <Image style={styles.imageLogo} source={require('../assets/logo.png')}/>
                </View>
                <View style={styles.botPartFormContainer}>
                    <View style={styles.formTitleContainer}>
                        <Text style={styles.formTitleText}>
                            Login
                        </Text>
                    </View>
                    <View style={styles.formInputContainer}>
                        <CustomInput placeholder="Email" value={username} setValue={setUsername}/>
                        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
                        <Pressable onPress={forgotPasswordPressed}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </Pressable>
                    </View>
                    <View style={styles.formOthersContainer}>
                        <CustomButton text="Login" onPress={loginPressed}/>
                        <View>
                            <Text>
                                Or Sign In with
                            </Text>
                        </View>
                        <GoogleSigninButton onPress={onGoogleButtonPress}/>
                    </View>
                    <View style={styles.emptySpaceContainer}/>
                </View>
            </View>
        </SafeAreaView>
      )
  } else{
        return navigation.navigate('Tab',{
            name:user.displayName,
            image:user.photoURL,
            email:user.email,
        });
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ada4c2',
        justifyContent: 'center',
        alignItems: 'center',
    },

    formContainer: {
        width: '85%',
        height: '84%',
        position: 'absolute',
        bottom: 0,
    },

    imageContainer: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageLogo: {
        position: 'absolute',
        width: 300,
        height: 220,
    },

    emptySpaceContainer: {
        flex: 2,
    },

    topPartFormContainer: {
        flex: 3,
        backgroundColor: 'white',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },

    botPartFormContainer: {
        flex: 5,
        backgroundColor: 'white',
        width: '100%',
    },

    formTitleContainer: {
        flex: 1,
        width: '100%',
        paddingBottom: 15,
        paddingHorizontal: 20,
    },

    formTitleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    formInputContainer: {
        flex: 4.5,
        paddingHorizontal: 20,
        gap: 10,
    },

    forgotPasswordText: {
        position: 'absolute',
        right: 0,
    },

    formOthersContainer: {
        flex: 5,
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 20,
    }
})

export default Login