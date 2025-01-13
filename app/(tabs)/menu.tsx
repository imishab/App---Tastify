import Category from '@/components/Category';
import HomeHeader from '@/components/Header';
import Products from '@/components/Products';
import ProductSlider from '@/components/ProductSlider';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const categories = ['All', 'Curry Powders', 'Biscuits', 'Soft Drinks', 'Hot Drinks', 'Biscuits', 'Soft Drinks', 'Hot Drinks'];

const Menu = () => {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerWrapper}>
                <HomeHeader />
            </View>

            {/* Content (Welcome Text & Categories) */}
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.contentContainer}>
                    {/* Category Tabs */}
                    <Category />
                </View>
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
        marginTop: 40, // Adjust this value based on the height of your header
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

export default Menu;
