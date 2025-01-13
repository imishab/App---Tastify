import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Center, Container } from '../assets/css/main';
import React, { useEffect } from 'react'
import { Link } from 'expo-router';

const index = ({ }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/img1.png')} style={styles.image} />
            <Text style={styles.welcomeText}>Welcome To</Text>
            <Text style={styles.title}>Tastify Foods</Text>
            <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <View style={styles.buttonContainer}>
                <Link href='/home' style={styles.buttonPrimary}>
                    <Text style={styles.buttonPrimaryText}>Get Started</Text>
                </Link>
                <Link href='/(auth)/signin' style={styles.buttonSecondary}>
                    <Text style={styles.buttonSecondaryText}>Login</Text>
                </Link>
            </View>
        </View>
    );
};

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 300,
        height: 250,
        marginBottom: 100,
    },
    welcomeText: {
        fontSize: 13,
        color: '#555',
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#000',
        marginVertical: 10,
    },
    description: {
        textAlign: 'center',
        color: '#777',
        fontSize: 12,
        lineHeight: 20,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        gap: 10,
    },
    buttonPrimary: {
        backgroundColor: '#000',
        paddingVertical: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    buttonPrimaryText: {
        color: '#fff',
        fontSize: 14,
        textAlign: "center",
        fontWeight: '600',
    },
    buttonSecondaryText: {
        color: '#000',
        textAlign: "center",
        fontSize: 14,
        fontWeight: '600',
    },
});