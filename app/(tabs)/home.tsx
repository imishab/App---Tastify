import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Category from '@/components/Category';
import Products from '@/components/Products';
import ProductSlider from '@/components/ProductSlider';
import HomeHeader from '@/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const userInfo = await AsyncStorage.getItem('userInfo');
                if (userInfo) {
                    setUserInfo(JSON.parse(userInfo));
                }
            } catch (error) {
                console.error('Failed to load user details', error);
            }
        };

        getUserDetails();
    }, []);

    if (!userInfo) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ color: 'red' }}>User is not logged in.</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWrapper}>
                <HomeHeader />
            </View>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        {userInfo ? (
                            <Text>Welcome, {userInfo.name}!</Text>
                        ) : (
                            <Text>Loading...</Text>
                        )}
                    </Text>
                    {/* <Category /> */}
                </View>
                <ProductSlider />
                <Products />
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, // Ensures header stays on top
    },
    scrollContainer: {
        marginTop: 50, // Adjust this value based on the header height
    },
    contentContainer: {
        marginTop: 20, // Adjust this value based on the height of your header
        paddingHorizontal: 0,
    },

    welcomeText: {
        fontSize: 22,
        fontWeight: '700',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        color: '#000',
    },
    categoryContainer: {
        paddingLeft: 20,
    },
    categoryTab: {
        marginRight: 20,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 14,
        color: '#aaa',
    },
    activeTabText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },
    activeUnderline: {
        height: 2,
        width: '100%',
        backgroundColor: '#000',
        marginTop: 5,
    },
});

export default Home;
