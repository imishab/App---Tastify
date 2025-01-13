import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router';
import { ArrowLeft, ShoppingBag } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';


const BackButton = () => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };
    return (
        <TouchableOpacity onPress={handleBack} style={styles.iconContainer}>
            <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    iconContainer: {
        padding: 5, // Extra padding for better touch interaction
    },
})

export default BackButton

