import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { ArrowLeft, CircleUserRound, Home, Menu, Search } from "lucide-react-native";


const TabLayout = () => {

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: '#949494',
                    tabBarStyle: {
                        height: 90,
                        paddingTop: 10
                    }
                }}
            >
                <Tabs.Screen name='home' options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Home color={color} size={22} />
                    ),
                }} />
                <Tabs.Screen name='menu' options={{
                    title: 'Menu',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Menu color={color} size={22} />
                    ),
                }} />
                <Tabs.Screen name='search' options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Search color={color} size={22} />
                    ),
                }} />
                <Tabs.Screen name='profile' options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <CircleUserRound color={color} size={22} />
                    ),
                }} />

            </Tabs>
        </>
    );
};

export default TabLayout

const styles = StyleSheet.create({})