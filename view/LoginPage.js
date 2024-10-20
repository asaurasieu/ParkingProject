import React, { useState } from 'react';
import { Alert, Image, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const carLogo = require('../assets/Car.png');

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Get the navigation object
    const navigation = useNavigation();

    // Call this function when login is successful
    const handleLogin = () => {
        if (email === '' || password === '') {
            Alert.alert('Error, please enter your email and password.');
            return;
        }

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('User logged in: ', userCredential.user);
                Alert.alert('Login successful!', '', [
                    { text: 'OK', onPress: () => navigation.navigate('ProfileStack', { screen: 'Profile' })},
                ]);
            })
            .catch(error => {
                let errorMessage;
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'That email address is invalid!';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'There is no user corresponding to this email.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'The password is incorrect.';
                        break;
                    default:
                        errorMessage = error.message;
                }
                Alert.alert('Login Failed', errorMessage);
            });
};

    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar style="light" />
            <Image source={carLogo} style={styles.image} resizeMode="contain" />
            <Text style={styles.welcome}>WELCOME TO THE NEW ERA OF SMART PARKING</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <RectButton
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>LOGIN</Text>
            </RectButton>
            <Text
                style={styles.forgotPassword}
                onPress={() => Alert.alert('Forget Password!')}
            >
                Forgot password?
            </Text>
            <Text
                style={styles.signUpLink}
                onPress={() => navigation.navigate('RegistrationScreen')}
            >
                Don't have an account? Sign Up
            </Text>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0,
    },
    image: {
        height: 300,
        width: 300,
        marginBottom: 30,
    },
    welcome: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        height: 40,
        width: '40%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 15,
        color: 'white',
        fontSize: 14,
    },
    forgotPassword: {
        color: 'white',
        marginBottom: 30,
        fontSize: 13,
    },
    button: {
        backgroundColor: 'red',
        width: '70%',
        alignItems: 'center',
        padding: 9,
        borderRadius: 5,
        marginBottom: 15,
    },
    signUpLink: {
        color: 'white',
        marginTop: 15,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
