import HomeHeader from '@/components/Header';
import { Link } from 'expo-router';
import { SquarePen, CircleUserRound, ChevronRight, KeyRound, BellRing, Languages, MoonStar, Settings, Info, LogOut } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For clearing tokens locally

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Switch,
    ScrollView,
    Button,
    Alert,
} from 'react-native';

const UserProfile = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
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

    return (
        <ScrollView style={styles.container}>
            <HomeHeader />
            {/* Profile Header */}
            {userInfo ? (
                <>
                    <View style={styles.profileHeader}>
                        <Image
                            source={require('../../assets/images/user.png')}
                            style={styles.profileImage} />
                        <Text style={styles.profileName}>{userInfo.name}</Text>
                        <Text style={styles.profileEmail}>{userInfo.email}</Text>
                    </View>

                    <View style={styles.menuItems}>
                        {/* Menu Items */}
                        <Link href="/profile/account" style={styles.link}>
                            <View style={styles.menuItem}>
                                <CircleUserRound size={20} color="#333" />
                                <Text style={styles.menuText}>Account Details</Text>
                                <ChevronRight size={20} color="#333" />
                            </View>
                        </Link>

                        <View style={styles.menuItem}>
                            <KeyRound size={20} color="#333" />
                            <Text style={styles.menuText}>Change Password</Text>
                            <ChevronRight size={20} color="#333" />
                        </View>
                        <View style={styles.menuItem}>
                            <BellRing size={20} color="#333" />
                            <Text style={styles.menuText}>Notifications</Text>
                            <ChevronRight size={20} color="#333" />
                        </View>
                        <View style={styles.menuItem}>
                            <Languages size={20} color="#333" />
                            <Text style={styles.menuText}>Language</Text>
                            <ChevronRight size={20} color="#333" />
                        </View>
                        <View style={styles.menuItem}>
                            <MoonStar size={20} color="#333" />
                            <Text style={styles.menuText}>Theme Mode</Text>
                            <Switch
                                value={isDarkMode}
                                onValueChange={() => setIsDarkMode(!isDarkMode)} />
                        </View>
                        <View style={styles.menuItem}>
                            <Settings size={20} color="#333" />
                            <Text style={styles.menuText}>Preferences</Text>
                            <ChevronRight size={20} color="#333" />
                        </View>
                        <View style={[styles.menuItem, styles.logoutButton]}>
                            <LogOut size={20} color="#d9534f" />
                            {/* <TouchableOpacity onPress={handleLogout}>
        <Text style={[styles.menuText, { color: '#d9534f' }]}>
            Logout
        </Text>
    </TouchableOpacity> */}
                        </View>
                    </View></>
            ) : (
                <Text>Please Login</Text>
            )}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    containerTwo: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: -20,
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginPrompt: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileHeader: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    noLoginImage: {
        width: 180,
        height: 180,
        borderRadius: 40,
        marginBottom: 50,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    profileEmail: {
        fontSize: 14,
        color: '#666',
    },
    menuItems: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 1,
        justifyContent: 'space-between',
    },
    link: {
        marginBottom: 1,

    },
    menuText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
        marginLeft: 10,
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
    logoutButton: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginTop: 20,
    },
});

export default UserProfile;


function logoutAction(): any {
    throw new Error('Function not implemented.');
}

