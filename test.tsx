import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    StyleSheet,
} from 'react-native';
import { useRouter, Link } from 'expo-router';

const SignupScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', password: '' });

    const validateInputs = () => {
        let valid = true;
        let nameError = '';
        let emailError = '';
        let passwordError = '';

        if (!name) {
            nameError = 'Name is required';
            valid = false;
        } else if (name.length < 3) {
            nameError = 'Name must be at least 3 characters long';
            valid = false;
        }

        if (!email) {
            emailError = 'Email is required';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError = 'Invalid email address';
            valid = false;
        }

        if (!password) {
            passwordError = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            passwordError = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors({ name: nameError, email: emailError, password: passwordError });
        return valid;
    };

    const handleSignup = async () => {
        if (validateInputs()) {
            try {
                const response = await fetch('http://172.20.10.2:3003/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('Signup successful:', data);
                    router.push('/home');
                } else {
                    console.log('Signup failed:', data.message);
                    alert(data.message || 'Signup failed');
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>Sign Up</Text>

                    {/* Name Field */}
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
                        />
                        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
                    </View>

                    {/* Email Field */}
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
                            autoCapitalize="none"
                        />
                        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                    </View>

                    {/* Password Field */}
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
                            secureTextEntry
                        />
                        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    </View>

                    {/* Signup Button */}
                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <Link href="/signin" style={styles.linkText}>
                        Already have an account? Sign In
                    </Link>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backButtonText: {
        fontSize: 18,
        color: '#007AFF',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});

export default SignupScreen;
