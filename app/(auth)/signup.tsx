import { useSignupMutation } from '@/redux/api/UserApi';
import { Link, router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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

// Define type for error object
interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
}

const SignupScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<FormErrors>({}); // Use FormErrors type

    // RTK Query hook for signup
    const [signup, { isLoading, error }] = useSignupMutation();



    const handleSignup = async () => {
        let formErrors: FormErrors = {};
        if (!name) formErrors.name = 'Name is required';
        if (!email) formErrors.email = 'Email is required';
        if (!phone) formErrors.phone = 'Phone Number is required';
        if (!password) formErrors.password = 'Password is required';

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const user = await signup({ name, email, phone, password }).unwrap();
            // Navigate to Home with user details using router.push
            router.push({
                pathname: '/signin', // The path of the screen you want to navigate to
                params: { name: user.name, email: user.email, phone: user.phone }, // Pass user details as query params
            });
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <TouchableOpacity style={styles.backButton} onPress={() => ('')}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <KeyboardAvoidingView
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
                            <Text style={styles.title}>Create New Account</Text>
                            <Text style={styles.subtitle}>
                                Please Signup to continue with <Text style={styles.brandText}>Tastify</Text>
                            </Text>

                            {/* Name Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={[styles.input, errors.name ? styles.errorInput : null]}
                                    value={name}
                                    onChangeText={(text) => {
                                        setName(text);
                                        setErrors({ ...errors, name: '' });
                                    }}
                                    placeholder="Enter your name"
                                    placeholderTextColor="#C8C8C8"
                                />
                                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
                            </View>

                            {/* Email Input */}
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
                                <Text style={styles.label}>Phone Number</Text>
                                <TextInput
                                    style={[styles.input, errors.phone ? styles.errorInput : null]}
                                    value={phone}
                                    onChangeText={(text) => {
                                        setPhone(text);
                                        setErrors({ ...errors, phone: '' });
                                    }}
                                    placeholder="Enter your phone number"
                                    placeholderTextColor="#C8C8C8"
                                    keyboardType="phone-pad"
                                    autoCapitalize="none"
                                />
                                {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
                            </View>

                            {/* Password Input */}
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

                            {/* Signup Button */}
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={handleSignup}
                                disabled={isLoading}
                            >
                                <Text style={styles.loginButtonText}>
                                    {isLoading ? 'Signing up...' : 'Sign Up'}
                                </Text>
                            </TouchableOpacity>

                            {/* Error Handling */}
                            {error && <Text style={styles.errorText}>Signup failed. Please try again.</Text>}

                            {/* Already have an account */}
                            <View style={styles.signupContainer}>
                                <Text style={styles.signupText}>Already have an account? </Text>
                                <Link href="/signin">
                                    <Text style={styles.signupLink}>Sign in</Text>
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
        height: 150,
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
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1E2022',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        marginBottom: 32,
    },
    brandText: {
        color: '#000',
        fontWeight: '600',
    },
    inputContainer: {
        marginBottom: 14,
    },
    label: {
        fontSize: 14,
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
        marginTop: 4,
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

export default SignupScreen;