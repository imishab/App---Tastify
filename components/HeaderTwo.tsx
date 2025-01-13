import { Link } from 'expo-router';
import { ArrowLeft, Bell, CircleUserRound, Menu, Search, ShoppingBag } from 'lucide-react-native';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import BackButton from './BackButton';


const OtherHeader = () => {
    return (
        <View style={styles.wrapper}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <BackButton />

                <Text style={styles.logo}>Tastify</Text>

                <Link href='/cart' style={styles.iconContainer}>
                    <ShoppingBag size={24} color="#000" />
                </Link>
            </View>

            {/* Welcome Text */}

        </View>


    );
};

const styles = StyleSheet.create({
    wrapper: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.01,
        shadowRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Whiteish transparent background
        paddingBottom: 0,
        paddingTop: 30
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    iconContainer: {
        padding: 5, // Extra padding for better touch interaction
    },
    logo: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center', // Ensures alignment of the logo text
    },

});

export default OtherHeader;
