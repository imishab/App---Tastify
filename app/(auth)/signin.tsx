import { useSigninMutation } from '@/redux/api/UserApi';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '@/redux/slices/pageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginError {
    data: {
        message: string;
    };
}

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [signinUser, { isSuccess, isLoading }] = useSigninMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            setErrors({
                email: !email ? 'Email is required' : '',
                password: !password ? 'Password is required' : '',
            });
            return;
        }

        try {
            // Call the login API
            const response = await signinUser({ email, password }).unwrap();
            dispatch(setUserDetails({ userInfo: response, token: response.token }));

            // Save to AsyncStorage
            await AsyncStorage.setItem('userInfo', JSON.stringify(response));
            await AsyncStorage.setItem('token', response.token);

            // Redirect to home page after successful login
            router.push('/(tabs)/home');
        } catch (err) {
            console.log('Login failed', err);
            if ((err as LoginError)?.data?.message) {
                setLoginError((err as LoginError).data.message);
            } else {
                setLoginError('An error occurred. Please try again later.');
            }
        }
    };

    useEffect(() => {
        if (isSuccess) {
            Toast.show({
                type: 'success',
                text1: 'Welcome to Tastify!',
                position: 'top',
            });
        }
    }, [isSuccess]);



    return (

        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Link href="/home" style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </Link><KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Header Image */}
                        <Image
                            source={require('../../assets/images/img1.png')}
                            style={styles.headerImage} />

                        {/* Login Form */}
                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Login</Text>

                            <Text style={styles.subtitle}>
                                Please Login to continue with <Text style={styles.brandText}>Tastify</Text>
                            </Text>
                            {loginError && <Text style={styles.BerrorText}>{loginError}</Text>}
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={[styles.input, errors.email ? styles.errorInput : null]}
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        setErrors({ ...errors, email: '' });
                                    }}
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    placeholderTextColor="#C8C8C8"

                                    autoCapitalize="none"
                                />
                                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={[styles.input, errors.password ? styles.errorInput : null]}
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        setErrors({ ...errors, password: '' });
                                    }}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#C8C8C8"

                                    secureTextEntry
                                />
                                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                            </View>

                            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
                                <Text style={styles.loginButtonText}>{isLoading ? 'Loading...' : 'Sign In'}</Text>
                            </TouchableOpacity>

                            <View style={styles.signupContainer}>
                                <Text style={styles.signupText}>Don't have an account? </Text>
                                <Link href="/signup">
                                    <Text style={styles.signupLink}>Sign up</Text>
                                </Link>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',

    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    backButton: {
        padding: 16,
        position: 'absolute',
        top: 40,
        left: 10,
        zIndex: 1,
    },
    backButtonText: {
        fontSize: 24,
        color: '#000',
    },
    headerImage: {
        width: '100%',
        height: 250,
        marginTop: 100,
        resizeMode: 'contain',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 28,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E2022',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        marginBottom: 20,
    },
    brandText: {
        color: '#000',
        fontWeight: '600',
    },
    inputContainer: {
        marginBottom: 14,
    },
    label: {
        fontSize: 16,
        color: '#1E2022',
        marginBottom: 8,
    },
    input: {
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#BABABA',
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000',
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
    BerrorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    loginButton: {
        height: 56,
        backgroundColor: '#000',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    signupText: {
        color: '#666',
        fontSize: 13,
    },
    signupLink: {
        color: '#000',
        fontSize: 13,
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
});

export default LoginScreen;