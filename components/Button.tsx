import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; // or another navigation library with a Link component
type ButtonProps = {
    text: string;
    bgColor: string;
    textColor: string;
    onPress?: () => void;  // Made optional and properly typed as function
    disabled: any;
};

const Button: React.FC<ButtonProps> = ({ text, bgColor, textColor, onPress, disabled }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: bgColor }]}
            disabled={disabled}
        >
            <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 22,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        textDecorationLine: 'none', // Removes underline on links
    },
    text: {
        fontSize: 14,
        fontWeight: 500,
    },
});

export default Button;
